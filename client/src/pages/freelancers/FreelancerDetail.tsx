import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, MessageSquare, Star, Calendar, Briefcase } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

interface FreelancerDetailProps {
  id: number;
}

export default function PoultryDetail({ id }: { id: number }) {
  const [, navigate] = useLocation();

  const poultry = {
    id,
    name: "Golden Chicken",
    breed: "Rhode Island Red",
    location: "New York, USA",
    weight: "2.5 lbs",
    eggProduction: "250 eggs/year",
    memberSince: "Jan 2020",
    farmLocation: "Sunshine Farm",
    bio: "This breed is known for its excellent egg-laying abilities and resilient nature. It's a popular choice for both small farms and larger poultry operations.",
    skills: ["Egg Production", "Hardiness", "Feed Efficiency"]
  };

  return (
    <div className="container py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/freelancers')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Poultry
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={poultry.avatar} alt={poultry.name} />
                  <AvatarFallback className="text-lg">
                    {poultry.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{poultry.name}</h2>
                <p className="text-muted-foreground mt-1">{poultry.breed}</p>

                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">5</span>
                  <span className="text-muted-foreground ml-1">
                    (0 reviews)
                  </span>
                </div>

                <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{poultry.location}</span>
                </div>

                <div className="mt-4 font-medium">
                  N/A
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Learn More</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Characteristics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {poultry.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Member Since</p>
                  <p className="text-muted-foreground">{poultry.memberSince}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Briefcase className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Egg Production</p>
                  <p className="text-muted-foreground">{poultry.eggProduction}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About {poultry.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {poultry.bio}
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="portfolio">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portfolio">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="experience">Farm</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Breed Details</CardTitle>
                  <CardDescription>
                    More information about {poultry.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Weight: {poultry.weight}</p>
                  <p>Farm Location: {poultry.farmLocation}</p>

                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                  <CardDescription>
                    Feedback from previous clients
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>BC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Customer Review</p>
                            <p className="text-xs text-muted-foreground">March 2023</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        "Excellent egg layer!"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Farm Information</CardTitle>
                  <CardDescription>
                    Information about Sunshine Farm
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold">Sunshine Farm</h3>
                        <span className="text-sm text-muted-foreground">2020 - Present</span>
                      </div>
                      <p className="text-sm font-medium mb-1">Sunshine Farm</p>
                      <p className="text-sm text-muted-foreground">
                       Family run farm dedicated to sustainable poultry practices.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}