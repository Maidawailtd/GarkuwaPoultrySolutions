import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const getSlidesToShow = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  };
  
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  
  // Update slidesToShow on window resize
  if (typeof window !== "undefined") {
    window.addEventListener("resize", () => {
      setSlidesToShow(getSlidesToShow());
    });
  }
  
  const nextSlide = () => {
    if (currentIndex < testimonials.length - slidesToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section id="testimonials" className="py-16 bg-[#2D5E2E] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            Success Stories
          </h2>
          <p className="text-lg max-w-3xl mx-auto opacity-90">
            Hear from farmers who have transformed their operations after training with us
          </p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className={`px-4 ${
                    slidesToShow === 3 ? 'w-1/3' : 
                    slidesToShow === 2 ? 'w-1/2' : 
                    'w-full'
                  }`}
                >
                  <Card className="bg-white text-neutral-800 h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="text-amber-500 mb-4 flex">
                        {[...Array(5)].map((_, starIndex) => (
                          <Star 
                            key={starIndex}
                            className={`h-5 w-5 ${starIndex < testimonial.rating ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <p className="italic mb-4">{testimonial.quote}</p>
                      <div className="mt-auto">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{testimonial.name}</h4>
                            <p className="text-sm text-gray-600">{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="absolute top-1/2 -translate-y-1/2 -left-4 md:left-0 bg-white text-[#2D5E2E] rounded-full shadow-md z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={nextSlide}
            disabled={currentIndex >= testimonials.length - slidesToShow}
            className="absolute top-1/2 -translate-y-1/2 -right-4 md:right-0 bg-white text-[#2D5E2E] rounded-full shadow-md z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            asChild
            variant="outline"
            className="bg-white text-[#2D5E2E] hover:bg-[#F7F7F2] font-bold border-none transition duration-300"
          >
            <a href="#contact">Become a Success Story</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
