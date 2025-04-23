import { Link, useLocation } from 'wouter';
import { 
  Briefcase, 
  Home, 
  MessageSquare,
  FileText,
  User,
  Plus,
  ChevronRight,
  X
} from 'lucide-react';
import { UserRole } from '@shared/schema';
import { useAuthStore } from '@/lib/store';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export function DashboardSidebar() {
  const [currentPath] = useLocation();
  const { user } = useAuthStore();
  const { 
    state, 
    openMobile, 
    setOpenMobile, 
    isMobile 
  } = useSidebar();
  
  const isCollapsed = state === 'collapsed';
  const isClient = user?.role === UserRole.CLIENT;
  const isFreelancer = user?.role === UserRole.FREELANCER;
  
  const sidebarItems = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: Home,
      show: true,
    },
    {
      title: 'My Profile',
      href: '/profile',
      icon: User,
      show: true,
    },
    {
      title: 'Messages',
      href: '/messages',
      icon: MessageSquare,
      show: true,
    },
    {
      title: 'Contracts',
      href: '/contracts',
      icon: FileText,
      show: true,
    },
    {
      title: 'Post a Project',
      href: '/create-project',
      icon: Plus,
      show: isClient,
    },
    {
      title: 'My Projects',
      href: '/my-projects',
      icon: Briefcase,
      show: isClient,
    },
    {
      title: 'Find Projects',
      href: '/projects',
      icon: Briefcase,
      show: isFreelancer,
    },
    {
      title: 'My Proposals',
      href: '/my-proposals',
      icon: FileText,
      show: isFreelancer,
    },
  ];
  
  return (
    <>
      {/* Mobile sidebar overlay */}
      {openMobile && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setOpenMobile(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col border-r bg-background transition-all duration-300",
          isCollapsed ? "w-[70px]" : "w-[250px]",
          isMobile && "transform transition-transform duration-300",
          isMobile && !openMobile && "-translate-x-full",
        )}
      >
        {/* Sidebar header */}
        <div className={cn(
          "flex h-16 items-center border-b px-4",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {!isCollapsed && (
            <Link href="/">
              <a className="flex items-center">
                <Briefcase className="h-6 w-6 mr-2 text-primary" />
                <span className="text-xl font-bold">MGLinkCo</span>
              </a>
            </Link>
          )}
          
          {isCollapsed && (
            <Briefcase className="h-6 w-6 text-primary" />
          )}
          
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={() => setOpenMobile(false)}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          )}
        </div>
        
        {/* Sidebar content */}
        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {sidebarItems
              .filter(item => item.show)
              .map((item, index) => (
                <Link key={index} href={item.href}>
                  <a 
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                      currentPath === item.href 
                        ? "bg-secondary text-secondary-foreground" 
                        : "hover:bg-secondary/50",
                      isCollapsed && "justify-center px-0"
                    )}
                  >
                    <item.icon className={cn(
                      "h-5 w-5",
                      currentPath === item.href 
                        ? "text-primary" 
                        : "text-muted-foreground"
                    )} />
                    {!isCollapsed && (
                      <span>{item.title}</span>
                    )}
                    {!isCollapsed && currentPath === item.href && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </a>
                </Link>
              ))}
          </nav>
        </ScrollArea>
      </aside>
      
      {/* Content margin to prevent sidebar overlap */}
      <div 
        className={cn(
          "hidden md:block transition-all duration-300",
          isCollapsed ? "ml-[70px]" : "ml-[250px]"
        )} 
      />
    </>
  );
}