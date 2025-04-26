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
        Back to Freelancers
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
                  <AvatarFallback className="text-lg">
                    {freelancer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{freelancer.name}</h2>
                <p className="text-muted-foreground mt-1">{freelancer.title}</p>
                
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">{freelancer.rating}</span>
                  <span className="text-muted-foreground ml-1">
                    ({freelancer.reviewCount} reviews)
                  </span>
                </div>
                
                <div className="flex items-center justify-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{freelancer.location}</span>
                </div>
                
                <div className="mt-4 font-medium">
                  ${freelancer.hourlyRate}/hr
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Contact</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {freelancer.skills.map((skill, index) => (
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
                  <p className="text-muted-foreground">{freelancer.memberSince}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Briefcase className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Completed Projects</p>
                  <p className="text-muted-foreground">{freelancer.completedProjects}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {freelancer.bio}
              </p>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="portfolio">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
            </TabsList>
            
            <TabsContent value="portfolio" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio</CardTitle>
                  <CardDescription>
                    Recent projects and work samples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Briefcase className="h-12 w-12 text-muted-foreground mb-3" />
                    <CardDescription>
                      This freelancer hasn't added any portfolio items yet.
                    </CardDescription>
                  </div>
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
                            <p className="font-medium">Business Client</p>
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
                        "John delivered exceptional work on our web application. He was professional, responsive, and delivered ahead of schedule. Highly recommended!"
                      </p>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback>TC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">Tech Company</p>
                            <p className="text-xs text-muted-foreground">January 2023</p>
                          </div>
                        </div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">
                        "Great communication and technical skills. John helped us optimize our application performance and implement new features. Will hire again!"
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>
                    Professional history and experience
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold">Senior Developer</h3>
                        <span className="text-sm text-muted-foreground">2020 - Present</span>
                      </div>
                      <p className="text-sm font-medium mb-1">Tech Solutions Inc.</p>
                      <p className="text-sm text-muted-foreground">
                        Led development of web applications using React and Node.js. Worked with clients to gather requirements and deliver solutions on time and within budget.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold">Web Developer</h3>
                        <span className="text-sm text-muted-foreground">2018 - 2020</span>
                      </div>
                      <p className="text-sm font-medium mb-1">Digital Agency</p>
                      <p className="text-sm text-muted-foreground">
                        Developed responsive websites and web applications for various clients. Utilized modern JavaScript frameworks and collaborated with design teams.
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