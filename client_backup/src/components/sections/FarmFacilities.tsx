import { Card, CardContent } from "@/components/ui/card";
import { facilities } from "@/data";

export default function FarmFacilities() {
  return (
    <section className="py-16 bg-[#F7F7F2]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-[#2D5E2E] mb-4">
            Our Farm Facilities
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            State-of-the-art training facilities equipped with modern farming technology
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((facility, index) => (
            <Card key={index} className="overflow-hidden shadow-md">
              <div className="h-48 overflow-hidden">
                <img 
                  src={facility.image}
                  alt={facility.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl text-[#2D5E2E] mb-2">{facility.title}</h3>
                <p className="text-gray-600">{facility.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
