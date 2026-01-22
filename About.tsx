import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FlaskConical, Stethoscope, Brain, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const focusAreas = [
  {
    icon: FlaskConical,
    title: 'Biotechnology',
    description: 'Advances in gene therapy, molecular biology, and therapeutic development'
  },
  {
    icon: Stethoscope,
    title: 'MedTech',
    description: 'Medical devices, diagnostics, and digital health innovations'
  },
  {
    icon: Brain,
    title: 'AI in Healthcare',
    description: 'Machine learning applications in diagnostics and drug discovery'
  },
  {
    icon: Shield,
    title: 'Policy & Ethics',
    description: 'Healthcare regulations, bioethics, and industry standards'
  }
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [imageRevealed, setImageRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setImageRevealed(true), 300);
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

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="section-padding bg-novabio-light overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <div className={`relative transition-all duration-1000 ease-fluid ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            {/* Background decoration */}
            <div className="absolute -inset-4 bg-gradient-to-br from-novabio-teal/10 to-novabio-amber/10 rounded-[3rem] blur-2xl" />
            
            {/* Image container with mask animation */}
            <div 
              className={`relative overflow-hidden transition-all duration-1000 ease-fluid ${
                imageRevealed 
                  ? 'rounded-[2rem]' 
                  : 'rounded-full scale-75'
              }`}
              style={{
                clipPath: imageRevealed 
                  ? 'inset(0 0 0 0 round 2rem)' 
                  : 'inset(0 0 0 0 round 50%)'
              }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/about-lab.jpg"
                  alt="Scientists collaborating in laboratory"
                  className={`w-full h-full object-cover transition-transform duration-1000 ease-fluid ${
                    imageRevealed ? 'scale-100' : 'scale-125'
                  }`}
                />
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-novabio-deep-teal/20 to-transparent" />
            </div>

            {/* Floating stat card */}
            <div className={`absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-[200px] transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <p className="text-4xl font-bold text-novabio-deep-teal">500+</p>
              <p className="text-sm text-novabio-charcoal/60">Articles Published</p>
            </div>
          </div>

          {/* Content Side */}
          <div className={`space-y-8 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div>
              <span className="text-novabio-amber font-medium text-sm uppercase tracking-wider">
                About NovaBio Exchange
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-novabio-charcoal mt-3 leading-tight">
                A platform for open knowledge sharing in healthcare innovation
              </h2>
            </div>

            <p className="text-lg text-novabio-charcoal/70 leading-relaxed">
              NovaBio Exchange is an open publishing platform dedicated to biotechnology, MedTech, digital health, and healthcare innovation. We believe in the power of open access to accelerate scientific progress and connect innovators worldwide.
            </p>

            <p className="text-novabio-charcoal/70 leading-relaxed">
              Our platform enables researchers, professionals, and innovators to publish insights and research instantly without editorial bottlenecks, fostering a vibrant community of knowledge exchange.
            </p>

            {/* Focus Areas */}
            <div className="grid sm:grid-cols-2 gap-4">
              {focusAreas.map((area, index) => (
                <div 
                  key={area.title}
                  className={`flex items-start gap-4 p-4 rounded-xl bg-white/50 hover:bg-white transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-novabio-teal/10 flex items-center justify-center flex-shrink-0">
                    <area.icon className="w-5 h-5 text-novabio-teal" />
                  </div>
                  <div>
                    <h4 className="font-medium text-novabio-charcoal mb-1">{area.title}</h4>
                    <p className="text-sm text-novabio-charcoal/60">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/guidelines">
                <Button 
                  size="lg"
                  className="bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-full px-8 gap-2 group"
                >
                  Publishing Guidelines
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contributors">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="rounded-full px-8 border-novabio-deep-teal/20 hover:bg-novabio-deep-teal/5"
                >
                  Meet Contributors
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
