import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  BadgeCheck, 
  Briefcase, 
  CheckCircle, 
  Shield, 
  Star, 
  UserCheck,
  ArrowRight,
  Search,
  CreditCard,
  Globe,
  TrendingUp
} from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Connect with top freelance talent for your business
              </h1>
              <p className="text-lg md:text-xl opacity-90">
                MGLinkCo connects businesses with skilled freelancers. Post a project or browse opportunities in development, design, writing, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <Button size="lg" variant="secondary">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                    Browse Projects
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-90">
                <CheckCircle className="h-4 w-4" />
                <span>Trusted by 10,000+ businesses worldwide</span>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="bg-white rounded-lg shadow-xl p-6 max-w-md mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Web Development Project</h3>
                    <p className="text-sm text-gray-500">Posted by TechCorp Inc.</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6">
                  Looking for an experienced React developer to build a responsive web application with modern UI/UX design...
                </p>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-5">
                  <span>Budget: $2,000 - $3,000</span>
                  <span>2 days ago</span>
                </div>
                <Button className="w-full">Apply Now</Button>
              </div>
              
              <div className="absolute -bottom-8 -left-8 bg-white rounded-lg shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                  <Star className="h-4 w-4 text-yellow-400" />
                </div>
                <p className="text-xs text-gray-700">
                  "Found an amazing developer within hours! Excellent platform."
                </p>
                <p className="text-xs font-medium text-gray-900 mt-2">
                  - Sarah J., Marketing Director
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How MGLinkCo Works</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              We make it easy to connect with the right talent and get work done
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Post a Project</h3>
              <p className="text-muted-foreground">
                Create a detailed project listing with your requirements, timeline, and budget to attract the right talent.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Review Proposals</h3>
              <p className="text-muted-foreground">
                Receive proposals from qualified freelancers and review profiles, ratings, and previous work to find the best match.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg border bg-card">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Work Securely</h3>
              <p className="text-muted-foreground">
                Use our secure platform for communication, file sharing, and milestone-based payments to ensure quality work.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/register">
              <Button size="lg">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Explore Categories</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Find freelancers and projects across a wide range of skills and industries
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: Globe, name: 'Web Development' },
              { icon: TrendingUp, name: 'Digital Marketing' },
              { icon: CreditCard, name: 'Graphic Design' },
              { icon: Search, name: 'Content Writing' },
              { icon: Briefcase, name: 'Business Consulting' },
              { icon: BadgeCheck, name: 'Mobile Development' },
              { icon: Star, name: 'UI/UX Design' },
              { icon: Shield, name: 'Data Science' },
            ].map((category, index) => (
              <div key={index} className="p-6 rounded-lg border bg-card hover:shadow-md transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{category.name}</h3>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/projects">
              <Button variant="outline" size="lg">
                View All Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose MGLinkCo?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <UserCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Verified Freelancers</h3>
                    <p className="text-muted-foreground">
                      Our rigorous vetting process ensures you work with qualified professionals with verified skills and experience.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Shield className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
                    <p className="text-muted-foreground">
                      Our escrow payment system protects both clients and freelancers, releasing funds only when work is completed and approved.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
                    <p className="text-muted-foreground">
                      Our rating and review system helps you identify top performers and ensures accountability for every project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-800 p-8 rounded-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold">Join Thousands of Satisfied Users</h3>
                <p className="text-muted-foreground mt-2">
                  See what our clients and freelancers have to say
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                      <span className="font-bold">JD</span>
                    </div>
                    <div>
                      <p className="font-semibold">John D.</p>
                      <p className="text-sm text-muted-foreground">Tech Startup Founder</p>
                    </div>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">
                    "MGLinkCo made it incredibly easy to find a skilled developer for our mobile app. The quality of talent exceeded our expectations!"
                  </p>
                </div>
                
                <div className="bg-card p-6 rounded-lg border">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3">
                      <span className="font-bold">ML</span>
                    </div>
                    <div>
                      <p className="font-semibold">Maria L.</p>
                      <p className="text-sm text-muted-foreground">Freelance Designer</p>
                    </div>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">
                    "As a freelancer, MGLinkCo has been an amazing platform to find clients and grow my business. The payment protection gives me peace of mind."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Join our global community of businesses and freelancers today and find the perfect match for your next project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <Button size="lg" variant="secondary">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                Browse Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}