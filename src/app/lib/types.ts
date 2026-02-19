// User roles matching RBAC structure
export type UserRole = 'super_admin' | 'org_admin' | 'analyst' | 'viewer';

// Organization structure
export interface Organization {
  id: string;
  name: string;
  industry: string;
  created_at: string;
}

// User structure
export interface User {
  id: string;
  organization_id: string;
  organization?: Organization;
  role: UserRole;
  email: string;
  name: string;
  avatar?: string;
  created_at: string;
}

// Inventory item
export interface InventoryItem {
  id: string;
  organization_id: string;
  name: string;
  sku: string;
  category: string;
  current_stock: number;
  reorder_level: number;
  unit_cost: number;
  location: string;
  supplier?: string;
}

// Inventory transaction
export interface InventoryTransaction {
  id: string;
  item_id: string;
  item?: InventoryItem;
  type: 'IN' | 'OUT';
  quantity: number;
  cost: number;
  reason?: string;
  created_at: string;
}

// Operational metric
export interface OperationalMetric {
  id: string;
  organization_id: string;
  metric_name: string;
  value: number;
  unit?: string;
  department?: string;
  recorded_at: string;
}

// KPI data
export interface KPI {
  name: string;
  value: number;
  unit: string;
  change: number; // percentage change
  trend: 'up' | 'down' | 'stable';
}

// Chart data
export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
  category?: string;
}

// Stock alert
export interface StockAlert {
  id: string;
  item: InventoryItem;
  type: 'low_stock' | 'out_of_stock' | 'overstock';
  severity: 'high' | 'medium' | 'low';
  message: string;
  created_at: string;
}

// Audit log
export interface AuditLog {
  id: string;
  user_id: string;
  user?: User;
  action: string;
  resource: string;
  details: string;
  ip_address?: string;
  created_at: string;
}

// API response types
export interface DashboardOverview {
  kpis: KPI[];
  recent_transactions: InventoryTransaction[];
  alerts: StockAlert[];
  charts: {
    inventory_value: ChartDataPoint[];
    order_fulfillment: ChartDataPoint[];
    operational_efficiency: ChartDataPoint[];
  };
}
