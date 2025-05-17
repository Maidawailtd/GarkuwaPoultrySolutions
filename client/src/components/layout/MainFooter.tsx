import { Link } from 'wouter';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  MapPin, 
  Phone,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container py-12 md:py-16">
        {/* Newsletter section */}
        <div className="bg-secondary/20 p-6 md:p-8 rounded-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-white/80">
                Get updates on new livestock, training programs, and special offers
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-md flex-grow bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <Button className="bg-secondary hover:bg-secondary/90 text-primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
                <img 
                  src="/images/logo.png" 
                  alt="Garkuwa Livestock Farm Logo" 
                  className="h-10 w-auto mr-2" 
                />
                <span className="text-xl font-bold">Garkuwa Livestock Farm</span>
            </Link>
            <p className="text-white/80 text-sm mb-4">
              Premier livestock farm offering quality sheep, rams, cattle, poultry, and comprehensive training programs in Plateau State, Nigeria.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-secondary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/livestock" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Our Livestock
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Farm Products
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Training Programs
                </Link>
              </li>
              <li>
                <Link href="/facilities" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Farm Facilities
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4 text-secondary">Our Services</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services/poultry-training" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Poultry Training
                </Link>
              </li>
              <li>
                <Link href="/services/livestock-sales" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Livestock Sales
                </Link>
              </li>
              <li>
                <Link href="/services/consultancy" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Farm Consultancy
                </Link>
              </li>
              <li>
                <Link href="/services/feed-production" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Feed Production
                </Link>
              </li>
              <li>
                <Link href="/services/equipment" className="text-sm text-white/80 hover:text-secondary transition-colors flex items-center">
                  <ChevronRight className="h-4 w-4 mr-1" />
                  Farm Equipment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4 text-secondary">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-secondary mt-0.5" />
                <span className="text-sm text-white/80">
                  Dangi Kanam, Plateau State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-secondary" />
                <a href="mailto:info@garkuwapoultry.com" className="text-sm text-white/80 hover:text-secondary transition-colors">
                  info@garkuwapoultry.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-secondary" />
                <a href="tel:+2348033847675" className="text-sm text-white/80 hover:text-secondary transition-colors">
                  +234 803 384 7675
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/80">&copy; {currentYear} Garkuwa Livestock Farm. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-white/80 hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-white/80 hover:text-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}