import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, Briefcase } from 'lucide-react';

export default function Freelancers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [freelancers, setFreelancers] = useState([]);

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Find Poultry</h1>
          <p className="text-muted-foreground">
            Discover top breeds for your farm
          </p>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search freelancers by skill or name..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Freelancer Listing - Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">John Doe</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  New York, USA
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="font-medium">4.9</span>
              <span className="text-muted-foreground ml-1">(25 reviews)</span>
            </div>
            <h3 className="font-medium mb-1">Full Stack Developer</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              Experienced developer with 5+ years of experience in React, Node.js and MongoDB.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="secondary" className="text-xs">React</Badge>
              <Badge variant="secondary" className="text-xs">Node.js</Badge>
              <Badge variant="secondary" className="text-xs">MongoDB</Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="w-full flex justify-between items-center">
              <div className="font-medium">$45/hr</div>
              <Button size="sm" variant="outline">View Profile</Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Amanda Smith</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  London, UK
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="font-medium">4.8</span>
              <span className="text-muted-foreground ml-1">(18 reviews)</span>
            </div>
            <h3 className="font-medium mb-1">UI/UX Designer</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              Creative designer with a passion for creating intuitive, user-centered digital experiences.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="secondary" className="text-xs">Figma</Badge>
              <Badge variant="secondary" className="text-xs">Adobe XD</Badge>
              <Badge variant="secondary" className="text-xs">Sketch</Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="w-full flex justify-between items-center">
              <div className="font-medium">$50/hr</div>
              <Button size="sm" variant="outline">View Profile</Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">Michael Johnson</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  Berlin, Germany
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="font-medium">4.7</span>
              <span className="text-muted-foreground ml-1">(12 reviews)</span>
            </div>
            <h3 className="font-medium mb-1">Digital Marketing Specialist</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              Experienced in SEO, content marketing, and social media campaigns to drive business growth.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <Badge variant="secondary" className="text-xs">SEO</Badge>
              <Badge variant="secondary" className="text-xs">Google Ads</Badge>
              <Badge variant="secondary" className="text-xs">Analytics</Badge>
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="w-full flex justify-between items-center">
              <div className="font-medium">$40/hr</div>
              <Button size="sm" variant="outline">View Profile</Button>
            </div>
          </CardFooter>
        </Card>

        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl mb-2 text-center">More Freelancers Coming Soon</CardTitle>
            <CardDescription className="text-center mb-6">
              We're still working on this feature. Check back soon for a full list of available freelancers.
            </CardDescription>
            <Link href="/projects">
              <Button>
                Browse Projects Instead
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}