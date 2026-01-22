import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark } from 'lucide-react';
import { articles, categories } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find(a => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-novabio-light pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-novabio-charcoal mb-2">Article Not Found</h1>
          <p className="text-novabio-charcoal/60 mb-4">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/articles">
            <Button>Back to Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  const categoryInfo = categories[article.category];
  const publishedDate = new Date(article.publishedAt);

  return (
    <div className="min-h-screen bg-novabio-light">
      {/* Article Header */}
      <header className="relative bg-novabio-deep-teal text-white">
        <div className="absolute inset-0">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-novabio-deep-teal/80 via-novabio-deep-teal/90 to-novabio-deep-teal" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          {/* Back Link */}
          <Link 
            to="/articles"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>

          {/* Category */}
          <Badge 
            className="mb-4"
            style={{ backgroundColor: categoryInfo.color }}
          >
            {categoryInfo.name}
          </Badge>

          {/* Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-white/70 text-sm">
            <div className="flex items-center gap-2">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span>{article.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {publishedDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime} min read
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-6">
            {article.tags.map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-novabio-charcoal/80 leading-relaxed mb-8">
            {article.excerpt}
          </p>

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-serif text-2xl font-bold text-novabio-charcoal mb-4">
              Introduction
            </h2>
            <p className="text-novabio-charcoal/70 leading-relaxed mb-4">
              The biotechnology landscape is undergoing a revolutionary transformation, driven by breakthroughs in gene editing, artificial intelligence, and precision medicine. These innovations are not just theoretical concepts but are rapidly moving from laboratory benches to clinical applications, fundamentally changing how we approach disease treatment and prevention.
            </p>
            <p className="text-novabio-charcoal/70 leading-relaxed mb-4">
              In this comprehensive analysis, we explore the latest developments in {article.category} and their implications for the future of healthcare. From novel therapeutic approaches to regulatory considerations, we examine the multifaceted aspects of this rapidly evolving field.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-serif text-2xl font-bold text-novabio-charcoal mb-4">
              Key Developments
            </h2>
            <p className="text-novabio-charcoal/70 leading-relaxed mb-4">
              Recent research has demonstrated significant progress in several key areas. Clinical trials have shown promising results, with many therapies advancing to late-stage development. The integration of AI and machine learning has accelerated discovery processes, reducing development timelines from years to months in some cases.
            </p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-novabio-teal mt-2 flex-shrink-0" />
                <span className="text-novabio-charcoal/70">Advanced therapeutic modalities showing unprecedented efficacy</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-novabio-teal mt-2 flex-shrink-0" />
                <span className="text-novabio-charcoal/70">Regulatory pathways evolving to accommodate innovation</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-novabio-teal mt-2 flex-shrink-0" />
                <span className="text-novabio-charcoal/70">Investment and partnerships driving commercialization</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="font-serif text-2xl font-bold text-novabio-charcoal mb-4">
              Future Outlook
            </h2>
            <p className="text-novabio-charcoal/70 leading-relaxed mb-4">
              Looking ahead, the convergence of multiple technological platforms promises to deliver even greater advances. The integration of genomics, proteomics, and digital health technologies is creating new opportunities for personalized medicine and preventive care.
            </p>
            <p className="text-novabio-charcoal/70 leading-relaxed">
              As we navigate this exciting landscape, collaboration between academia, industry, and regulatory bodies will be crucial to ensure that innovations reach patients safely and efficiently. The future of healthcare is being written today, and it's a story of hope, innovation, and transformation.
            </p>
          </div>

          {/* Author Bio */}
          <div className="bg-novabio-teal/5 rounded-2xl p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-2">
                  {article.author.name}
                </h3>
                <p className="text-novabio-teal font-medium text-sm mb-3">
                  {article.author.organization}
                </p>
                <p className="text-novabio-charcoal/60 text-sm leading-relaxed">
                  {article.author.bio}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {article.author.expertise.map((area) => (
                    <span 
                      key={area}
                      className="px-3 py-1 rounded-full bg-white text-novabio-teal text-xs font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              variant="outline"
              className="rounded-full gap-2 border-novabio-deep-teal/20 hover:bg-novabio-deep-teal/5"
            >
              <Share2 className="w-4 h-4" />
              Share Article
            </Button>
            <Button 
              variant="outline"
              className="rounded-full gap-2 border-novabio-deep-teal/20 hover:bg-novabio-deep-teal/5"
            >
              <Bookmark className="w-4 h-4" />
              Save for Later
            </Button>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-novabio-charcoal mb-8">
            Related Articles
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles
              .filter(a => a.category === article.category && a.id !== article.id)
              .slice(0, 3)
              .map((relatedArticle) => (
                <Link 
                  key={relatedArticle.id}
                  to={`/articles/${relatedArticle.slug}`}
                  className="group block"
                >
                  <article className="bg-novabio-light rounded-xl p-6 hover:shadow-md transition-shadow">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4"
                      style={{ backgroundColor: categories[relatedArticle.category].color }}
                    >
                      {categories[relatedArticle.category].name}
                    </span>
                    <h3 className="font-medium text-novabio-charcoal group-hover:text-novabio-deep-teal transition-colors mb-2 line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-novabio-charcoal/50">
                      <Clock className="w-3 h-3" />
                      {relatedArticle.readTime} min read
                    </div>
                  </article>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
