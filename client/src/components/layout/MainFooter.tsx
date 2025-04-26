import { Link } from 'wouter';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Briefcase, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';

export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
                <Briefcase className="h-6 w-6 mr-2 text-primary" />
                <span className="text-xl font-bold">MGLinkCo</span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Connecting talent with opportunities. The premier freelancing platform for professionals worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">For Clients</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Post a Project
                </Link>
              </li>
              <li>
                <Link href="/freelancers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find Freelancers
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Join as a Client
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Payment Protection
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">For Poultry Keepers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Find Breeds
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Join as a Poultry Keeper
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Build Poultry Profile
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Manage Livestock Securely
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  123 Freelance Street, Digital City
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:info@mglinkco.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  info@mglinkco.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href="tel:+12345678901" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  +1 (234) 567-8901
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Garkuwa Poultry Farm. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}