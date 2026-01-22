import { useState, useRef, useEffect } from 'react';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContactPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-novabio-light pt-24 pb-16">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-novabio-teal font-medium text-sm uppercase tracking-wider">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-novabio-charcoal mt-3 mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-novabio-charcoal/60 max-w-2xl mx-auto">
            Have questions about NovaBio Exchange? We'd love to hear from you. 
            Reach out for partnerships, support, or general inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className={`lg:col-span-1 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
              <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-6">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-novabio-teal/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-novabio-teal" />
                  </div>
                  <div>
                    <p className="font-medium text-novabio-charcoal">Email</p>
                    <a href="novabioconsultancy@gmail.com" className="text-novabio-teal hover:underline">
                      novabioconsultancy@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-novabio-amber/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-novabio-amber" />
                  </div>
                  <div>
                    <p className="font-medium text-novabio-charcoal">Phone</p>
                    <a href="tel:+1234567890" className="text-novabio-charcoal/60">
                      +254 (763) 853-052
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-novabio-sage/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-novabio-sage" />
                  </div>
                  <div>
                    <p className="font-medium text-novabio-charcoal">Location</p>
                    <p className="text-novabio-charcoal/60">
                      123 GTC Towers<br />
                      Westlands, <NRB></NRB> 02134<br />
                      Kenya
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-novabio-light rounded-2xl p-8">
              <h3 className="font-serif text-lg font-bold text-novabio-charcoal mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 text-sm text-novabio-charcoal/60">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM EAT</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday - Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`lg:col-span-2 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {isSubmitted ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-novabio-charcoal mb-4">
                  Message Sent!
                </h3>
                <p className="text-novabio-charcoal/60">
                  Thank you for reaching out. We'll get back to you within 24-48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <Label htmlFor="name" className="mb-2">Name *</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      required
                      className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="mb-2">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      required
                      className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <Label htmlFor="subject" className="mb-2">Subject *</Label>
                  <Select>
                    <SelectTrigger className="rounded-xl border-novabio-deep-teal/10">
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <SelectItem value="contribution">Contribution Question</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="mb-6">
                  <Label htmlFor="message" className="mb-2">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    required
                    rows={6}
                    className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal resize-none"
                  />
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-xl py-6 gap-2"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </span>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
