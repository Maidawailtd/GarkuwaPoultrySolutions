import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="bg-[#FEF9E9]">
      {/* Header matching the reference image */}
      <header className="bg-[#FFCC45] py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <img 
                src="/assets/logo.png" 
                alt="Garkuwa Poultry Farm Logo" 
                className="h-14 w-auto"
              />
              <div className="flex flex-col">
                <span className="text-[#5D4037] font-bold text-2xl tracking-tight">GARKUWA</span>
                <span className="text-[#5D4037] text-sm font-medium tracking-wide">POULTRY FARM</span>
              </div>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-[#5D4037] hover:text-[#3E2723] font-medium">Home</Link>
              <Link href="/about" className="text-[#5D4037] hover:text-[#3E2723] font-medium">About Us</Link>
              <Link href="/services" className="text-[#5D4037] hover:text-[#3E2723] font-medium">Services</Link>
              <Link href="/gallery" className="text-[#5D4037] hover:text-[#3E2723] font-medium">Gallery</Link>
              <Link href="/contact" className="text-[#5D4037] hover:text-[#3E2723] font-medium">Contact</Link>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Hero Section using the image directly */}
      <div className="relative bg-cover bg-center" style={{ backgroundImage: 'url("/assets/theme-poultry-farm-1.jpg")' }}>
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold text-[#5D4037] mb-2">
              Welcome to<br />
              Garkuwa Poultry Farm
            </h1>
            <p className="text-xl text-[#5D4037]">
              Your trusted source for quality poultry products.
            </p>
          </div>
        </div>
      </div>
      
      {/* About Us Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-[#5D4037] mb-4">About Us</h2>
              <p className="text-lg text-[#5D4037]">
                Garkuwa Poultry Farm has been serving the community with fresh, top-quality poultry for over 25 years.
              </p>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-[#5D4037] mb-4">Our Services</h2>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">🥚</span>
                  <span className="text-lg">Egg Production</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🐔</span>
                  <span className="text-lg">Chicken Broiler Sales</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📋</span>
                  <span className="text-lg">Consulting for Poultry Farming</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#5D4037] mb-6">Gallery</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1548550019-43f6166e8713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Chickens at Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1563775207-7d858cba1e20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Ducks at Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573399054516-90665ecc7ed7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Turkeys at Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1569127959161-2b1297b2d9a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Fresh eggs from Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1586350977771-b3dd0b48d8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Baby chicks at Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div>
              <img 
                src="https://maps.googleapis.com/maps/api/staticmap?center=9.1,7.4&zoom=12&size=500x400&markers=color:red%7C9.1,7.4&key=YOUR_API_KEY" 
                alt="Garkuwa Farm location" 
                className="h-40 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center mb-3">
                <span className="inline-block bg-green-600 rounded-full p-1 mr-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.6 6.31999C16.8 5.54999 15.8 4.94999 14.7 4.57999C13.6 4.19999 12.5 4.09999 11.3 4.19999C10.1 4.29999 9.00001 4.69999 8.00001 5.19999C7.00001 5.69999 6.20001 6.39999 5.50001 7.19999C4.10001 8.99999 3.40001 11.2 3.50001 13.5C3.50001 13.8 3.60001 14.1 3.60001 14.3L3.70001 14.6C3.70001 14.7 3.70001 14.8 3.80001 14.9C3.80001 15 3.90001 15 3.90001 15.1C4.00001 15.3 4.10001 15.6 4.20001 15.8C4.30001 16 4.40001 16.2 4.60001 16.3C4.80001 16.5 4.90001 16.7 5.10001 16.8C5.30001 17 5.60001 17 5.80001 17C6.00001 17 6.30001 16.9 6.40001 16.8C6.80001 16.6 7.10001 16.2 7.20001 15.8C7.30001 15.4 7.30001 15 7.10001 14.7C7.00001 14.5 6.80001 14.3 6.60001 14.1C6.40001 13.9 6.10001 13.8 5.80001 13.8C5.70001 13.8 5.60001 13.8 5.50001 13.8C5.40001 13.8 5.30001 13.9 5.20001 13.9C5.20001 12.4 5.70001 10.9 6.80001 9.79999C7.30001 9.19999 8.00001 8.79999 8.70001 8.49999C9.40001 8.19999 10.2 7.99999 11 7.99999C11.8 7.89999 12.7 7.99999 13.5 8.19999C14.3 8.39999 15.1 8.79999 15.8 9.19999C17.1 10.1 18.1 11.5 18.5 13C18.9 14.5 18.7 16.2 18 17.6C17.3 19 16.1 20.1 14.7 20.7C13.3 21.3 11.7 21.3 10.3 20.9C9.90001 20.8 9.40001 20.6 9.00001 20.3C8.60001 20 8.20001 19.7 7.80001 19.3C7.40001 18.9 7.10001 18.4 6.80001 17.9C6.50001 17.4 6.30001 16.9 6.10001 16.3C6.00001 16 5.80001 15.6 5.50001 15.4C5.20001 15.2 4.80001 15.2 4.50001 15.3C4.20001 15.4 3.90001 15.7 3.80001 16C3.70001 16.3 3.70001 16.7 3.80001 17C3.90001 17.5 4.10001 18 4.30001 18.5C4.50001 19 4.80001 19.5 5.10001 19.9C5.40001 20.3 5.80001 20.7 6.20001 21.1C6.60001 21.5 7.10001 21.8 7.60001 22.1C8.80001 22.9 10.2 23.3 11.6 23.4C12.9 23.5 14.3 23.3 15.6 22.8C16.9 22.3 18.1 21.5 19 20.4C19.9 19.3 20.6 18 21 16.6C21.4 15.2 21.4 13.7 21.2 12.3C21 10.9 20.4 9.49999 19.5 8.39999C19.1 7.99999 18.7 7.59999 18.2 7.19999C18 7.09999 17.8 6.99999 17.6 6.89999V6.31999Z" fill="white"/>
                  </svg>
                </span>
                <span>Wabsapp: 05033847755</span>
              </div>
              
              <div className="flex items-center mb-3">
                <span className="mr-2">📞</span>
                <span>05033847755</span>
              </div>
              
              <div className="flex items-center mb-6">
                <span className="mr-2">✉️</span>
                <span>abdurazzakmusa47@gmail.com</span>
              </div>

              <Button className="bg-[#FFCC45] hover:bg-[#FFA000] font-medium px-8 py-2 text-[#5D4037] rounded">
                Send
              </Button>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-[#5D4037] mb-4">Our Location</h2>
              <form className="space-y-3">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-2 border border-gray-300"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-2 border border-gray-300"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={3}
                    className="w-full p-2 border border-gray-300"
                  ></textarea>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}