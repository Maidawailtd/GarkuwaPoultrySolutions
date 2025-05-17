import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, Briefcase, Calendar, DollarSign, Clock, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { UserRole } from '@shared/schema';
import { format } from 'date-fns';

export default function Contracts() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('active');
  
  const isFreelancer = user?.role === UserRole.FREELANCER;
  const isClient = user?.role === UserRole.CLIENT;

  // Placeholder data for demonstration
  const contracts = [
    {
      id: 1,
      projectTitle: 'Website Redesign',
      clientName: 'Acme Inc.',
      freelancerName: 'John Doe',
      status: 'active',
      startDate: new Date(2023, 2, 15),
      endDate: new Date(2023, 5, 15),
      amount: 2500,
      nextMilestone: 'Delivery of homepage design',
      nextPayment: 500,
      nextPaymentDue: new Date(2023, 3, 1),
    },
    {
      id: 2,
      projectTitle: 'Mobile App Development',
      clientName: 'TechCorp',
      freelancerName: 'Jane Smith',
      status: 'completed',
      startDate: new Date(2023, 0, 10),
      endDate: new Date(2023, 2, 10),
      amount: 5000,
      nextMilestone: null,
      nextPayment: null,
      nextPaymentDue: null,
    },
    {
      id: 3,
      projectTitle: 'Brand Identity Design',
      clientName: 'StartupX',
      freelancerName: 'Mike Johnson',
      status: 'active',
      startDate: new Date(2023, 3, 20),
      endDate: new Date(2023, 5, 20),
      amount: 1800,
      nextMilestone: 'Final logo delivery',
      nextPayment: 600,
      nextPaymentDue: new Date(2023, 4, 15),
    },
  ];

  const filteredContracts = contracts.filter(
    (contract) => activeTab === 'all' || contract.status === activeTab
  );

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Contracts</h1>
          <p className="text-muted-foreground">
            {isClient
              ? 'Manage contracts with freelancers'
              : 'View and manage your project contracts'}
          </p>
        </div>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          {filteredContracts.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <CardTitle className="text-xl mb-2">No Contracts Found</CardTitle>
                <CardDescription className="text-center mb-6">
                  {activeTab === 'active'
                    ? "You don't have any active contracts at the moment."
                    : activeTab === 'completed'
                    ? "You don't have any completed contracts yet."
                    : "You haven't entered into any contracts yet."}
                </CardDescription>
                {isClient && (
                  <Link href="/projects">
                    <Button>Post a Project</Button>
                  </Link>
                )}
                {isFreelancer && (
                  <Link href="/projects">
                    <Button>Find Projects</Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredContracts.map((contract) => (
                <Card key={contract.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{contract.projectTitle}</CardTitle>
                          <Badge
                            variant={contract.status === 'active' ? 'default' : 'secondary'}
                          >
                            {contract.status === 'active' ? 'Active' : 'Completed'}
                          </Badge>
                        </div>
                        <CardDescription>
                          {isClient
                            ? `Freelancer: ${contract.freelancerName}`
                            : `Client: ${contract.clientName}`}
                        </CardDescription>
                      </div>
                      <div className="text-xl font-bold">${contract.amount}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">Start Date</p>
                          <p className="text-sm text-muted-foreground">
                            {format(contract.startDate, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">End Date</p>
                          <p className="text-sm text-muted-foreground">
                            {format(contract.endDate, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                      {contract.status === 'active' && contract.nextMilestone && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Next Milestone</p>
                            <p className="text-sm text-muted-foreground">
                              {contract.nextMilestone}
                            </p>
                          </div>
                        </div>
                      )}
                      {contract.status === 'active' && contract.nextPayment && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Next Payment</p>
                            <p className="text-sm text-muted-foreground">
                              ${contract.nextPayment} due{' '}
                              {format(contract.nextPaymentDue!, 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                    <Link href={`/contracts/${contract.id}`} className="w-full mt-4 block">
                      <Button variant="outline" className="w-full mt-4">
                        View Contract Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}