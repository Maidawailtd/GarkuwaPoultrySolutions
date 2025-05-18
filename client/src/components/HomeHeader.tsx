import { Link } from 'wouter';

export default function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 bg-[#FFCC45] py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img 
              src="/assets/logo.png" 
              alt="Garkuwa Poultry Farm Logo" 
              className="h-12 w-auto mr-3"
            />
            <div>
              <span className="text-[#5D4037] font-bold text-2xl tracking-tight">GARKUWA</span>
              <div className="text-[#5D4037] text-sm font-medium tracking-widest">POULTRY FARM</div>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link href="/" className="text-[#5D4037] hover:text-[#3E2723] font-medium transition duration-300">
              Home
            </Link>
            <Link href="/about" className="text-[#5D4037] hover:text-[#3E2723] font-medium transition duration-300">
              About Us
            </Link>
            <Link href="/services" className="text-[#5D4037] hover:text-[#3E2723] font-medium transition duration-300">
              Services
            </Link>
            <Link href="/gallery" className="text-[#5D4037] hover:text-[#3E2723] font-medium transition duration-300">
              Gallery
            </Link>
            <Link href="/contact" className="text-[#5D4037] hover:text-[#3E2723] font-medium transition duration-300">
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}