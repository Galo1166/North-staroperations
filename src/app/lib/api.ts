import {
  mockAllUsers,
  mockDashboardOverview,
  mockInventoryItems,
  mockOperationalMetrics,
} from './mockData';
import type { InventoryItem, OperationalMetric, DashboardOverview, ChartDataPoint } from './types';

let inventoryStore = [...mockInventoryItems];
let operationsStore = [...mockOperationalMetrics];
let usersStore = [...mockAllUsers];

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

export const inventoryApi = {
  async getAll(): Promise<InventoryItem[]> {
    return clone(inventoryStore);
  },

  async getById(id: string): Promise<InventoryItem> {
    const item = inventoryStore.find((candidate) => candidate.id === id);
    if (!item) throw new Error('Item not found');
    return clone(item);
  },

  async create(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    const createdItem = { id: `item-${Date.now()}`, ...item } as InventoryItem;
    inventoryStore = [createdItem, ...inventoryStore];
    return clone(createdItem);
  },

  async update(id: string, updates: Partial<InventoryItem>): Promise<InventoryItem> {
    inventoryStore = inventoryStore.map((item) => (item.id === id ? { ...item, ...updates } : item));
    const updatedItem = inventoryStore.find((item) => item.id === id);
    if (!updatedItem) throw new Error('Item not found');
    return clone(updatedItem);
  },

  async delete(id: string): Promise<void> {
    inventoryStore = inventoryStore.filter((item) => item.id !== id);
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
    let results = clone(operationsStore);

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
    return clone(operationsStore);
  },
};

// ─── Dashboard API ──────────────────────────────────────────────

export const dashboardApi = {
  async getOverview(): Promise<DashboardOverview> {
    return clone(mockDashboardOverview);
  },
};

// ─── Users/Admin API ────────────────────────────────────────────

export const usersApi = {
  async getAll() {
    return clone(usersStore);
  },

  async updateRole(userId: string, role: string) {
    usersStore = usersStore.map((user) => (user.id === userId ? { ...user, role: role as any } : user));
    const updatedUser = usersStore.find((user) => user.id === userId);
    if (!updatedUser) throw new Error('User not found');
    return clone(updatedUser);
  },

  async delete(userId: string) {
    usersStore = usersStore.filter((user) => user.id !== userId);
  },
};
