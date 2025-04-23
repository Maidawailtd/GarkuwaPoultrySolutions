import { useEffect } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EditIcon, MapPinIcon, BriefcaseIcon, StarIcon, MessageSquareIcon } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { UserRole } from '@shared/schema';

export default function Profile() {
  const { user } = useAuthStore();
  
  const isFreelancer = user?.role === UserRole.FREELANCER;
  const isClient = user?.role === UserRole.CLIENT;

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <Link href="/edit-profile">
          <Button>
            <EditIcon className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={user?.avatar || undefined} alt={user?.fullName} />
                  <AvatarFallback className="text-lg">{getInitials(user?.fullName)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-bold">{user?.fullName || 'Your Name'}</h2>
                <p className="text-muted-foreground mt-1">{user?.email || 'your.email@example.com'}</p>
                
                <Badge className="mt-3">
                  {isFreelancer ? 'Freelancer' : isClient ? 'Client' : 'User'}
                </Badge>
                
                {user?.location && (
                  <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
                    <MapPinIcon className="h-4 w-4 mr-1" />
                    <span>{user.location}</span>
                  </div>
                )}
                
                {isFreelancer && (
                  <div className="mt-4 font-medium">
                    ${user?.hourlyRate || '0'}/hr
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {isFreelancer && (
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user?.skills?.length ? (
                    user.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-sm">No skills added yet</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/edit-profile">
                  <Button variant="outline" size="sm" className="w-full">
                    <EditIcon className="mr-2 h-3 w-3" />
                    Update Skills
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Username</span>
                <p>{user?.username || 'username'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Account Type</span>
                <p>{isFreelancer ? 'Freelancer' : isClient ? 'Client' : 'User'}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Member Since</span>
                <p>{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Bio</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {user?.bio || 'No bio information added yet.'}
              </p>
            </CardContent>
            {!user?.bio && (
              <CardFooter>
                <Link href="/edit-profile">
                  <Button variant="outline" size="sm">
                    <EditIcon className="mr-2 h-3 w-3" />
                    Add Bio
                  </Button>
                </Link>
              </CardFooter>
            )}
          </Card>
          
          {isFreelancer && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Reviews</CardTitle>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="font-medium">0.0</span>
                  <span className="text-muted-foreground ml-1">(0 reviews)</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquareIcon className="h-10 w-10 text-muted-foreground mb-3" />
                  <CardDescription>
                    No reviews yet. Reviews will appear here once clients rate your work.
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          )}
          
          {isFreelancer ? (
            <Card>
              <CardHeader>
                <CardTitle>My Proposals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <BriefcaseIcon className="h-10 w-10 text-muted-foreground mb-3" />
                  <CardDescription>
                    You haven't submitted any proposals yet.
                  </CardDescription>
                  <Link href="/projects">
                    <Button className="mt-4">Browse Projects</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <BriefcaseIcon className="h-10 w-10 text-muted-foreground mb-3" />
                  <CardDescription>
                    You haven't posted any projects yet.
                  </CardDescription>
                  <Link href="/create-project">
                    <Button className="mt-4">Post a Project</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}