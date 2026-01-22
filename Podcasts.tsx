import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Clock } from 'lucide-react';
import { podcasts } from '@/data/content';

export default function Podcasts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
    
    // Update progress
    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    setScrollProgress((sliderRef.current.scrollLeft / maxScroll) * 100);
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const maxScroll = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    setScrollProgress((sliderRef.current.scrollLeft / maxScroll) * 100);
  };

  return (
    <section 
      ref={sectionRef}
      className="py-20 md:py-28 bg-novabio-deep-teal relative overflow-hidden"
    >
      {/* Background decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div 
          className={`text-[20vw] font-serif font-bold text-white/[0.02] whitespace-nowrap transition-transform duration-1000 ${
            isVisible ? 'rotate-0' : 'rotate-12'
          }`}
        >
          NOVABIO • NOVABIO • NOVABIO •
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <span className="text-novabio-coral font-medium text-sm uppercase tracking-wider">
              Audio Content
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mt-2">
              Latest Podcasts
            </h2>
          </div>
          <Link 
            to="/podcasts"
            className="group inline-flex items-center gap-2 text-novabio-coral font-medium hover:text-white transition-colors"
          >
            See all podcasts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Podcast Slider */}
        <div 
          ref={sliderRef}
          className={`flex gap-6 overflow-x-auto pb-8 cursor-grab active:cursor-grabbing scrollbar-hide transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {podcasts.map((podcast, index) => (
            <div 
              key={podcast.id}
              className={`flex-shrink-0 w-[320px] sm:w-[380px] group transition-all duration-500 ${
                isDragging ? 'scale-[0.98]' : ''
              }`}
              style={{ 
                transform: isDragging ? `skewX(${(scrollLeft - (sliderRef.current?.scrollLeft || 0)) * 0.01}deg)` : 'none',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500">
                {/* Image */}
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={podcast.image}
                    alt={podcast.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-novabio-deep-teal/80 to-transparent" />
                  
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-16 h-16 rounded-full bg-novabio-amber flex items-center justify-center shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-fluid hover:bg-novabio-coral">
                      <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </button>
                  </div>

                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs">
                    <Clock className="w-3 h-3" />
                    {podcast.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-novabio-coral text-sm font-medium mb-2">
                    {podcast.host}
                  </p>
                  <h3 className="font-serif text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-novabio-coral transition-colors">
                    {podcast.title}
                  </h3>
                  <p className="text-white/60 text-sm line-clamp-3 mb-4">
                    {podcast.description}
                  </p>
                  <p className="text-white/40 text-xs">
                    {new Date(podcast.publishedAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className={`mt-8 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden max-w-xs mx-auto">
            <div 
              className="h-full bg-novabio-amber rounded-full transition-all duration-300"
              style={{ width: `${Math.max(scrollProgress, 10)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
