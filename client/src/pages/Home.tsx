import { Link } from 'wouter';
import { useEffect, useState, useRef } from 'react';
import { 
  Leaf, 
  Calendar, 
  Users, 
  Award, 
  MapPin, 
  ChevronRight,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MainLayout } from '@/components/layout/MainLayout';
import { categories, programs, galleryItems, testimonials, facilities, products } from '@/data';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const featuredProducts = products.slice(0, 4);

  // Function to handle cart items
  const addToCart = (productId: number, productName: string, productPrice: number, productImage: string) => {
    let cart = [];
    const storedCart = localStorage.getItem('garkuwaCart');
    
    if (storedCart) {
      try {
        cart = JSON.parse(storedCart);
      } catch (e) {
        console.error('Error parsing cart data:', e);
        cart = [];
      }
    }

    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImage,
      quantity: 1
    });

    localStorage.setItem('garkuwaCart', JSON.stringify(cart));
    
    // Show notification
    alert(`${productName} added to cart!`);
  };

  // Hero slider functionality
  useEffect(() => {
    const heroSlides = [
      {
        image: "/images/manager.jpg",
        title: "Premium Sheep & Rams",
        description: "Garkuwa Livestock Farm provides high-quality sheep and rams for breeding and meat production."
      },
      {
        image: "/images/owner.jpg",
        title: "Quality Cattle",
        description: "Our farm raises healthy cattle for dairy and beef production with modern breeding techniques."
      },
      {
        image: "/images/live-chickens.jpg",
        title: "Diverse Poultry",
        description: "We offer a wide variety of poultry including layers, broilers, and turkeys for commercial farming."
      }
    ];

    const startSlideShow = () => {
      slideInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroSlides.length);
      }, 5000);
    };

    startSlideShow();

    // Clean up interval on component unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  return (
    <MainLayout>
      {/* Hero Section with Slider */}
      <section className="relative overflow-hidden bg-primary text-white">
        <div ref={sliderRef} className="hero-slider relative h-[500px] md:h-[600px]">
          <div className="slide-container h-full relative">
            <div 
              className="slide relative h-full bg-cover bg-center transition-all duration-500"
              style={{ 
                backgroundImage: `url('/images/manager.jpg')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>
              <div className="container h-full flex items-center relative z-10">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fadeIn">
                    Premium <span className="text-secondary">Livestock</span> Farm
                  </h1>
                  <p className="text-xl text-white/90 mb-8 animate-fadeIn animation-delay-200">
                    Garkuwa Livestock Farm offers premium sheep, rams, cattle, and poultry products with comprehensive training programs for both commercial and small-scale farmers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn animation-delay-400">
                    <Link href="/products">
                      <Button size="lg" className="w-full sm:w-auto bg-secondary text-primary hover:bg-secondary/90">
                        Shop Livestock
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Slide indicators */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            <button 
              className={`w-3 h-3 rounded-full ${currentSlide === 0 ? 'bg-secondary' : 'bg-white/50'}`} 
              onClick={() => setCurrentSlide(0)}
              aria-label="Go to slide 1"
            ></button>
            <button 
              className={`w-3 h-3 rounded-full ${currentSlide === 1 ? 'bg-secondary' : 'bg-white/50'}`} 
              onClick={() => setCurrentSlide(1)}
              aria-label="Go to slide 2"
            ></button>
            <button 
              className={`w-3 h-3 rounded-full ${currentSlide === 2 ? 'bg-secondary' : 'bg-white/50'}`} 
              onClick={() => setCurrentSlide(2)}
              aria-label="Go to slide 3"
            ></button>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Livestock Categories</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We raise and provide training for a variety of livestock species to ensure sustainable farming
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.slice(0, 4).map((category, index) => (
              <Link key={index} href={`/livestock/${category.slug}`}>
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1">
                  <div className="h-52 overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2 text-primary">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/livestock">
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                View All Categories
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section with Feature Boxes */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/attached_assets/farm-facility-2.jpg" 
                alt="About Garkuwa Poultry Farm" 
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-4 rounded-lg shadow-lg md:w-48 w-36 text-center">
                <p className="font-bold text-xl md:text-2xl">20+ Years</p>
                <p className="text-white/80 text-sm md:text-base">of Excellence</p>
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Our Farm</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Established in 2001, Garkuwa Poultry Farm has grown to become one of the leading poultry and livestock training centers in Plateau State, Nigeria.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our mission is to empower farmers with practical knowledge and high-quality livestock to ensure sustainable and profitable farming practices.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Leaf className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Sustainable Practices</h3>
                    <p className="text-muted-foreground">Environmentally friendly farming methods</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Certified Training</h3>
                    <p className="text-muted-foreground">Professional certification programs</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Expert Staff</h3>
                    <p className="text-muted-foreground">Experienced agricultural professionals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold">Regular Workshops</h3>
                    <p className="text-muted-foreground">Ongoing educational events</p>
                  </div>
                </div>
              </div>
              <Link href="/about">
                <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                  Learn More About Us
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              High-quality poultry products and supplies from our farm to your table
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 text-primary">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary">₦{product.price}</span>
                    <Button 
                      onClick={() => addToCart(product.id, product.name, product.price, product.image)}
                      size="sm" 
                      className="bg-secondary text-primary hover:bg-secondary/90"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="outline" className="gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                View All Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Training Programs with Card Design */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Training Programs</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive training for both beginners and experienced farmers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="border-none shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={program.image} 
                      alt={program.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 text-sm">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>{program.duration}</span>
                      <div className="w-1 h-1 rounded-full bg-muted-foreground/50"></div>
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{program.schedule}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{program.title}</h3>
                    <p className="text-muted-foreground mb-4">{program.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-primary">{program.price}</span>
                      <Link href={`/programs/${program.id}`}>
                        <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/programs">
              <Button className="bg-primary hover:bg-primary/90">View All Programs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Farm Facilities with Image Cards */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Facilities</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              State-of-the-art farm infrastructure for optimal livestock management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={facility.image} 
                    alt={facility.name} 
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-4 text-primary text-4xl">
                    {facility.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                  <p className="text-muted-foreground">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Livestock Gallery</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Take a look at some of our healthy livestock and farm activities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryItems.map((item, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer"
              >
                <img 
                  src={item.image} 
                  alt={item.caption} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm md:text-base font-medium">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/gallery">
              <Button className="bg-primary hover:bg-primary/90">View Full Gallery</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials with Cards */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Read about the experiences of farmers who have worked with our farm
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 object-cover" 
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.quote}"</p>
                  <div className="flex text-yellow-500">
                    {Array(5).fill(0).map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < testimonial.rating ? 'fill-yellow-500' : 'fill-gray-300'}`}
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section with Map */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Visit Our Farm</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Come see our facilities in person and learn more about our training programs and livestock
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Farm Location</h3>
                    <p className="text-muted-foreground">Dangi Kanam, Plateau State, Nigeria</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Phone</h3>
                    <p className="text-muted-foreground">+234 803 384 7675</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">info@garkuwapoultry.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15819.224098994663!2d9.498991851931153!3d8.865766399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1053729acb3c0913%3A0x7acc0f9e857b2494!2sPlateau%20State!5e0!3m2!1sen!2sng!4v1651545462584!5m2!1sen!2sng" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                aria-hidden="false" 
                title="Farm Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Farming Journey?</h2>
              <p className="text-white/90 text-lg mb-6">
                Join our next training program or visit our farm to purchase quality livestock and learn from our experts.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
              <Link href="/programs">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto bg-secondary text-primary hover:bg-secondary/90">
                  Enroll in Training
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-white border-white hover:bg-white hover:text-primary">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}