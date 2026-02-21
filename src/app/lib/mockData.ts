import {
  Organization,
  User,
  InventoryItem,
  InventoryTransaction,
  OperationalMetric,
  KPI,
  ChartDataPoint,
  StockAlert,
  AuditLog,
  DashboardOverview,
} from './types';

// Mock Organizations
export const mockOrganizations: Organization[] = [
  {
    id: '1',
    name: 'Analytics Platform',
    industry: 'Technology',
    created_at: '2024-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Acme Corporation',
    industry: 'Manufacturing',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Global Logistics Inc',
    industry: 'Logistics',
    created_at: '2024-02-01T00:00:00Z',
  },
];

// Mock Users for user management
export const mockAllUsers: User[] = [
  {
    id: '1',
    organization_id: '2',
    role: 'admin',
    email: 'admin@acmecorp.com',
    name: 'John Manager',
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    organization_id: '2',
    role: 'analyst',
    email: 'analyst@acmecorp.com',
    name: 'Sarah Analyst',
    created_at: '2024-02-01T00:00:00Z',
  },
  {
    id: '3',
    organization_id: '2',
    role: 'analyst',
    email: 'james@acmecorp.com',
    name: 'James Wilson',
    created_at: '2024-02-05T00:00:00Z',
  },
  {
    id: '4',
    organization_id: '2',
    role: 'viewer',
    email: 'viewer@acmecorp.com',
    name: 'Mike Viewer',
    created_at: '2024-02-10T00:00:00Z',
  },
];

// Mock Inventory Items
export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    organization_id: '2',
    name: 'Steel Sheets - Grade A',
    sku: 'STL-001-A',
    category: 'Raw Materials',
    current_stock: 450,
    reorder_level: 500,
    unit_cost: 125.5,
    location: 'Warehouse A',
    supplier: 'SteelCo Industries',
  },
  {
    id: '2',
    organization_id: '2',
    name: 'Aluminum Rods',
    sku: 'ALU-002-B',
    category: 'Raw Materials',
    current_stock: 1200,
    reorder_level: 800,
    unit_cost: 45.25,
    location: 'Warehouse A',
    supplier: 'MetalWorks Ltd',
  },
  {
    id: '3',
    organization_id: '2',
    name: 'Industrial Bearings',
    sku: 'BRG-003-X',
    category: 'Components',
    current_stock: 89,
    reorder_level: 200,
    unit_cost: 18.75,
    location: 'Warehouse B',
    supplier: 'BearingPro',
  },
  {
    id: '4',
    organization_id: '2',
    name: 'Hydraulic Pumps',
    sku: 'HYD-004-P',
    category: 'Components',
    current_stock: 34,
    reorder_level: 50,
    unit_cost: 350.0,
    location: 'Warehouse B',
    supplier: 'HydroTech Systems',
  },
  {
    id: '5',
    organization_id: '2',
    name: 'Packaging Materials',
    sku: 'PKG-005-M',
    category: 'Supplies',
    current_stock: 2500,
    reorder_level: 1000,
    unit_cost: 2.5,
    location: 'Warehouse C',
    supplier: 'PackPro Solutions',
  },
  {
    id: '6',
    organization_id: '2',
    name: 'Safety Equipment Set',
    sku: 'SAF-006-E',
    category: 'Supplies',
    current_stock: 156,
    reorder_level: 100,
    unit_cost: 45.0,
    location: 'Warehouse C',
    supplier: 'SafetyFirst Co',
  },
];

// Mock Inventory Transactions
export const mockTransactions: InventoryTransaction[] = [
  {
    id: '1',
    item_id: '1',
    type: 'OUT',
    quantity: 50,
    cost: 6275,
    reason: 'Production Order #1234',
    created_at: '2026-02-18T09:30:00Z',
  },
  {
    id: '2',
    item_id: '2',
    type: 'IN',
    quantity: 300,
    cost: 13575,
    reason: 'Purchase Order #5678',
    created_at: '2026-02-18T08:15:00Z',
  },
  {
    id: '3',
    item_id: '3',
    type: 'OUT',
    quantity: 25,
    cost: 468.75,
    reason: 'Production Order #1235',
    created_at: '2026-02-17T14:20:00Z',
  },
  {
    id: '4',
    item_id: '4',
    type: 'IN',
    quantity: 10,
    cost: 3500,
    reason: 'Purchase Order #5679',
    created_at: '2026-02-17T11:00:00Z',
  },
  {
    id: '5',
    item_id: '5',
    type: 'OUT',
    quantity: 150,
    cost: 375,
    reason: 'Shipment #9876',
    created_at: '2026-02-16T16:45:00Z',
  },
];

// Mock KPIs
export const mockKPIs: KPI[] = [
  {
    name: 'Order Fulfillment Rate',
    value: 94.5,
    unit: '%',
    change: 2.3,
    trend: 'up',
  },
  {
    name: 'Average Lead Time',
    value: 3.2,
    unit: 'days',
    change: -8.5,
    trend: 'up',
  },
  {
    name: 'Operational Efficiency',
    value: 87.8,
    unit: '%',
    change: 5.1,
    trend: 'up',
  },
  {
    name: 'Inventory Turnover',
    value: 6.4,
    unit: 'x/year',
    change: 12.8,
    trend: 'up',
  },
  {
    name: 'Stock Accuracy',
    value: 98.2,
    unit: '%',
    change: 1.2,
    trend: 'up',
  },
  {
    name: 'Average Downtime',
    value: 2.1,
    unit: 'hours',
    change: -15.3,
    trend: 'up',
  },
];

