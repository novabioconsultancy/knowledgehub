import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ArrowLeft, FileText, AlertCircle, CheckCircle, Tag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categories } from '@/data/content';
import type { Category } from '@/types';

export default function SubmitArticlePage() {
  const { isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '' as Category,
    tags: '',
    featured: false,
    agreeToGuidelines: false,
    agreeToDisclaimer: false,
  });

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeToGuidelines || !formData.agreeToDisclaimer) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-novabio-light pt-24 pb-16 flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-novabio-charcoal mb-4">
            Article Published!
          </h1>
          <p className="text-novabio-charcoal/60 mb-8">
            Your article "{formData.title}" has been published and is now live on NovaBio Exchange. 
            Thank you for contributing to our community!
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/articles">
              <Button>View Articles</Button>
            </Link>
            <Button 
              variant="outline"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  title: '',
                  excerpt: '',
                  content: '',
                  category: '' as Category,
                  tags: '',
                  featured: false,
                  agreeToGuidelines: false,
                  agreeToDisclaimer: false,
                });
              }}
            >
              Write Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-novabio-light pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/articles"
            className="inline-flex items-center gap-2 text-novabio-charcoal/60 hover:text-novabio-deep-teal mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-novabio-charcoal mb-4">
            Submit an Article
          </h1>
          <p className="text-novabio-charcoal/60">
            Share your insights with our community of healthcare professionals and researchers. 
            Articles are published instantly without editorial review.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm">
              {/* Title */}
              <div className="mb-6">
                <Label htmlFor="title" className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4" />
                  Article Title *
                </Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter a descriptive title for your article"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
                />
              </div>

              {/* Excerpt */}
              <div className="mb-6">
                <Label htmlFor="excerpt" className="flex items-center gap-2 mb-2">
                  Article Excerpt *
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Write a brief summary (2-3 sentences) that captures the main points of your article"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  required
                  rows={3}
                  className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal resize-none"
                />
              </div>

              {/* Content */}
              <div className="mb-6">
                <Label htmlFor="content" className="mb-2">
                  Article Content *
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write your full article here. You can use markdown-style formatting. Include sections, bullet points, and references as needed."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={12}
                  className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal resize-none"
                />
              </div>

              {/* Category */}
              <div className="mb-6">
                <Label htmlFor="category" className="mb-2">
                  Category *
                </Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value as Category })}
                >
                  <SelectTrigger className="rounded-xl border-novabio-deep-teal/10">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(categories).map(([key, category]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center gap-2">
                          <span 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <Label htmlFor="tags" className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4" />
                  Tags
                </Label>
                <Input
                  id="tags"
                  type="text"
                  placeholder="Enter tags separated by commas (e.g., CRISPR, Gene Therapy, Innovation)"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  className="rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal"
                />
              </div>

              {/* Featured */}
              <div className="mb-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured" className="text-sm text-novabio-charcoal/70">
                    Feature this article on the homepage
                  </Label>
                </div>
              </div>

              {/* Guidelines Agreement */}
              <div className="mb-6 p-4 rounded-xl bg-novabio-light">
                <div className="flex items-start space-x-3 mb-4">
                  <Checkbox
                    id="guidelines"
                    checked={formData.agreeToGuidelines}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToGuidelines: checked as boolean })}
                    required
                  />
                  <Label htmlFor="guidelines" className="text-sm text-novabio-charcoal/70 cursor-pointer">
                    I agree to follow the{' '}
                    <Link to="/guidelines" className="text-novabio-teal hover:underline">
                      Publishing Guidelines
                    </Link>{' '}
                    and understand that I am solely responsible for the content I publish.
                  </Label>
                </div>
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="disclaimer"
                    checked={formData.agreeToDisclaimer}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeToDisclaimer: checked as boolean })}
                    required
                  />
                  <Label htmlFor="disclaimer" className="text-sm text-novabio-charcoal/70 cursor-pointer">
                    I agree to the{' '}
                    <Link to="/disclaimer" className="text-novabio-teal hover:underline">
                      Content Disclaimer
                    </Link>{' '}
                    and understand that articles are published without editorial review.
                  </Label>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit"
                disabled={isSubmitting || !formData.agreeToGuidelines || !formData.agreeToDisclaimer}
                className="w-full bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-xl py-6"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Publishing...
                  </span>
                ) : (
                  'Publish Article'
                )}
              </Button>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <h3 className="font-serif text-lg font-bold text-novabio-charcoal mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-novabio-amber" />
                Publishing Policy
              </h3>
              <ul className="space-y-3 text-sm text-novabio-charcoal/60">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-novabio-teal mt-2 flex-shrink-0" />
                  Articles are published instantly without editorial review
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-novabio-teal mt-2 flex-shrink-0" />
                  Authors are solely responsible for their content
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-novabio-teal mt-2 flex-shrink-0" />
                  All articles display clear author attribution
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-novabio-teal mt-2 flex-shrink-0" />
                  Community guidelines must be followed
                </li>
              </ul>
            </div>

            <div className="bg-novabio-teal/5 rounded-2xl p-6">
              <h3 className="font-serif text-lg font-bold text-novabio-charcoal mb-4">
                Writing Tips
              </h3>
              <ul className="space-y-3 text-sm text-novabio-charcoal/60">
                <li className="flex items-start gap-2">
                  <span className="font-medium text-novabio-teal">1.</span>
                  Use clear, descriptive titles that capture the main point
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-novabio-teal">2.</span>
                  Include relevant data, citations, and references
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-novabio-teal">3.</span>
                  Break up long paragraphs for better readability
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-novabio-teal">4.</span>
                  Add relevant tags to help readers find your content
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-medium text-novabio-teal">5.</span>
                  Proofread before publishing for accuracy
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
