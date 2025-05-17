import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function About() {
  const features = [
    "Experienced Trainers",
    "Modern Techniques",
    "Hands-on Learning",
    "Ongoing Support"
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <img 
              src="https://images.unsplash.com/photo-1560844742-9d637cb9a8f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Garkuwa Farm Overview" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="font-bold text-3xl md:text-4xl text-[#2D5E2E] mb-6">
              About Garkuwa Livestock Farm
            </h2>
            <p className="text-lg mb-4">
              Founded in 2010, Garkuwa Livestock Farm has grown from a small family business to one of the leading livestock training centers in Nigeria, located in Dangi Kanam, Plateau State.
            </p>
            <p className="text-lg mb-4">
              Our mission is to empower farmers with the knowledge and skills needed to build sustainable and profitable livestock operations through hands-on training and ongoing support.
            </p>
            <p className="text-lg mb-6">
              With extensive farmland and modern facilities, we provide comprehensive training programs tailored to different livestock categories including poultry, cattle, rabbits, fish farming, and more.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="h-5 w-5 mr-2 text-[#2D5E2E]">
                    <Check className="h-5 w-5" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <Button 
              asChild
              className="bg-[#2D5E2E] hover:bg-[#3A7A3B] text-white font-bold transition duration-300"
            >
              <a href="#contact">Learn More About Us</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
