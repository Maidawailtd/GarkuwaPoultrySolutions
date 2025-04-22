import { useState } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <span className="text-[#2D5E2E] font-bold text-2xl sm:text-3xl">Garkuwa</span>
            <span className="ml-2 text-[#D9A604] font-bold text-2xl sm:text-3xl">Farm</span>
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-neutral-800 focus:outline-none"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? 
            <X className="h-6 w-6" /> : 
            <Menu className="h-6 w-6" />
          }
        </button>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#home" className="text-[#2D5E2E] hover:text-[#3A7A3B] font-medium transition duration-300">Home</a>
          <a href="#programs" className="text-neutral-800 hover:text-[#3A7A3B] font-medium transition duration-300">Training Programs</a>
          <a href="#livestock" className="text-neutral-800 hover:text-[#3A7A3B] font-medium transition duration-300">Our Livestock</a>
          <a href="#about" className="text-neutral-800 hover:text-[#3A7A3B] font-medium transition duration-300">About Us</a>
          <a href="#testimonials" className="text-neutral-800 hover:text-[#3A7A3B] font-medium transition duration-300">Testimonials</a>
          <Button 
            asChild
            className="bg-[#2D5E2E] hover:bg-[#3A7A3B] text-white font-medium transition duration-300"
          >
            <a href="#contact">Contact Us</a>
          </Button>
        </div>
      </nav>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-2">
            <a 
              href="#home" 
              className="text-neutral-800 hover:text-[#3A7A3B] font-medium py-2 transition duration-300"
              onClick={closeMobileMenu}
            >
              Home
            </a>
            <a 
              href="#programs" 
              className="text-neutral-800 hover:text-[#3A7A3B] font-medium py-2 transition duration-300"
              onClick={closeMobileMenu}
            >
              Training Programs
            </a>
            <a 
              href="#livestock" 
              className="text-neutral-800 hover:text-[#3A7A3B] font-medium py-2 transition duration-300"
              onClick={closeMobileMenu}
            >
              Our Livestock
            </a>
            <a 
              href="#about" 
              className="text-neutral-800 hover:text-[#3A7A3B] font-medium py-2 transition duration-300"
              onClick={closeMobileMenu}
            >
              About Us
            </a>
            <a 
              href="#testimonials" 
              className="text-neutral-800 hover:text-[#3A7A3B] font-medium py-2 transition duration-300"
              onClick={closeMobileMenu}
            >
              Testimonials
            </a>
            <Button 
              asChild
              className="bg-[#2D5E2E] hover:bg-[#3A7A3B] text-white font-medium transition duration-300 inline-block"
              onClick={closeMobileMenu}
            >
              <a href="#contact">Contact Us</a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
