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
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  File,
  FileText,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { UserRole } from '@shared/schema';
import { format } from 'date-fns';

interface ContractDetailProps {
  id: number;
}

export default function ContractDetail({ id }: ContractDetailProps) {
  const [, navigate] = useLocation();
  const { user } = useAuthStore();
  
  const isFreelancer = user?.role === UserRole.FREELANCER;
  const isClient = user?.role === UserRole.CLIENT;

  // Placeholder data for demonstration
  const contract = {
    id,
    projectTitle: 'Website Redesign',
    clientName: 'Acme Inc.',
    clientId: 101,
    freelancerName: 'John Doe',
    freelancerId: 202,
    status: 'active',
    startDate: new Date(2023, 2, 15),
    endDate: new Date(2023, 5, 15),
    amount: 2500,
    termsAgreed: true,
    description: 'Complete redesign of corporate website including homepage, about us, services, blog, and contact pages. The design should be modern, responsive, and aligned with the brand guidelines.',
    milestones: [
      {
        id: 1,
        title: 'Initial Design Concepts',
        amount: 500,
        status: 'completed',
        dueDate: new Date(2023, 2, 25),
        completedDate: new Date(2023, 2, 24),
        description: 'Create and present 3 different design concepts for the homepage and inner pages.',
      },
      {
        id: 2,
        title: 'Finalize Design and Begin Development',
        amount: 1000,
        status: 'in_progress',
        dueDate: new Date(2023, 3, 20),
        completedDate: null,
        description: 'Based on feedback, finalize the design and begin development of the website structure and core pages.',
      },
      {
        id: 3,
        title: 'Complete Development and Testing',
        amount: 1000,
        status: 'pending',
        dueDate: new Date(2023, 5, 10),
        completedDate: null,
        description: 'Complete all development work, implement content, and perform testing (functional, responsive, browser compatibility).',
      },
    ],
    payments: [
      {
        id: 1,
        amount: 500,
        status: 'paid',
        date: new Date(2023, 2, 26),
        milestoneId: 1,
      },
    ],
  };
  
  const otherParty = isClient ? contract.freelancerName : contract.clientName;
  const otherPartyId = isClient ? contract.freelancerId : contract.clientId;
  
  const completedMilestones = contract.milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = contract.milestones.length;
  const progress = (completedMilestones / totalMilestones) * 100;
  
  const totalPaid = contract.payments.reduce((sum, payment) => sum + payment.amount, 0);
  const remainingAmount = contract.amount - totalPaid;

  return (
    <div className="container py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/contracts')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Contracts
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{contract.projectTitle}</h1>
          <p className="text-muted-foreground">
            Contract with {otherParty}
          </p>
        </div>
        <Badge
          variant={contract.status === 'active' ? 'default' : 'secondary'}
          className="text-sm px-3 py-1"
        >
          {contract.status === 'active' ? 'Active' : 'Completed'}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                <p className="text-muted-foreground">
                  {contract.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Milestones & Payments</h3>
                <div className="space-y-6">
                  {contract.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="bg-muted/50 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                        <div className="flex gap-2 items-center">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {index + 1}
                          </div>
                          <h4 className="font-medium">{milestone.title}</h4>
                        </div>
                        <Badge
                          variant={
                            milestone.status === 'completed' ? 'default' :
                            milestone.status === 'in_progress' ? 'secondary' :
                            'outline'
                          }
                        >
                          {milestone.status === 'completed' ? 'Completed' :
                           milestone.status === 'in_progress' ? 'In Progress' :
                           'Pending'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {milestone.description}
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Amount</p>
                            <p className="text-sm text-muted-foreground">${milestone.amount}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">Due Date</p>
                            <p className="text-sm text-muted-foreground">
                              {format(milestone.dueDate, 'MMM d, yyyy')}
                            </p>
                          </div>
                        </div>
                        {milestone.completedDate && (
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium">Completed</p>
                              <p className="text-sm text-muted-foreground">
                                {format(milestone.completedDate, 'MMM d, yyyy')}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {isClient && milestone.status === 'in_progress' && (
                        <div className="mt-4">
                          <Button variant="default" size="sm">
                            Mark as Completed
                          </Button>
                        </div>
                      )}
                      
                      {isFreelancer && milestone.status === 'completed' && !contract.payments.some(p => p.milestoneId === milestone.id) && (
                        <div className="mt-4 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                          <p className="text-sm text-amber-600">Payment pending</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>
                Communicate with {otherParty} about this contract
              </CardDescription>
            </CardHeader>
            <CardContent className="py-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/messages')}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Open Conversation
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Files & Documents</CardTitle>
              <CardDescription>
                Contract documents and project files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg mb-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Contract Agreement.pdf</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded on {format(contract.startDate, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Project Requirements.docx</p>
                    <p className="text-xs text-muted-foreground">
                      Uploaded on {format(contract.startDate, 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Start Date</p>
                  <p className="text-muted-foreground">
                    {format(contract.startDate, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">End Date</p>
                  <p className="text-muted-foreground">
                    {format(contract.endDate, 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <DollarSign className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Total Amount</p>
                  <p className="text-muted-foreground">${contract.amount}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">Status</p>
                  <p className="text-muted-foreground capitalize">
                    {contract.status}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Milestones Completed</span>
                  <span>{completedMilestones} of {totalMilestones}</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <Separator />
              
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Payment Status</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Paid</span>
                    <span className="font-medium">${totalPaid}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Remaining</span>
                    <span className="font-medium">${remainingAmount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>{isClient ? 'Freelancer' : 'Client'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback>
                    {otherParty.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{otherParty}</p>
                  <p className="text-sm text-muted-foreground">
                    {isClient ? 'Freelancer' : 'Client'}
                  </p>
                </div>
              </div>
              
              <div className="pt-2 space-y-2">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
                
                <Button variant="outline" className="w-full" onClick={() => navigate(`/freelancers/${otherPartyId}`)}>
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}