import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import HomeHeader from '@/components/HomeHeader';

export default function Home() {
  return (
    <div className="bg-[#FEF9E9]">
      {/* Custom Header for Home page */}
      <HomeHeader />
      
      {/* Hero Section */}
      <div className="relative h-[400px] bg-cover bg-center" style={{ backgroundImage: 'url("/assets/theme-poultry-farm-1.jpg")' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <div className="max-w-lg">
              <h1 className="text-4xl sm:text-5xl font-bold text-[#5D4037] mb-2">
                Welcome to <br />Garkuwa Poultry Farm
              </h1>
              <p className="text-xl text-[#5D4037] font-medium">
                Your trusted source for quality poultry products.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* About Us and Services Section */}
      <section className="py-10">
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
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2 text-[#5D4037]">🥚</span>
                  <span className="text-lg text-[#5D4037]">Egg Production</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-[#5D4037]">🐔</span>
                  <span className="text-lg text-[#5D4037]">Chicken Broiler Sales</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-[#5D4037]">📋</span>
                  <span className="text-lg text-[#5D4037]">Consulting for Poultry Farming</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-10 bg-[#FEF9E9]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#5D4037] mb-6">Gallery</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {/* Use placeholder images that match the style in the reference */}
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1548550019-43f6166e8713?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Chickens at Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1563775207-7d858cba1e20?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Ducks at Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1573399054516-90665ecc7ed7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Turkeys at Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1569127959161-2b1297b2d9a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Fresh eggs from Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1586350977771-b3dd0b48d8a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&h=400&q=80" 
                alt="Baby chicks at Garkuwa Farm" 
                className="h-40 w-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <img 
                src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s+F00(7.4,9.1)/7.4,9.1,12,0/500x400?access_token=pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2s4YnE4anUzMDBlNzNscWxkajhvcnhnaSJ9.yP18-IjxjANuaGQVBXOxMQ" 
                alt="Garkuwa Farm location" 
                className="h-40 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-10 bg-[#FEF9E9]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="mr-2 text-green-600 text-xl">📱</span>
                  <span className="text-[#5D4037]">Wabsapp: 05033847755</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-xl">📞</span>
                  <span className="text-[#5D4037]">05033847755</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-xl">✉️</span>
                  <span className="text-[#5D4037]">abdurazzakmusa47@gmail.com</span>
                </li>
              </ul>

              <div className="mt-6">
                <Button className="bg-[#FFCC45] hover:bg-[#FFA000] text-[#5D4037] font-medium px-8">
                  Send
                </Button>
              </div>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-[#5D4037] mb-4">Our Location</h2>
              <form className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFCC45]"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFCC45]"
                  />
                </div>
                <div>
                  <textarea 
                    placeholder="Your Message" 
                    rows={4}
                    className="w-full p-2 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#FFCC45]"
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