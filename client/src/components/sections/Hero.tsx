import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section id="home" className="relative bg-[#224722] text-white">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Poultry farm view" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10 flex flex-col items-center">
        <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl text-center mb-6">
          Welcome to Garkuwa Livestock Farm
        </h1>
        <p className="text-lg md:text-xl text-center max-w-3xl mb-8">
          Your premier destination for comprehensive livestock training and animal husbandry solutions in Dangi Kanam, Plateau State, Nigeria
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button 
            asChild
            size="lg" 
            className="bg-[#F2BB05] hover:bg-[#FFD237] text-neutral-800 font-bold transition duration-300"
          >
            <a href="#programs">Our Training Programs</a>
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline" 
            className="bg-white hover:bg-gray-100 text-[#2D5E2E] font-bold border-none transition duration-300"
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
