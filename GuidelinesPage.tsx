import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Shield, AlertTriangle, CheckCircle, Users, Scale, ExternalLink } from 'lucide-react';
import { guidelines } from '@/data/content';
import { Button } from '@/components/ui/button';

export default function GuidelinesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
    <div className="min-h-screen bg-novabio-light pt-24 pb-16">
      <div ref={sectionRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-novabio-amber font-medium text-sm uppercase tracking-wider">
            Community Standards
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-novabio-charcoal mt-3 mb-4">
            Publishing Guidelines & Disclaimer
          </h1>
          <p className="text-lg text-novabio-charcoal/60">
            Last updated: {guidelines.lastUpdated}
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm">
          {/* Introduction */}
          <div className={`mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-lg text-novabio-charcoal/70 leading-relaxed mb-6">
              NovaBio Exchange operates on an open publishing model that enables experts to share insights instantly with the healthcare community. While we believe in the power of open access, we also maintain certain standards to ensure our platform remains a trusted source of information.
            </p>
            <p className="text-novabio-charcoal/70 leading-relaxed">
              By publishing on NovaBio Exchange, you agree to adhere to these guidelines and understand that you are solely responsible for the content you publish.
            </p>
          </div>

          {/* Guidelines Sections */}
          <div className="space-y-12">
            {guidelines.sections.map((section, index) => (
              <div 
                key={section.title}
                className={`transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <h2 className="font-serif text-2xl font-bold text-novabio-charcoal mb-4 flex items-center gap-3">
                  {index === 0 && <Shield className="w-6 h-6 text-novabio-amber" />}
                  {index === 1 && <FileText className="w-6 h-6 text-novabio-teal" />}
                  {index === 2 && <AlertTriangle className="w-6 h-6 text-red-500" />}
                  {index === 3 && <Users className="w-6 h-6 text-novabio-sage" />}
                  {section.title}
                </h2>
                <p className="text-novabio-charcoal/70 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className={`mt-12 p-8 rounded-xl bg-novabio-amber/5 border border-novabio-amber/20 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="font-serif text-xl font-bold text-novabio-charcoal mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5 text-novabio-amber" />
              Disclaimer
            </h2>
            <p className="text-novabio-charcoal/70 leading-relaxed">
              {guidelines.disclaimer}
            </p>
          </div>

          {/* Agreement Checklist */}
          <div className={`mt-12 p-8 rounded-xl bg-novabio-light transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h3 className="font-serif text-lg font-bold text-novabio-charcoal mb-6">
              Before Publishing, Please Confirm:
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-novabio-teal flex-shrink-0 mt-0.5" />
                <span className="text-novabio-charcoal/70">You are the author or have permission to publish this content</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-novabio-teal flex-shrink-0 mt-0.5" />
                <span className="text-novabio-charcoal/70">All information is accurate to the best of your knowledge</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-novabio-teal flex-shrink-0 mt-0.5" />
                <span className="text-novabio-charcoal/70">You understand articles are published without editorial review</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-novabio-teal flex-shrink-0 mt-0.5" />
                <span className="text-novabio-charcoal/70">You accept full responsibility for your published content</span>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className={`mt-12 text-center transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <p className="text-novabio-charcoal/60 mb-6">
              By continuing to publish on NovaBio Exchange, you acknowledge that you have read, understood, and agree to these guidelines and disclaimer.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/submit">
                <Button 
                  className="bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-full px-8 gap-2"
                >
                  Continue to Submit
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  variant="outline"
                  className="rounded-full px-8 border-novabio-deep-teal/20 hover:bg-novabio-deep-teal/5"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
