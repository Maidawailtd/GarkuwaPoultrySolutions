import { Link } from 'wouter';
import { Briefcase, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t">
      <div className="container py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/">
              <a className="flex items-center mb-4">
                <Briefcase className="h-6 w-6 mr-2 text-primary" />
                <span className="text-xl font-bold">MGLinkCo</span>
              </a>
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
                <Link href="/projects">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Post a Project
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/freelancers">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Find Freelancers
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Payment Protection
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Get Started
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">For Freelancers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/projects">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Find Work
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Build Profile
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Payment Guarantee
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/register">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Join Us
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Help Center
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Community
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <a className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} MGLinkCo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}