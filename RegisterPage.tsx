import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, Building2, GraduationCap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterPage() {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    bio: '',
    organization: '',
    expertise: '',
    agreeToTerms: false,
    agreeToGuidelines: false,
  });
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms || !formData.agreeToGuidelines) {
      setError('Please agree to the terms and guidelines');
      return;
    }

    setIsSubmitting(true);

    const success = await register(
      formData.email,
      formData.name,
      formData.password,
      {
        bio: formData.bio || 'New contributor',
        expertise: formData.expertise.split(',').map(e => e.trim()).filter(e => e),
        organization: formData.organization || undefined,
      }
    );

    if (success) {
      navigate('/');
    } else {
      setError('Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-novabio-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-novabio-deep-teal flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="font-serif font-bold text-xl text-novabio-charcoal">NovaBio</span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-novabio-charcoal">
            Join as a Contributor
          </h1>
          <p className="text-novabio-charcoal/60 mt-2">
            Share your expertise with our community of healthcare professionals
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name *
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
              />
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password *
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
              />
            </div>
          </div>

          {/* Organization */}
          <div className="mt-6">
            <Label htmlFor="organization" className="mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Organization / Institution
            </Label>
            <Input
              id="organization"
              type="text"
              placeholder="Where do you work or study?"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
            />
          </div>

          {/* Bio */}
          <div className="mt-6">
            <Label htmlFor="bio" className="mb-2 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Bio
            </Label>
            <Textarea
              id="bio"
              placeholder="Tell us about yourself and your expertise in biotechnology, MedTech, or digital health..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              rows={4}
              className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal resize-none"
            />
          </div>

          {/* Expertise */}
          <div className="mt-6">
            <Label htmlFor="expertise" className="mb-2">
              Areas of Expertise
            </Label>
            <Input
              id="expertise"
              type="text"
              placeholder="e.g., Gene Therapy, AI in Healthcare, Regulatory Affairs (comma-separated)"
              value={formData.expertise}
              onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
              className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
            />
          </div>

          {/* Agreements */}
          <div className="mt-8 space-y-4 p-6 rounded-xl bg-novabio-light">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeToTerms: checked as boolean })}
                required
              />
              <Label htmlFor="terms" className="text-sm text-novabio-charcoal/70 cursor-pointer">
                I agree to the{' '}
                <Link to="/terms" className="text-novabio-teal hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-novabio-teal hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox
                id="guidelines"
                checked={formData.agreeToGuidelines}
                onCheckedChange={(checked) => setFormData({ ...formData, agreeToGuidelines: checked as boolean })}
                required
              />
              <Label htmlFor="guidelines" className="text-sm text-novabio-charcoal/70 cursor-pointer">
                I agree to the{' '}
                <Link to="/guidelines" className="text-novabio-teal hover:underline">
                  Publishing Guidelines
                </Link>{' '}
                and understand that I am responsible for my published content
              </Label>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-8 bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-xl py-6 gap-2"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating Account...
              </span>
            ) : (
              <>
                Create Account
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>

          <div className="mt-6 pt-6 border-t border-novabio-deep-teal/10">
            <p className="text-center text-sm text-novabio-charcoal/60">
              Already have an account?{' '}
              <Link to="/login" className="text-novabio-teal hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
