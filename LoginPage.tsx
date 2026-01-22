import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const success = await login(formData.email, formData.password);
    
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
      setIsSubmitting(false);
    }
  };

  // Demo credentials
  const demoAccounts = [
    { email: 'admin@novabio.com', role: 'Admin', password: 'demo123' },
    { email: 'contributor@example.com', role: 'Contributor', password: 'demo123' },
  ];

  return (
    <div className="min-h-screen bg-novabio-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-lg bg-novabio-deep-teal flex items-center justify-center">
              <span className="text-white font-bold">N</span>
            </div>
            <span className="font-serif font-bold text-xl text-novabio-charcoal">NovaBio</span>
          </Link>
          <h1 className="font-serif text-2xl font-bold text-novabio-charcoal">
            Welcome Back
          </h1>
          <p className="text-novabio-charcoal/60 mt-2">
            Sign in to your account to continue
          </p>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <p className="text-sm text-novabio-charcoal/60 mb-3 text-center">
            Try these demo accounts:
          </p>
          <div className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  setFormData({ ...formData, email: account.email, password: account.password });
                }}
                className="w-full text-left p-3 rounded-lg bg-novabio-light hover:bg-novabio-teal/10 transition-colors text-sm"
              >
                <span className="font-medium text-novabio-charcoal">{account.role}:</span>{' '}
                <span className="text-novabio-teal">{account.email}</span>
                <span className="text-novabio-charcoal/40 ml-2">/ {account.password}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-5">
            <div>
              <Label htmlFor="email" className="mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
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

            <div>
              <Label htmlFor="password" className="mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-novabio-charcoal/40 hover:text-novabio-charcoal"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                />
                <Label htmlFor="remember" className="text-sm text-novabio-charcoal/60">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-novabio-teal hover:underline">
                Forgot password?
              </a>
            </div>

            <Button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-xl py-6"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-novabio-deep-teal/10">
            <p className="text-center text-sm text-novabio-charcoal/60">
              Don't have an account?{' '}
              <Link to="/register" className="text-novabio-teal hover:underline font-medium">
                Create one now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
