import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-novabio-light via-novabio-light to-[#e8f4f8] opacity-80" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-novabio-teal/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-novabio-amber/5 rounded-full blur-3xl" />
      
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 ease-fluid ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-novabio-deep-teal/10 text-novabio-deep-teal text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-novabio-amber animate-pulse" />
              Knowledge Exchange Platform
            </div>

            {/* Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-novabio-charcoal leading-[1.1] tracking-tight">
              Connecting the dots in{' '}
              <span className="text-novabio-deep-teal">biotechnology</span>{' '}
              for a healthier tomorrow
            </h1>

            {/* Description */}
            <p className="text-lg text-novabio-charcoal/70 max-w-xl leading-relaxed">
              Join us in exploring the latest advancements, insights, and stories shaping the future of healthcare and life sciences. Publish your research and insights instantly.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a href="#articles">
                <Button 
                  size="lg"
                  className="bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-full px-8 gap-2 group"
                >
                  Explore Articles
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#about">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="rounded-full px-8 gap-2 border-novabio-deep-teal/20 hover:bg-novabio-deep-teal/5 group"
                >
                  <Play className="w-4 h-4 text-novabio-amber group-hover:scale-110 transition-transform" />
                  Learn More
                </Button>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-novabio-deep-teal">500+</p>
                <p className="text-sm text-novabio-charcoal/60">Articles Published</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-novabio-amber">150+</p>
                <p className="text-sm text-novabio-charcoal/60">Expert Contributors</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-novabio-teal">50K+</p>
                <p className="text-sm text-novabio-charcoal/60">Monthly Readers</p>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div 
            ref={imageRef}
            className={`relative transition-all duration-1000 delay-300 ease-fluid ${
              isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
            }`}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg) ${isVisible ? '' : 'scale(0.95)'}`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {/* Main image with organic mask */}
            <div className="relative">
              {/* Background shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-novabio-teal/20 to-novabio-amber/20 rounded-[3rem] blur-2xl" />
              
              {/* Image container with organic shape */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl">
                <img
                  src="/hero-scientist.jpg"
                  alt="Scientist working in biotechnology laboratory"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-novabio-deep-teal/30 to-transparent" />
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-novabio-teal/10 flex items-center justify-center">
                    <span className="text-novabio-teal font-bold text-sm">AI</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-novabio-charcoal">AI in Healthcare</p>
                    <p className="text-xs text-novabio-charcoal/60">Latest Research</p>
                  </div>
                </div>
                <p className="text-xs text-novabio-charcoal/70">
                  New breakthroughs in AI-driven diagnostics are transforming patient care.
                </p>
              </div>

              {/* Another floating element */}
              <div className="absolute -top-4 -right-4 bg-novabio-amber text-white rounded-xl px-4 py-2 shadow-lg">
                <p className="text-sm font-medium">Open Access</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
