import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import {
  Calendar,
  Briefcase,
  DollarSign,
  User,
  Clock,
  Tag,
  ArrowLeft,
  Send
} from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { apiRequest } from '@/lib/queryClient';
import { useAuthStore, useCategoryStore } from '@/lib/store';
import { UserRole } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';

interface ProjectDetailProps {
  id: number;
}

export default function ProjectDetail({ id }: ProjectDetailProps) {
  const [, navigate] = useLocation();
  const { isAuthenticated, user } = useAuthStore();
  const { categories } = useCategoryStore();
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isFreelancer = user?.role === UserRole.FREELANCER;
  const isClient = user?.role === UserRole.CLIENT;

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['/api/projects', id],
    queryFn: () => apiRequest(`/api/projects/${id}`),
  });

  const category = categories.find(c => c.id === project?.project?.categoryId);

  const handleSubmitProposal = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to submit a proposal.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (!isFreelancer) {
      toast({
        title: "Action not allowed",
        description: "Only freelancers can submit proposals.",
        variant: "destructive"
      });
      return;
    }
    
    if (!bidAmount || !coverLetter) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    const amount = parseFloat(bidAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid bid amount",
        description: "Please enter a valid bid amount.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit proposal
      const response = await apiRequest(`/api/projects/${id}/proposals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`
        },
        body: JSON.stringify({
          bidAmount: amount,
          coverLetter,
          estimatedDuration: 0 // Default value, we can add this field to the form later
        })
      });
      
      if (response.success) {
        toast({
          title: "Proposal submitted",
          description: "Your proposal has been successfully submitted.",
        });
        setBidAmount('');
        setCoverLetter('');
      } else {
        toast({
          title: "Submission failed",
          description: response.message || "There was an error submitting your proposal.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your proposal.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container py-8">
        <div className="w-full h-64 animate-pulse bg-muted rounded-lg"></div>
      </div>
    );
  }
  
  if (error || !project?.project) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle className="text-xl mb-2">Project Not Found</CardTitle>
            <CardDescription className="text-center mb-6">
              The project you're looking for doesn't exist or has been removed.
            </CardDescription>
            <Button onClick={() => navigate('/projects')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const projectData = project.project;
  
  return (
    <div className="container py-8">
      <Button 
        variant="outline" 
        onClick={() => navigate('/projects')}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{projectData.title}</CardTitle>
                  <CardDescription className="mt-2">
                    Posted {format(new Date(projectData.createdAt), 'MMMM d, yyyy')}
                  </CardDescription>
                </div>
                <Badge variant={
                  projectData.status === 'open' ? 'default' : 
                  projectData.status === 'in_progress' ? 'secondary' : 
                  'outline'
                }>
                  {projectData.status === 'open' ? 'Open' : 
                   projectData.status === 'in_progress' ? 'In Progress' : 
                   'Completed'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Project Description</h3>
                <p className="text-muted-foreground whitespace-pre-line">
                  {projectData.description}
                </p>
              </div>
              
              {projectData.requirements && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {projectData.requirements}
                  </p>
                </div>
              )}
              
              {isFreelancer && projectData.status === 'open' && (
                <div className="pt-6">
                  <Separator className="mb-6" />
                  <h3 className="text-lg font-semibold mb-4">Submit a Proposal</h3>
                  <form onSubmit={handleSubmitProposal} className="space-y-4">
                    <div>
                      <label htmlFor="bidAmount" className="block text-sm font-medium mb-1">
                        Your Bid Amount ($)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="bidAmount"
                          type="number"
                          placeholder="Enter your bid amount"
                          className="pl-9"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="coverLetter" className="block text-sm font-medium mb-1">
                        Cover Letter
                      </label>
                      <Textarea
                        id="coverLetter"
                        placeholder="Introduce yourself and explain why you're the best fit for this project..."
                        rows={6}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Submit Proposal
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {projectData.budget && (
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Budget</p>
                    <p className="text-muted-foreground">${projectData.budget}</p>
                  </div>
                </div>
              )}
              
              {category && (
                <div className="flex items-start">
                  <Tag className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Category</p>
                    <p className="text-muted-foreground">{category.name}</p>
                  </div>
                </div>
              )}
              
              {projectData.deadline && (
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Deadline</p>
                    <p className="text-muted-foreground">
                      {format(new Date(projectData.deadline), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About the Client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Client Name</p>
                  <p className="text-muted-foreground text-sm">Member since {format(new Date(), 'MMM yyyy')}</p>
                </div>
              </div>
              
              <div className="pt-2">
                <Button variant="outline" className="w-full" disabled={!isAuthenticated}>
                  Contact Client
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {isFreelancer && projectData.status === 'open' && (
            <Card>
              <CardHeader>
                <CardTitle>Ready to Bid?</CardTitle>
                <CardDescription>
                  Submit a competitive proposal to increase your chances of winning this project.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full"
                  onClick={() => {
                    document.getElementById('bid-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Submit a Proposal
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}