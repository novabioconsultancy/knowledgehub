import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { articles, categories } from '@/data/content';
import type { Article } from '@/types';

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const categoryInfo = categories[article.category];

  return (
    <Link 
      to={`/articles/${article.slug}`}
      className={`group block ${index === 1 ? 'lg:mt-20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
          
          {/* Hover overlay with read button */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-fluid">
              <ArrowRight className="w-6 h-6 text-novabio-deep-teal" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Category & Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span 
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: categoryInfo.color }}
            >
              {categoryInfo.name}
            </span>
            {article.tags.slice(0, 2).map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium bg-novabio-light text-novabio-charcoal/70"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-3 line-clamp-2 group-hover:text-novabio-deep-teal transition-colors duration-300">
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
              <div>
                <p className="text-sm font-medium text-novabio-charcoal">{article.author.name}</p>
                <p className="text-xs text-novabio-charcoal/50">{article.author.organization}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-novabio-charcoal/50">
              <Clock className="w-3 h-3" />
              {article.readTime} min
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function LatestArticles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const featuredArticles = articles.filter(a => a.featured).slice(0, 3);

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

  return (
    <section 
      ref={sectionRef}
      id="articles"
      className="section-padding bg-novabio-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <span className="text-novabio-amber font-medium text-sm uppercase tracking-wider">
              Latest Insights
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-novabio-charcoal mt-2">
              Latest Articles
            </h2>
          </div>
          <Link 
            to="/articles"
            className="group inline-flex items-center gap-2 text-novabio-deep-teal font-medium hover:text-novabio-teal transition-colors"
          >
            See all articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredArticles.map((article, index) => (
            <div 
              key={article.id}
              className={`transition-all duration-700 ease-fluid ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <ArticleCard article={article} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
