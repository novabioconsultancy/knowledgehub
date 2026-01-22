import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, Clock, X } from 'lucide-react';
import { articles, categories } from '@/data/content';
import type { Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
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

  // Filter articles
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-novabio-light pt-24 pb-16">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-novabio-amber font-medium text-sm uppercase tracking-wider">
            Knowledge Base
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-novabio-charcoal mt-3 mb-4">
            Articles & Insights
          </h1>
          <p className="text-lg text-novabio-charcoal/60 max-w-2xl mx-auto">
            Explore the latest research, insights, and thought leadership from experts across biotechnology, MedTech, and digital health.
          </p>
        </div>

        {/* Search & Filters */}
        <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-novabio-charcoal/40" />
            <Input
              type="text"
              placeholder="Search articles, topics, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-10 py-6 rounded-xl border-novabio-deep-teal/10 focus:border-novabio-teal focus:ring-novabio-teal/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-novabio-charcoal/40 hover:text-novabio-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="rounded-xl border-novabio-deep-teal/10 hover:bg-novabio-deep-teal/5 gap-2"
              >
                <Filter className="w-4 h-4" />
                {selectedCategory === 'all' ? 'All Categories' : categories[selectedCategory].name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                All Categories
              </DropdownMenuItem>
              {Object.entries(categories).map(([key, category]) => (
                <DropdownMenuItem 
                  key={key} 
                  onClick={() => setSelectedCategory(key as Category)}
                >
                  <span 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedCategory !== 'all') && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-novabio-teal/10 text-novabio-teal text-sm">
                Search: {searchQuery}
                <button onClick={() => setSearchQuery('')}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-novabio-amber/10 text-novabio-amber text-sm">
                {categories[selectedCategory].name}
                <button onClick={() => setSelectedCategory('all')}>
                  <X className="w-3 h-3 ml-1" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Results Count */}
        <p className="text-sm text-novabio-charcoal/60 mb-6">
          Showing {filteredArticles.length} of {articles.length} articles
        </p>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => {
              const categoryInfo = categories[article.category];
              
              return (
                <Link 
                  key={article.id}
                  to={`/articles/${article.slug}`}
                  className={`group block transition-all duration-700 ease-fluid ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                  style={{ transitionDelay: `${(index % 6) * 100}ms` }}
                >
                  <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-fluid card-hover">
                    {/* Image */}
                    <div className="relative aspect-[3/2] overflow-hidden img-zoom">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-novabio-deep-teal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category Badge */}
                      <span 
                        className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: categoryInfo.color }}
                      >
                        {categoryInfo.name}
                      </span>

                      {/* Read arrow on hover */}
                      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-fluid">
                        <ArrowRight className="w-5 h-5 text-novabio-deep-teal" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {article.tags.slice(0, 2).map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-novabio-light text-novabio-charcoal/70"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Title */}
                      <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-3 line-clamp-2 group-hover:text-novabio-deep-teal transition-colors">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-novabio-charcoal/60 text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-novabio-deep-teal/10">
                        <div className="flex items-center gap-3">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-novabio-charcoal truncate">{article.author.name}</p>
                            <p className="text-xs text-novabio-charcoal/50 truncate">{article.author.organization}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-novabio-charcoal/50 flex-shrink-0">
                          <Clock className="w-3 h-3" />
                          {article.readTime} min
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-novabio-light flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-novabio-charcoal/40" />
            </div>
            <h3 className="text-xl font-medium text-novabio-charcoal mb-2">No articles found</h3>
            <p className="text-novabio-charcoal/60 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