// Mock Stock Alerts
export const mockStockAlerts: StockAlert[] = [
  {
    id: '1',
    item: mockInventoryItems[2],
    type: 'low_stock',
    severity: 'high',
    message: 'Industrial Bearings below reorder level (89/200)',
    created_at: '2026-02-18T10:00:00Z',
  },
  {
    id: '2',
    item: mockInventoryItems[3],
    type: 'low_stock',
    severity: 'high',
    message: 'Hydraulic Pumps critically low (34/50)',
    created_at: '2026-02-18T09:30:00Z',
  },
  {
    id: '3',
    item: mockInventoryItems[0],
    type: 'low_stock',
    severity: 'medium',
    message: 'Steel Sheets approaching reorder level (450/500)',
    created_at: '2026-02-17T15:20:00Z',
  },
];

// Mock Chart Data - Inventory Value Over Time
export const mockInventoryValueChart: ChartDataPoint[] = [
  { date: '2026-01-01', value: 245000 },
  { date: '2026-01-08', value: 248500 },
  { date: '2026-01-15', value: 251200 },
  { date: '2026-01-22', value: 255800 },
  { date: '2026-01-29', value: 258900 },
  { date: '2026-02-05', value: 262400 },
  { date: '2026-02-12', value: 267800 },
  { date: '2026-02-18', value: 272150 },
];

// Mock Chart Data - Order Fulfillment Rate
export const mockOrderFulfillmentChart: ChartDataPoint[] = [
  { date: '2026-01-01', value: 92.1 },
  { date: '2026-01-08', value: 91.5 },
  { date: '2026-01-15', value: 93.2 },
  { date: '2026-01-22', value: 92.8 },
  { date: '2026-01-29', value: 94.1 },
  { date: '2026-02-05', value: 93.7 },
  { date: '2026-02-12', value: 94.3 },
  { date: '2026-02-18', value: 94.5 },
];

// Mock Chart Data - Operational Efficiency
export const mockOperationalEfficiencyChart: ChartDataPoint[] = [
  { date: '2026-01-01', value: 83.5 },
  { date: '2026-01-08', value: 84.2 },
  { date: '2026-01-15', value: 85.1 },
  { date: '2026-01-22', value: 85.8 },
  { date: '2026-01-29', value: 86.3 },
  { date: '2026-02-05', value: 86.9 },
  { date: '2026-02-12', value: 87.4 },
  { date: '2026-02-18', value: 87.8 },
];

// Mock Chart Data - Stock Movement by Category
export const mockStockMovementChart: ChartDataPoint[] = [
  { date: 'Raw Materials', value: 1650, category: 'current' },
  { date: 'Components', value: 123, category: 'current' },
  { date: 'Supplies', value: 2656, category: 'current' },
  { date: 'Raw Materials', value: 1300, category: 'reorder' },
  { date: 'Components', value: 250, category: 'reorder' },
  { date: 'Supplies', value: 1100, category: 'reorder' },
];

// Mock Chart Data - Top Moving Items
export const mockTopMovingItems: ChartDataPoint[] = [
  { date: 'Packaging Materials', value: 850 },
  { date: 'Aluminum Rods', value: 620 },
  { date: 'Steel Sheets', value: 450 },
  { date: 'Safety Equipment', value: 280 },
  { date: 'Industrial Bearings', value: 195 },
];

// Mock Operational Metrics
export const mockOperationalMetrics: OperationalMetric[] = [
  {
    id: '1',
    organization_id: '2',
    metric_name: 'Production Output',
    value: 1250,
    unit: 'units',
    department: 'Manufacturing',
    recorded_at: '2026-02-18T00:00:00Z',
  },
  {
    id: '2',
    organization_id: '2',
    metric_name: 'Quality Control Pass Rate',
    value: 97.5,
    unit: '%',
    department: 'Quality',
    recorded_at: '2026-02-18T00:00:00Z',
  },
  {
    id: '3',
    organization_id: '2',
    metric_name: 'Equipment Utilization',
    value: 89.3,
    unit: '%',
    department: 'Operations',
    recorded_at: '2026-02-18T00:00:00Z',
  },
];

// Mock Audit Logs
export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    user_id: '2',
    action: 'UPDATE',
    resource: 'inventory_item',
    details: 'Updated stock level for STL-001-A',
    ip_address: '192.168.1.100',
    created_at: '2026-02-18T10:30:00Z',
  },
  {
    id: '2',
    user_id: '1',
    action: 'CREATE',
    resource: 'user',
    details: 'Created new analyst account',
    ip_address: '192.168.1.50',
    created_at: '2026-02-18T09:15:00Z',
  },
  {
    id: '3',
    user_id: '2',
    action: 'EXPORT',
    resource: 'report',
    details: 'Exported inventory report (CSV)',
    ip_address: '192.168.1.100',
    created_at: '2026-02-17T16:45:00Z',
  },
  {
    id: '4',
    user_id: '1',
    action: 'UPDATE',
    resource: 'organization',
    details: 'Updated organization settings',
    ip_address: '192.168.1.50',
    created_at: '2026-02-17T14:20:00Z',
  },
];

// Mock Dashboard Overview
export const mockDashboardOverview: DashboardOverview = {
  kpis: mockKPIs,
  recent_transactions: mockTransactions.slice(0, 5),
  alerts: mockStockAlerts,
  charts: {
    inventory_value: mockInventoryValueChart,
    order_fulfillment: mockOrderFulfillmentChart,
    operational_efficiency: mockOperationalEfficiencyChart,
  },
};
