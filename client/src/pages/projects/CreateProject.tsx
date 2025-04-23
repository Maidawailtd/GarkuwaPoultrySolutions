import { useState } from 'react';
import { useLocation } from 'wouter';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, BriefcaseIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore, useCategoryStore } from '@/lib/store';
import { apiRequest } from '@/lib/queryClient';

// Define the form schema with Zod
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(100, {
    message: "Title must be at most 100 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  budget: z.string().refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Budget must be a positive number.",
  }),
  categoryId: z.string().refine(val => val !== "", {
    message: "Please select a category.",
  }),
  deadline: z.date().optional(),
  requirements: z.string().optional(),
});

export default function CreateProject() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { categories, fetchCategories } = useCategoryStore();
  const { isAuthenticated, user } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      budget: "",
      categoryId: "",
      requirements: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in to post a project.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    setIsSubmitting(true);

    try {
      const projectData = {
        ...values,
        budget: parseFloat(values.budget),
        categoryId: parseInt(values.categoryId),
      };

      const response = await apiRequest('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(projectData),
      });

      if (response.success) {
        toast({
          title: "Project Created",
          description: "Your project has been successfully posted.",
        });

        // Redirect to the new project page
        navigate(`/projects/${response.project.id}`);
      } else {
        toast({
          title: "Error",
          description: response.message || "An error occurred while creating your project.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("Project creation error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Post a New Project</h1>
        <p className="text-muted-foreground">
          Describe your project in detail to attract the best freelancers
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter a descriptive title for your project" {...field} />
                </FormControl>
                <FormDescription>
                  A clear title helps freelancers understand your project.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your project in detail..." 
                    className="min-h-[150px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Include all relevant details about what you need done.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter your budget" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Set a reasonable budget for your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.length === 0 ? (
                        <SelectItem value="loading" disabled>
                          Loading categories...
                        </SelectItem>
                      ) : (
                        categories.map((category) => (
                          <SelectItem 
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the most relevant category for your project.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="deadline"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Project Deadline</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select a deadline (optional)</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 1))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Set a realistic deadline for when you need this project completed.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="requirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Requirements (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any specific requirements, skills or qualifications needed..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  List any specific skills, experience, or requirements for freelancers.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/projects')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </div>
              ) : (
                <div className="flex items-center">
                  <BriefcaseIcon className="mr-2 h-4 w-4" />
                  Post Project
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}