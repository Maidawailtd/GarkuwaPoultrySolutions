import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, User, X, ShoppingCart } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';

export function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [location, navigate] = useLocation();
  const { isAuthenticated, user, logout } = useAuthStore();

  // Handle scroll effect for the navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check cart count on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('garkuwaCart');
    if (storedCart) {
      try {
        const cart = JSON.parse(storedCart);
        setCartCount(cart.length);
      } catch (e) {
        console.error('Error parsing cart data:', e);
      }
    }
  }, []);

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
    <header className={`sticky top-0 z-50 w-full bg-primary text-white transition-all duration-300 ${isScrolled ? 'py-2 shadow-md' : 'py-4'}`}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="Garkuwa Livestock Farm Logo" 
              className="h-12 w-auto mr-2" 
            />
            <span className="text-xl font-bold">Garkuwa Livestock Farm</span>
          </Link>
          <nav className="mx-6 hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link href="/" className={`text-sm font-medium transition-colors hover:text-secondary ${location === '/' ? 'text-secondary' : 'text-white'}`}>
              Home
            </Link>
            <Link href="/about" className={`text-sm font-medium transition-colors hover:text-secondary ${location === '/about' ? 'text-secondary' : 'text-white'}`}>
              About
            </Link>
            <Link href="/livestock" className={`text-sm font-medium transition-colors hover:text-secondary ${location === '/livestock' ? 'text-secondary' : 'text-white'}`}>
              Livestock
            </Link>
            <Link href="/products" className={`text-sm font-medium transition-colors hover:text-secondary ${location === '/products' ? 'text-secondary' : 'text-white'}`}>
              Products
            </Link>
            <Link href="/facilities" className={`text-sm font-medium transition-colors hover:text-secondary ${location === '/facilities' ? 'text-secondary' : 'text-white'}`}>
              Facilities
            </Link>
            <Link href="/training" className={`text-sm font-medium transition-colors hover:text-secondary ${location === '/training' ? 'text-secondary' : 'text-white'}`}>
              Training
            </Link>
            <Link href="/contact" className={`text-sm font-medium transition-colors hover:text-secondary ${location === '/contact' ? 'text-secondary' : 'text-white'}`}>
              Contact
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/cart" className="relative">
            <Button variant="ghost" className="text-white hover:text-secondary">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-secondary text-primary">{cartCount}</Badge>
              )}
            </Button>
          </Link>
          
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
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    My Orders
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
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-primary">Log in</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-secondary text-primary hover:bg-secondary/90">Sign up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex justify-between items-center mb-6">
              <Link href="/" className="flex items-center" onClick={() => setIsMenuOpen(false)}>
                <img 
                  src="/images/logo.png" 
                  alt="Garkuwa Livestock Farm Logo" 
                  className="h-10 w-auto mr-2" 
                />
                <span className="text-xl font-bold text-primary">Garkuwa Livestock Farm</span>
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
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/about' ? 'bg-muted' : ''}`}>
                About
              </Link>
              <Link href="/livestock" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/livestock' ? 'bg-muted' : ''}`}>
                Livestock
              </Link>
              <Link href="/products" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/products' ? 'bg-muted' : ''}`}>
                Products
              </Link>
              <Link href="/facilities" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/facilities' ? 'bg-muted' : ''}`}>
                Facilities
              </Link>
              <Link href="/training" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/training' ? 'bg-muted' : ''}`}>
                Training
              </Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/contact' ? 'bg-muted' : ''}`}>
                Contact
              </Link>
              <Link href="/cart" onClick={() => setIsMenuOpen(false)} className={`block text-base font-medium p-2 rounded-lg hover:bg-muted ${location === '/cart' ? 'bg-muted' : ''}`}>
                Cart {cartCount > 0 && `(${cartCount})`}
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
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)} className="block text-base font-medium p-2 rounded-lg hover:bg-muted mt-2">
                      Dashboard
                    </Link>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="block text-base font-medium p-2 rounded-lg hover:bg-muted">
                      Profile
                    </Link>
                    <Link href="/orders" onClick={() => setIsMenuOpen(false)} className="block text-base font-medium p-2 rounded-lg hover:bg-muted">
                      My Orders
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
                    <Button className="w-full justify-center bg-primary">
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