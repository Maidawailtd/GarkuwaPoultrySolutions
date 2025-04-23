import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, User, X, Briefcase } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
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
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Briefcase className="h-6 w-6 mr-2 text-primary" />
            <span className="text-xl font-bold">MGLinkCo</span>
          </Link>
          <nav className="mx-6 hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
              Home
            </Link>
            <Link href="/projects" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/projects' ? 'text-primary' : 'text-muted-foreground'}`}>
              Find Projects
            </Link>
            <Link href="/freelancers" className={`text-sm font-medium transition-colors hover:text-primary ${location === '/freelancers' ? 'text-primary' : 'text-muted-foreground'}`}>
              Find Freelancers
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user?.avatar || undefined} />
                      <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <Briefcase className="h-6 w-6 mr-2 text-primary" />
                <span className="text-xl font-bold">MGLinkCo</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
            
            <div className="space-y-4">
              <Link href="/" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/' ? 'bg-muted' : ''}`}>
                Home
              </Link>
              <Link href="/projects" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/projects' ? 'bg-muted' : ''}`}>
                Find Projects
              </Link>
              <Link href="/freelancers" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/freelancers' ? 'bg-muted' : ''}`}>
                Find Freelancers
              </Link>
              
              {isAuthenticated ? (
                <>
                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center p-2">
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage src={user?.avatar || undefined} />
                        <AvatarFallback>{getInitials(user?.fullName)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user?.fullName}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      <a className="block text-base font-medium p-2 rounded-lg hover:bg-muted mt-2">
                        Dashboard
                      </a>
                    </Link>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <a className="block text-base font-medium p-2 rounded-lg hover:bg-muted">
                        Profile
                      </a>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left text-base font-medium p-2 rounded-lg hover:bg-muted text-red-500"
                    >
                      Log out
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t pt-4 mt-4 flex flex-col space-y-3">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-center">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                    <Button className="w-full justify-center">
                      Sign up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}