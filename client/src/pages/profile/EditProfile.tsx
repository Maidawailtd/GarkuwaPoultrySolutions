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
import { useAuthStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { UserRole } from '@shared/schema';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Define the form schema with Zod
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  location: z.string().optional(),
  bio: z.string().optional(),
  hourlyRate: z.union([
    z.number().min(1, { message: "Hourly rate must be positive" }),
    z.string().transform((val, ctx) => {
      const parsed = parseFloat(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Must be a valid number",
        });
        return z.NEVER;
      }
      if (parsed < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hourly rate must be positive",
        });
        return z.NEVER;
      }
      return parsed;
    }),
  ]).optional(),
});

export default function EditProfile() {
  const [, navigate] = useLocation();
  const { user, isLoading: authLoading } = useAuthStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [newSkill, setNewSkill] = useState('');

  const isFreelancer = user?.role === UserRole.FREELANCER;

  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName || '',
      email: user?.email || '',
      location: user?.location || '',
      bio: user?.bio || '',
      hourlyRate: user?.hourlyRate || '',
    },
  });

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    try {
      // Prepare update data, including skills
      const updateData = {
        ...values,
        skills,
      };

      const response = await apiRequest(`/api/users/${user?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth-token')}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.success) {
        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated.",
        });
        navigate('/profile');
      } else {
        toast({
          title: "Error",
          description: response.message || "An error occurred while updating your profile.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="container py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-1/3 bg-muted rounded"></div>
          <div className="h-4 w-1/4 bg-muted rounded"></div>
          <div className="space-y-2 pt-4">
            <div className="h-4 w-1/6 bg-muted rounded"></div>
            <div className="h-10 w-full bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
        <p className="text-muted-foreground">
          Update your profile information and settings
        </p>
      </div>

      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatar || undefined} />
          <AvatarFallback>
            {user.fullName?.split(' ').map(name => name[0]).join('').toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <Button variant="outline" size="sm" disabled>
            Change Avatar
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: JPG, PNG. Max size: 2MB
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. New York, USA" {...field} />
                </FormControl>
                <FormDescription>
                  Your general location helps clients to find local talent.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about yourself and your experience..." 
                    className="min-h-[150px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  A good bio helps you stand out to potential clients.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {isFreelancer && (
            <>
              <FormField
                control={form.control}
                name="hourlyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hourly Rate ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Your hourly rate in USD" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Set a competitive rate for your services.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Skills</FormLabel>
                <div className="flex items-center gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill (e.g. React, UI Design)"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                  <Button type="button" onClick={addSkill}>
                    Add
                  </Button>
                </div>
                <FormDescription>
                  Add skills that showcase your expertise.
                </FormDescription>
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-destructive"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {skill}</span>
                      </button>
                    </Badge>
                  ))}
                  {skills.length === 0 && (
                    <div className="text-sm text-muted-foreground">No skills added yet</div>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}