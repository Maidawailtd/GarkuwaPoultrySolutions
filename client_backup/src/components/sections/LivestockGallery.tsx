import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { galleryItems } from "@/data";

export default function LivestockGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filters = [
    { id: "all", label: "All Categories" },
    { id: "poultry", label: "Poultry" },
    { id: "cattle", label: "Cattle" },
    { id: "sheep-goats", label: "Sheep & Goats" },
    { id: "pigs", label: "Pigs" },
    { id: "rabbits", label: "Rabbits" },
    { id: "fish", label: "Fish" }
  ];

  const filteredItems = activeFilter === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section id="livestock" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-[#2D5E2E] mb-4">
            Our Livestock Gallery
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Explore our diverse collection of livestock breeds that we use for training and production
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={
                  activeFilter === filter.id 
                    ? "bg-[#2D5E2E] text-white" 
                    : "bg-gray-200 hover:bg-[#2D5E2E] hover:text-white text-neutral-800 border-none"
                }
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => (
            <Card
              key={index}
              className="transition duration-300 hover:shadow-lg overflow-hidden"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-3 bg-white">
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
