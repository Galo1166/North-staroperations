import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ChartCard } from '../components/dashboard/ChartCard';
import { mockInventoryItems, mockStockAlerts, mockStockMovementChart, mockTopMovingItems } from '../lib/mockData';
import { Package, Search, Download, AlertTriangle, Plus, Filter } from 'lucide-react';
import { canEditInventory } from '../lib/auth';

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const filteredItems = mockInventoryItems.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesLocation = locationFilter === 'all' || item.location === locationFilter;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const categories = [...new Set(mockInventoryItems.map(item => item.category))];
  const locations = [...new Set(mockInventoryItems.map(item => item.location))];

  const getStockStatus = (current: number, reorder: number) => {
    const percentage = (current / reorder) * 100;
    if (percentage <= 50) return { label: 'Critical', variant: 'destructive' as const };
    if (percentage <= 100) return { label: 'Low', variant: 'secondary' as const };
    return { label: 'Normal', variant: 'default' as const };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and manage your inventory levels
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 size-4" />
            Export
          </Button>
          {canEditInventory() && (
            <Button>
              <Plus className="mr-2 size-4" />
              Add Item
            </Button>
          )}
        </div>
      </div>

      {/* Stock Alerts */}
      {mockStockAlerts.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="size-5 text-orange-600" />
              <CardTitle>Active Alerts ({mockStockAlerts.length})</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {mockStockAlerts.map((alert) => (
                <div key={alert.id} className="bg-white p-3 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium text-sm">{alert.item.name}</p>
                    <Badge variant={alert.severity === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                      {alert.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{alert.message}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ChartCard
          title="Stock by Category"
          description="Current stock vs reorder levels"
          data={mockStockMovementChart}
          type="bar"
          xAxisKey="date"
          color="#3b82f6"
        />
        <ChartCard
          title="Top Moving Items"
          description="Items with highest transaction volume"
          data={mockTopMovingItems}
          type="bar"
          xAxisKey="date"
          color="#10b981"
        />
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <CardTitle>Inventory Items ({filteredItems.length})</CardTitle>
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="mr-2 size-4" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>{loc}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Current Stock</TableHead>
                  <TableHead className="text-right">Reorder Level</TableHead>
                  <TableHead className="text-right">Unit Cost</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => {
                  const status = getStockStatus(item.current_stock, item.reorder_level);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell className="text-right">{item.current_stock}</TableCell>
                      <TableCell className="text-right">{item.reorder_level}</TableCell>
                      <TableCell className="text-right">${item.unit_cost}</TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
