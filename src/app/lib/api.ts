import { supabase } from './supabase';
import type { InventoryItem, OperationalMetric, DashboardOverview, ChartDataPoint } from './types';

// ─── Inventory API ──────────────────────────────────────────────

export const inventoryApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as InventoryItem[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as InventoryItem;
  },

  async create(item: Omit<InventoryItem, 'id'>) {
    const { data, error } = await supabase
      .from('inventory_items')
      .insert(item)
      .select()
      .single();
    if (error) throw error;
    return data as InventoryItem;
  },

  async update(id: string, updates: Partial<InventoryItem>) {
    const { data, error } = await supabase
      .from('inventory_items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as InventoryItem;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('inventory_items')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  async search(query: string) {
    const { data, error } = await supabase
      .from('inventory_items')
      .select('*')
      .or(`name.ilike.%${query}%,sku.ilike.%${query}%,category.ilike.%${query}%`)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as InventoryItem[];
  },
};

// ─── Operations API ─────────────────────────────────────────────

export const operationsApi = {
  async getAll(filters?: { department?: string; dateRange?: string }) {
    let query = supabase
      .from('operations')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.department && filters.department !== 'all') {
      query = query.eq('department', filters.department);
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
      query = query.gte('created_at', fromDate.toISOString());
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as OperationalMetric[];
  },

  async getMetrics() {
    const { data, error } = await supabase
      .from('operations')
      .select('*')
      .order('recorded_at', { ascending: false });
    if (error) throw error;
    return data as OperationalMetric[];
  },
};

// ─── Dashboard API ──────────────────────────────────────────────

export const dashboardApi = {
  async getOverview(): Promise<DashboardOverview> {
    const [inventoryRes, operationsRes, transactionsRes, alertsRes] = await Promise.all([
      supabase.from('inventory_items').select('*'),
      supabase.from('operations').select('*'),
      supabase.from('inventory_transactions').select('*, item:inventory_items(*)').order('created_at', { ascending: false }).limit(10),
      supabase.from('stock_alerts').select('*, item:inventory_items(*)').order('created_at', { ascending: false }).limit(5),
    ]);

    const inventory = inventoryRes.data ?? [];
    const operations = operationsRes.data ?? [];
    const transactions = transactionsRes.data ?? [];
    const alerts = alertsRes.data ?? [];

    // Calculate KPIs from real data
    const totalItems = inventory.length;
    const totalValue = inventory.reduce((sum, item) => sum + (item.current_stock * item.unit_cost), 0);
    const lowStockItems = inventory.filter((item) => item.current_stock <= item.reorder_level).length;
    const avgEfficiency = operations.length > 0
      ? operations.reduce((sum, op) => sum + (op.value || 0), 0) / operations.length
      : 0;

    return {
      kpis: [
        { name: 'Total Inventory Items', value: totalItems, unit: 'items', change: 0, trend: 'stable' },
        { name: 'Inventory Value', value: totalValue, unit: '$', change: 0, trend: 'up' },
        { name: 'Low Stock Alerts', value: lowStockItems, unit: 'items', change: 0, trend: lowStockItems > 0 ? 'down' : 'stable' },
        { name: 'Avg Efficiency', value: Math.round(avgEfficiency * 100) / 100, unit: '%', change: 0, trend: 'up' },
      ],
      recent_transactions: transactions,
      alerts: alerts,
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
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async updateRole(userId: string, role: string) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(userId: string) {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (error) throw error;
  },
};
