import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore, useNotificationStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';
import { useSidebar } from '@/components/ui/sidebar';

export function DashboardNavbar() {
  const { user, logout } = useAuthStore();
  const { unreadCount, fetchUnreadCount } = useNotificationStore();
  const [, setLocation] = useLocation();
  const { toggleSidebar, isMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    // Fetch unread notifications count when component mounts
    fetchUnreadCount();
    
    // Setup interval to periodically check for new notifications
    const intervalId = setInterval(() => {
      fetchUnreadCount();
    }, 60000); // Check every minute
    
    return () => clearInterval(intervalId);
  }, [fetchUnreadCount]);

  const handleLogout = () => {
    logout();
    setLocation('/');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex">
          {/* Mobile menu button */}
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setOpenMobile(true)} className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open sidebar</span>
            </Button>
          )}
          
          {/* Sidebar toggle button (desktop) */}
          {!isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hidden md:flex mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          )}
          
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Badge>
                )}
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {unreadCount > 0 ? (
                  <div className="py-2 px-3 text-sm">
                    You have {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
                  </div>
                ) : (
                  <div className="py-2 px-3 text-sm text-muted-foreground">
                    No new notifications
                  </div>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button variant="link" className="w-full justify-center" onClick={() => setLocation('/messages')}>
                  View all messages
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || undefined} alt={user?.fullName} />
                  <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLocation('/profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation('/edit-profile')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}