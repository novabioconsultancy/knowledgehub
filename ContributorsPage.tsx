import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, FileText, Building2, ArrowRight, GraduationCap } from 'lucide-react';
import { contributors } from '@/data/content';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ContributorsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  // Filter contributors
  const filteredContributors = contributors.filter(contributor => {
    const matchesSearch = contributor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contributor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contributor.expertise.some(exp => exp.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         (contributor.organization && contributor.organization.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  // Stats
  const totalContributors = contributors.length;
  const totalArticles = contributors.reduce((sum, c) => sum + c.articleCount, 0);
  const contributorCount = contributors.filter(c => c.role === 'contributor').length;

  return (
    <div className="min-h-screen bg-novabio-light pt-24 pb-16">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-novabio-sage font-medium text-sm uppercase tracking-wider">
            Our Community
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-novabio-charcoal mt-3 mb-4">
            Expert Contributors
          </h1>
          <p className="text-lg text-novabio-charcoal/60 max-w-2xl mx-auto">
            Meet the researchers, professionals, and innovators sharing their expertise on NovaBio Exchange.
          </p>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <Users className="w-8 h-8 text-novabio-deep-teal mx-auto mb-3" />
            <p className="text-3xl font-bold text-novabio-charcoal">{totalContributors}</p>
            <p className="text-sm text-novabio-charcoal/60">Contributors</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <FileText className="w-8 h-8 text-novabio-amber mx-auto mb-3" />
            <p className="text-3xl font-bold text-novabio-charcoal">{totalArticles}</p>
            <p className="text-sm text-novabio-charcoal/60">Articles</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <GraduationCap className="w-8 h-8 text-novabio-teal mx-auto mb-3" />
            <p className="text-3xl font-bold text-novabio-charcoal">{contributorCount}</p>
            <p className="text-sm text-novabio-charcoal/60">Expert Contributors</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <Building2 className="w-8 h-8 text-novabio-terracotta mx-auto mb-3" />
            <p className="text-3xl font-bold text-novabio-charcoal">50+</p>
            <p className="text-sm text-novabio-charcoal/60">Organizations</p>
          </div>
        </div>

        {/* Search */}
        <div className={`relative max-w-md mx-auto mb-12 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-novabio-charcoal/40" />
          <Input
            type="text"
            placeholder="Search contributors by name, expertise, or organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 py-6 rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal focus:ring-novabio-teal/20"
          />
        </div>

        {/* Contributors Grid */}
        {filteredContributors.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContributors.map((contributor, index) => (
              <Link 
                key={contributor.id}
                to={`/contributors/${contributor.slug}`}
                className={`group block transition-all duration-700 ease-fluid ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${(index % 9) * 75}ms` }}
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 ease-fluid card-hover border border-transparent hover:border-novabio-teal/20">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <img
                      src={contributor.avatar}
                      alt={contributor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xl font-bold text-novabio-charcoal group-hover:text-novabio-deep-teal transition-colors">
                        {contributor.name}
                      </h3>
                      {contributor.organization && (
                        <p className="text-sm text-novabio-teal font-medium">
                          {contributor.organization}
                        </p>
                      )}
                      <p className="text-sm text-novabio-charcoal/50">
                        {contributor.articleCount} articles
                      </p>
                    </div>
                    {contributor.role === 'admin' && (
                      <Badge className="bg-novabio-amber text-white flex-shrink-0">
                        Admin
                      </Badge>
                    )}
                  </div>

                  {/* Bio */}
                  <p className="text-novabio-charcoal/60 text-sm mb-6 line-clamp-3">
                    {contributor.bio}
                  </p>

                  {/* Expertise */}
                  <div className="flex flex-wrap gap-2">
                    {contributor.expertise.slice(0, 3).map((area) => (
                      <span 
                        key={area}
                        className="px-3 py-1 rounded-full bg-novabio-light text-novabio-charcoal/70 text-xs"
                      >
                        {area}
                      </span>
                    ))}
                    {contributor.expertise.length > 3 && (
                      <span className="px-3 py-1 rounded-full bg-novabio-teal/10 text-novabio-teal text-xs">
                        +{contributor.expertise.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="flex justify-end mt-4">
                    <div className="w-8 h-8 rounded-full bg-novabio-light flex items-center justify-center group-hover:bg-novabio-teal transition-colors">
                      <ArrowRight className="w-4 h-4 text-novabio-teal group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Users className="w-12 h-12 text-novabio-charcoal/40 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-novabio-charcoal mb-2">No contributors found</h3>
            <p className="text-novabio-charcoal/60">
              Try adjusting your search terms to find contributors.
            </p>
          </div>
        )}

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h3 className="font-serif text-2xl font-bold text-novabio-charcoal mb-4">
            Join as a Contributor
          </h3>
          <p className="text-novabio-charcoal/60 mb-6 max-w-xl mx-auto">
            Share your expertise with our community of 50,000+ healthcare professionals and researchers.
          </p>
          <Link to="/register">
            <Button 
              size="lg"
              className="bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-full px-8"
            >
              Become a Contributor
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
