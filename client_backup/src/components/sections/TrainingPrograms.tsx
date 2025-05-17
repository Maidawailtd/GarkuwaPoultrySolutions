import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { programs } from "@/data";

export default function TrainingPrograms() {
  return (
    <section id="programs" className="py-16 bg-[#F7F7F2]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-[#2D5E2E] mb-4">
            Our Training Programs
          </h2>
          <p className="text-lg max-w-3xl mx-auto">
            Comprehensive training solutions designed to equip you with the knowledge and skills for successful livestock farming
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <Card key={index} className="overflow-hidden shadow-md transition duration-300 hover:shadow-lg">
              <CardHeader className="bg-[#2D5E2E] p-4">
                <h3 className="font-bold text-xl text-white">{program.title}</h3>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="text-[#D9A604] mr-2 h-5 w-5" />
                  <span>Duration: {program.duration}</span>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">What You'll Learn:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {program.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <span className="text-[#2D5E2E] font-bold text-xl">{program.price}</span>
                  <Button 
                    asChild
                    className="bg-[#F2BB05] hover:bg-[#FFD237] text-neutral-800 font-bold transition duration-300"
                  >
                    <a href="#contact">Register Now</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            asChild
            className="bg-[#2D5E2E] hover:bg-[#3A7A3B] text-white font-bold px-6 py-3 transition duration-300"
          >
            <a href="#contact">View All Training Programs</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
