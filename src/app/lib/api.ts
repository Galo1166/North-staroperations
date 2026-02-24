import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import type { InventoryItem, OperationalMetric, DashboardOverview, ChartDataPoint } from './types';

// ─── Inventory API ──────────────────────────────────────────────

const inventoryCol = () => collection(db, 'inventory_items');
const operationsCol = () => collection(db, 'operations');
const profilesCol = () => collection(db, 'profiles');

export const inventoryApi = {
  async getAll(): Promise<InventoryItem[]> {
    const q = query(inventoryCol(), orderBy('created_at', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as InventoryItem));
  },

  async getById(id: string): Promise<InventoryItem> {
    const snap = await getDoc(doc(db, 'inventory_items', id));
    if (!snap.exists()) throw new Error('Item not found');
    return { id: snap.id, ...snap.data() } as InventoryItem;
  },

  async create(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    const docRef = await addDoc(inventoryCol(), item);
    return { id: docRef.id, ...item } as InventoryItem;
  },

  async update(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem> {
    const ref = doc(db, 'inventory_items', id);
    await updateDoc(ref, updates);
    const snap = await getDoc(ref);
    return { id: snap.id, ...snap.data() } as InventoryItem;
  },

  async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, 'inventory_items', id));
  },

  async search(searchQuery: string): Promise<InventoryItem[]> {
    // Firestore doesn't support full-text search natively,
    // so we fetch all and filter client-side (or use Algolia/Typesense in production)
    const all = await this.getAll();
    const q = searchQuery.toLowerCase();
    return all.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  },
};

// ─── Operations API ─────────────────────────────────────────────

export const operationsApi = {
  async getAll(filters?: { department?: string; dateRange?: string }): Promise<OperationalMetric[]> {
    let q = query(operationsCol(), orderBy('created_at', 'desc'));

    const snap = await getDocs(q);
    let results = snap.docs.map(d => ({ id: d.id, ...d.data() } as OperationalMetric));

    // Client-side filtering (Firestore compound queries require indexes)
    if (filters?.department && filters.department !== 'all') {
      results = results.filter(r => (r as any).department === filters.department);
    }

    if (filters?.dateRange && filters.dateRange !== 'all') {
      const now = new Date();
      let fromDate: Date;
      switch (filters.dateRange) {
        case '7d':
          fromDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          fromDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          fromDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          fromDate = new Date(0);
      }
      results = results.filter(r => new Date(r.recorded_at) >= fromDate);
    }

    return results;
  },

  async getMetrics(): Promise<OperationalMetric[]> {
    const q = query(operationsCol(), orderBy('recorded_at', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() } as OperationalMetric));
  },
};

// ─── Dashboard API ──────────────────────────────────────────────

export const dashboardApi = {
  async getOverview(): Promise<DashboardOverview> {
    const [inventorySnap, operationsSnap] = await Promise.all([
      getDocs(inventoryCol()),
      getDocs(operationsCol()),
    ]);

    const inventory = inventorySnap.docs.map(d => d.data());
    const operations = operationsSnap.docs.map(d => d.data());

    const totalItems = inventory.length;
    const totalValue = inventory.reduce((sum, item: any) => sum + (item.current_stock * item.unit_cost), 0);
    const lowStockItems = inventory.filter((item: any) => item.current_stock <= item.reorder_level).length;
    const avgEfficiency = operations.length > 0
      ? operations.reduce((sum, op: any) => sum + (op.value || 0), 0) / operations.length
      : 0;

    return {
      kpis: [
        { name: 'Total Inventory Items', value: totalItems, unit: 'items', change: 0, trend: 'stable' },
        { name: 'Inventory Value', value: totalValue, unit: '$', change: 0, trend: 'up' },
        { name: 'Low Stock Alerts', value: lowStockItems, unit: 'items', change: 0, trend: lowStockItems > 0 ? 'down' : 'stable' },
        { name: 'Avg Efficiency', value: Math.round(avgEfficiency * 100) / 100, unit: '%', change: 0, trend: 'up' },
      ],
      recent_transactions: [],
      alerts: [],
      charts: {
        inventory_value: [] as ChartDataPoint[],
        order_fulfillment: [] as ChartDataPoint[],
        operational_efficiency: [] as ChartDataPoint[],
      },
    };
  },
};

// ─── Users/Admin API ────────────────────────────────────────────

export const usersApi = {
  async getAll() {
    const q = query(profilesCol(), orderBy('created_at', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  async updateRole(userId: string, role: string) {
    const ref = doc(db, 'profiles', userId);
    await updateDoc(ref, { role });
    const snap = await getDoc(ref);
    return { id: snap.id, ...snap.data() };
  },

  async delete(userId: string) {
    await deleteDoc(doc(db, 'profiles', userId));
  },
};
