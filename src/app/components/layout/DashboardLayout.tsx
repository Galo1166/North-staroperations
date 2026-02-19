import { Outlet, useNavigate, useLocation } from 'react-router';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { getCurrentUser, logout, canAccessAdmin } from '../../lib/auth';
import { NorthStarLogo } from '../NorthStarLogo';
import {
  LayoutDashboard,
  Package,
  Activity,
  Settings,
  LogOut,
  Menu,
  Bell,
} from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';

const navigation = [
  { name: 'Dashboard', href: '/dashboard/main', icon: LayoutDashboard },
  { name: 'Inventory', href: '/dashboard/inventory', icon: Package },
  { name: 'Operations', href: '/dashboard/operations', icon: Activity },
];

const adminNavigation = [
  { name: 'Admin Panel', href: '/dashboard/admin', icon: Settings },
];

export function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getCurrentUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const allNavigation = [
    ...navigation,
    ...(canAccessAdmin() ? adminNavigation : []),
  ];

  const NavLinks = () => (
    <>
      {allNavigation.map((item) => {
        const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
        return (
          <Button
            key={item.name}
            variant={isActive ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => {
              navigate(item.href);
              setMobileMenuOpen(false);
            }}
          >
            <item.icon className="mr-2 size-4" />
            {item.name}
          </Button>
        );
      })}
    </>
  );

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white">
        <div className="flex h-16 items-center gap-4 px-4 md:px-6">
          {/* Mobile menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-4 mt-4">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <NorthStarLogo className="h-12" />

          <div className="flex-1" />

          {/* Right side */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="size-5" />
            <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full" />
          </Button>

          {/* Logout Button - Visible on all screens */}
          <Button
            onClick={handleLogout}
            variant="destructive"
            size="sm"
            className="gap-2"
          >
            <LogOut className="size-4" />
            <span className="hidden sm:inline">Log Out</span>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden md:inline">{user.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary" className="w-fit mt-1 capitalize">
                    {user.role.replace('_', ' ')}
                  </Badge>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 size-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 size-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 flex-col gap-2 border-r bg-white p-4 min-h-[calc(100vh-4rem)]">
          <NavLinks />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
