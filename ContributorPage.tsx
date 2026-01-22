import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FileText, Linkedin, Twitter, Mail, Calendar, Award } from 'lucide-react';
import { contributors, articles, categories } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ContributorPage() {
  const { slug } = useParams<{ slug: string }>();
  const contributor = contributors.find(c => c.slug === slug);

  if (!contributor) {
    return (
      <div className="min-h-screen bg-novabio-light pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-novabio-charcoal mb-2">Contributor Not Found</h1>
          <p className="text-novabio-charcoal/60 mb-4">
            The contributor you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/contributors">
            <Button>Back to Contributors</Button>
          </Link>
        </div>
      </div>
    );
  }

  const contributorArticles = articles.filter(a => a.author.id === contributor.id);

  return (
    <div className="min-h-screen bg-novabio-light">
      {/* Header */}
      <header className="bg-novabio-deep-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            to="/contributors"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Contributors
          </Link>

          <div className="flex flex-col md:flex-row items-start gap-8">
            <img
              src={contributor.avatar}
              alt={contributor.name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                {contributor.role === 'admin' && (
                  <Badge className="bg-novabio-amber text-white">
                    NovaBio Admin
                  </Badge>
                )}
                <Badge variant="outline" className="border-white/30 text-white">
                  {contributor.articleCount} Articles
                </Badge>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold mb-3">
                {contributor.name}
              </h1>
              {contributor.organization && (
                <p className="text-xl text-white/80 mb-4">
                  {contributor.organization}
                </p>
              )}
              <p className="text-white/70 max-w-2xl leading-relaxed">
                {contributor.bio}
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                {contributor.social?.linkedin && (
                  <a 
                    href={contributor.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-novabio-coral transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {contributor.social?.twitter && (
                  <a 
                    href={contributor.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-novabio-coral transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                <a 
                  href={`mailto:${contributor.name.toLowerCase().replace(/\s+/g, '.')}@example.com`}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-novabio-coral transition-colors"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Expertise & Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
              <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-4">
                Areas of Expertise
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {contributor.expertise.map((area) => (
                  <span 
                    key={area}
                    className="px-3 py-1 rounded-full bg-novabio-teal/10 text-novabio-teal text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-novabio-deep-teal/10">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-novabio-charcoal/40" />
                  <div>
                    <p className="text-sm font-medium text-novabio-charcoal">{contributor.articleCount} Articles</p>
                    <p className="text-xs text-novabio-charcoal/50">Published on NovaBio Exchange</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-novabio-charcoal/40" />
                  <div>
                    <p className="text-sm font-medium text-novabio-charcoal">Active Since</p>
                    <p className="text-xs text-novabio-charcoal/50">January 2026</p>
                  </div>
                </div>
                {contributor.role === 'admin' && (
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-novabio-amber" />
                    <div>
                      <p className="text-sm font-medium text-novabio-charcoal">Platform Admin</p>
                      <p className="text-xs text-novabio-charcoal/50">NovaBio Exchange Team</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Articles */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold text-novabio-charcoal mb-6">
              Articles by {contributor.name}
            </h2>

            {contributorArticles.length > 0 ? (
              <div className="space-y-6">
                {contributorArticles.map((article) => {
                  const categoryInfo = categories[article.category];
                  
                  return (
                    <Link 
                      key={article.id}
                      to={`/articles/${article.slug}`}
                      className="group block"
                    >
                      <article className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row gap-6">
                          <div className="sm:w-48 flex-shrink-0">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                          </div>
                          <div className="flex-1">
                            <span 
                              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3"
                              style={{ backgroundColor: categoryInfo.color }}
                            >
                              {categoryInfo.name}
                            </span>
                            <h3 className="font-serif text-xl font-bold text-novabio-charcoal group-hover:text-novabio-deep-teal transition-colors mb-2">
                              {article.title}
                            </h3>
                            <p className="text-novabio-charcoal/60 text-sm mb-4 line-clamp-2">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-novabio-charcoal/50">
                                <span>{article.readTime} min read</span>
                                <span>•</span>
                                <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                              </div>
                              <span className="text-novabio-teal text-sm font-medium group-hover:underline">
                                Read Article
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center">
                <FileText className="w-12 h-12 text-novabio-charcoal/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-novabio-charcoal mb-2">
                  No articles yet
                </h3>
                <p className="text-novabio-charcoal/60">
                  {contributor.name} hasn't published any articles yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
