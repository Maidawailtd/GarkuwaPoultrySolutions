import { useEffect } from 'react';
import { useAuthStore, useProjectStore } from '@/lib/store';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { BriefcaseIcon, ClockIcon, DollarSignIcon, MessageSquareIcon } from 'lucide-react';
import { UserRole } from '@shared/schema';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user } = useAuthStore();
  const { projects, fetchProjects, isLoading } = useProjectStore();

  useEffect(() => {
    fetchProjects(4, 0);
  }, [fetchProjects]);

  const isClient = user?.role === UserRole.CLIENT;
  const isFreelancer = user?.role === UserRole.FREELANCER;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.fullName || 'User'}!
          </p>
        </div>
        {isClient && (
          <Link href="/create-project">
            <Button>
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              Post a Project
            </Button>
          </Link>
        )}
        {isFreelancer && (
          <Link href="/projects">
            <Button>
              <BriefcaseIcon className="mr-2 h-4 w-4" />
              Find Work
            </Button>
          </Link>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isClient ? 'Active Projects' : 'Active Contracts'}
            </CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              {isClient
                ? '+0 from last month'
                : '+0 active contracts'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isClient ? 'Ongoing Contracts' : 'Pending Proposals'}
            </CardTitle>
            <ClockIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              {isClient
                ? '+0 contracts in progress'
                : '+0 awaiting response'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {isClient ? 'Total Spent' : 'Total Earned'}
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              {isClient
                ? '+$0 from last month'
                : '+$0 pending payment'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquareIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              0 conversations
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          {isClient ? 'Your Projects' : 'Recent Projects'}
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <p>Loading projects...</p>
          ) : projects.length === 0 ? (
            <div className="col-span-full">
              <Card className="border-dashed">
                <CardContent className="flex flex-col items-center justify-center py-8">
                  <BriefcaseIcon className="h-10 w-10 text-muted-foreground mb-4" />
                  <CardDescription className="text-center">
                    {isClient
                      ? "You haven't posted any projects yet. Create your first project to hire freelancers."
                      : "No projects available. Check back later for new opportunities."}
                  </CardDescription>
                  {isClient && (
                    <Link href="/create-project">
                      <Button className="mt-4">Post a Project</Button>
                    </Link>
                  )}
                  {isFreelancer && (
                    <Link href="/projects">
                      <Button className="mt-4">Browse Projects</Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            projects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>
                    Posted {format(new Date(project.createdAt), 'MMM d, yyyy')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-2 text-sm">
                    {project.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm font-medium">
                      <span className="text-muted-foreground">Budget:</span> ${project.budget}
                    </div>
                    <Link href={`/projects/${project.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}