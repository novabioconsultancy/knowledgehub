import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePosition({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      {/* Background Image with blur effect */}
      <div 
        className={`absolute inset-0 transition-all duration-700 ${
          isHovered ? 'blur-0 scale-105' : 'blur-sm scale-100'
        }`}
      >
        <img
          src="/cta-background.jpg"
          alt="Healthcare technology in use"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-novabio-deep-teal/70" />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`space-y-8 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-novabio-coral animate-pulse" />
            Join Our Community
          </div>

          {/* Headline */}
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
            Let's collaborate and shape the future of healthcare
          </h2>

          {/* Description */}
          <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Whether you're a researcher, entrepreneur, or healthcare professional, NovaBio Exchange provides a platform to share your insights, connect with peers, and contribute to the advancement of biotechnology and digital health.
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2 text-white/80">
              <FileText className="w-5 h-5 text-novabio-coral" />
              <span className="text-sm">Publish Instantly</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Users className="w-5 h-5 text-novabio-coral" />
              <span className="text-sm">Join 150+ Contributors</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Mail className="w-5 h-5 text-novabio-coral" />
              <span className="text-sm">Reach 50K+ Readers</span>
            </div>
          </div>

          {/* CTA Button with magnetic effect */}
          <div className="pt-4">
            <Link to="/register">
              <Button
                ref={buttonRef}
                size="lg"
                className="bg-novabio-amber hover:bg-novabio-coral text-white rounded-full px-10 py-6 text-lg font-medium gap-3 shadow-xl shadow-novabio-amber/30 transition-all duration-300 ease-fluid"
                style={{
                  transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                }}
              >
                Become a Contributor
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <p className="text-sm text-white/50">
            Already have an account?{' '}
            <Link to="/login" className="text-novabio-coral hover:text-white transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-white/10 rounded-full" />
      <div className="absolute bottom-10 right-10 w-48 h-48 border border-white/5 rounded-full" />
    </section>
  );
}
