import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  program: z.string().optional(),
  message: z.string().min(10, { message: "Message is required (min 10 characters)" }),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to submit the form",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function useContactForm() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      program: "",
      message: "",
      consent: false,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Omit<ContactFormValues, "consent">) => {
      const response = await apiRequest("POST", "/api/contact", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your message has been sent. We will get back to you soon.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
      console.error("Form submission error:", error);
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    // Remove consent from the data sent to the server
    const { consent, ...submitData } = data;
    mutate(submitData);
  });

  return {
    form,
    handleSubmit,
    isPending,
    errors: form.formState.errors,
  };
}
