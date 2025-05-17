import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/data";

export default function LivestockCategories() {
  return (
    <section className="py-16 bg-[#F7F7F2]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-[#2D5E2E] mb-4">
            Our Livestock Categories
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Discover our diverse range of livestock with specialized training programs for each category
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index}
              className="overflow-hidden shadow-md transition duration-300 hover:shadow-lg"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={`${category.title} category`} 
                  className="w-full h-full object-cover transition duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-[#2D5E2E] mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <a 
                  href="#programs" 
                  className="text-[#D9A604] hover:text-[#F2BB05] font-bold flex items-center"
                >
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
