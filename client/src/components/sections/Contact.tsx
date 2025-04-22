import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useContactForm } from "@/hooks/use-contact-form";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Contact() {
  const { form, handleSubmit, isPending, errors } = useContactForm();

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-8">
            <h2 className="font-bold text-3xl md:text-4xl text-[#2D5E2E] mb-6">
              Get In Touch
            </h2>
            <p className="text-lg mb-6">
              Interested in our training programs or have questions about livestock farming? Contact us today!
            </p>
            
            <div className="mb-8">
              <h3 className="font-semibold text-xl mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="text-[#D9A604] mt-1 mr-4 h-5 w-5" />
                  <div>
                    <p className="font-semibold">Farm Location:</p>
                    <p>Km 15, Kaduna-Zaria Highway, Kaduna State, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-[#D9A604] mt-1 mr-4 h-5 w-5" />
                  <div>
                    <p className="font-semibold">Phone:</p>
                    <p>+234 803 384 7675</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="text-[#D9A604] mt-1 mr-4 h-5 w-5" />
                  <div>
                    <p className="font-semibold">Email:</p>
                    <p>info@garkuwafarm.com, training@garkuwafarm.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="text-[#D9A604] mt-1 mr-4 h-5 w-5" />
                  <div>
                    <p className="font-semibold">Operating Hours:</p>
                    <p>Monday - Saturday: 8:00 AM - 5:00 PM</p>
                    <p>Sunday: Closed (Except for scheduled training sessions)</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#2D5E2E] text-white flex items-center justify-center hover:bg-[#3A7A3B] transition duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#2D5E2E] text-white flex items-center justify-center hover:bg-[#3A7A3B] transition duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#2D5E2E] text-white flex items-center justify-center hover:bg-[#3A7A3B] transition duration-300"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-[#2D5E2E] text-white flex items-center justify-center hover:bg-[#3A7A3B] transition duration-300"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <Card className="bg-[#F7F7F2] shadow-md">
              <CardContent className="p-6">
                <h3 className="font-semibold text-2xl mb-6 text-center">Send Us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input 
                        id="fullName" 
                        placeholder="Your full name" 
                        {...form.register("fullName")}
                        className={errors.fullName ? "border-red-500" : ""}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email address" 
                        {...form.register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        placeholder="Your phone number" 
                        {...form.register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="program">Interested In</Label>
                      <Select onValueChange={(value) => form.setValue("program", value)}>
                        <SelectTrigger id="program">
                          <SelectValue placeholder="Select a Program" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Select a Program</SelectItem>
                          <SelectItem value="poultry">Poultry Management</SelectItem>
                          <SelectItem value="cattle">Cattle Rearing</SelectItem>
                          <SelectItem value="small-ruminants">Small Ruminants</SelectItem>
                          <SelectItem value="pigs">Pig Farming</SelectItem>
                          <SelectItem value="rabbits">Rabbit Production</SelectItem>
                          <SelectItem value="fish">Fish Farming</SelectItem>
                          <SelectItem value="other">Other Inquiries</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      placeholder="Your message"
                      {...form.register("message")}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="consent" 
                      required
                      onCheckedChange={(checked) => {
                        form.setValue("consent", checked === true);
                      }}
                    />
                    <Label htmlFor="consent" className="text-sm">
                      I consent to Garkuwa Farm collecting and storing my data submitted through this form for the purpose of responding to my inquiry.
                    </Label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-[#2D5E2E] hover:bg-[#3A7A3B] text-white font-bold transition duration-300"
                    disabled={isPending}
                  >
                    {isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
