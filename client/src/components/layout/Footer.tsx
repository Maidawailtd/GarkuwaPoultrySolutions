import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="bg-[#224722] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-xl mb-4">Garkuwa Livestock Farm</h3>
            <p className="mb-4">Your premier destination for comprehensive livestock training and animal husbandry solutions in Dangi Kanam, Plateau State.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/garkuwafarm" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2BB05] transition duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com/garkuwafarm" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2BB05] transition duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com/garkuwafarm" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2BB05] transition duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://youtube.com/channel/garkuwafarm" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2BB05] transition duration-300">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="https://wa.me/8033847675" target="_blank" rel="noopener noreferrer" className="hover:text-[#F2BB05] transition duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-[#F2BB05] transition duration-300">Home</a></li>
              <li><a href="#about" className="hover:text-[#F2BB05] transition duration-300">About Us</a></li>
              <li><a href="#programs" className="hover:text-[#F2BB05] transition duration-300">Training Programs</a></li>
              <li><a href="#livestock" className="hover:text-[#F2BB05] transition duration-300">Our Livestock</a></li>
              <li><a href="#testimonials" className="hover:text-[#F2BB05] transition duration-300">Success Stories</a></li>
              <li><a href="#contact" className="hover:text-[#F2BB05] transition duration-300">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Our Programs</h3>
            <ul className="space-y-2">
              <li><a href="#programs" className="hover:text-[#F2BB05] transition duration-300">Poultry Management</a></li>
              <li><a href="#programs" className="hover:text-[#F2BB05] transition duration-300">Cattle Rearing</a></li>
              <li><a href="#programs" className="hover:text-[#F2BB05] transition duration-300">Small Ruminants</a></li>
              <li><a href="#programs" className="hover:text-[#F2BB05] transition duration-300">Pig Farming</a></li>
              <li><a href="#programs" className="hover:text-[#F2BB05] transition duration-300">Rabbit Production</a></li>
              <li><a href="#programs" className="hover:text-[#F2BB05] transition duration-300">Fish Farming</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-xl mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Dangi Kanam, Plateau State, Nigeria Ltd</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+8033847675</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>abdulrrazzakmusa47@gmail.com</span>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mon-Sat: 8:00 AM - 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="mt-8 mb-8 bg-gray-700" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Garkuwa Livestock Farm. All Rights Reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="hover:text-[#F2BB05] transition duration-300 mr-4">Privacy Policy</a>
            <a href="#" className="hover:text-[#F2BB05] transition duration-300 mr-4">Terms of Service</a>
            <a href="#" className="hover:text-[#F2BB05] transition duration-300">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
