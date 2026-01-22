import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Users, BookOpen, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const values = [
  {
    icon: Globe,
    title: 'Open Access',
    description: 'We believe knowledge should be freely accessible to everyone in the healthcare community, accelerating innovation and discovery.'
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'By connecting researchers, professionals, and innovators, we foster cross-disciplinary collaboration that drives breakthrough solutions.'
  },
  {
    icon: BookOpen,
    title: 'Knowledge Sharing',
    description: 'Our platform enables instant publishing without barriers, allowing experts to share insights as they happen.'
  },
  {
    icon: Award,
    title: 'Quality Content',
    description: 'While we enable open publishing, we maintain high standards through community guidelines and clear author attribution.'
  }
];

const stats = [
  { value: '500+', label: 'Articles Published' },
  { value: '150+', label: 'Expert Contributors' },
  { value: '50K+', label: 'Monthly Readers' },
  { value: '25+', label: 'Countries Reached' }
];

export default function AboutPage() {
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
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-novabio-amber font-medium text-sm uppercase tracking-wider">
            About Us
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-novabio-charcoal mt-3 mb-6">
            About NovaBio Exchange
          </h1>
          <p className="text-xl text-novabio-charcoal/60 max-w-3xl mx-auto leading-relaxed">
            NovaBio Exchange is an open publishing platform dedicated to biotechnology, MedTech, digital health, and healthcare innovation. We believe in the power of open access to accelerate scientific progress and connect innovators worldwide.
          </p>
        </div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <p className="text-3xl font-bold text-novabio-deep-teal mb-2">{stat.value}</p>
              <p className="text-sm text-novabio-charcoal/60">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className={`grid lg:grid-cols-2 gap-12 items-center mb-20 transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-novabio-charcoal mb-6">
              Our Mission
            </h2>
            <p className="text-novabio-charcoal/70 leading-relaxed mb-4">
              Our mission is to democratize access to healthcare knowledge by providing a platform where experts can share insights instantly, without traditional publishing barriers. We aim to accelerate innovation by connecting researchers, professionals, and entrepreneurs across the biotechnology ecosystem.
            </p>
            <p className="text-novabio-charcoal/70 leading-relaxed mb-6">
              Unlike traditional academic journals or corporate publications, NovaBio Exchange operates on an open publishing model. This means authors can publish their work immediately, reaching a global audience of 50,000+ healthcare professionals, researchers, and innovators.
            </p>
            <Link to="/guidelines">
              <Button className="bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-full px-8 gap-2">
                Publishing Guidelines
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-novabio-teal/10 to-novabio-amber/10 rounded-[2rem] blur-2xl" />
            <img
              src="/about-lab.jpg"
              alt="Scientists collaborating"
              className="relative rounded-2xl shadow-xl w-full"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className={`font-serif text-3xl sm:text-4xl font-bold text-novabio-charcoal text-center mb-12 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-novabio-teal/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-novabio-teal" />
                </div>
                <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-3">
                  {value.title}
                </h3>
                <p className="text-novabio-charcoal/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-8 sm:p-12 mb-20">
          <h2 className={`font-serif text-3xl sm:text-4xl font-bold text-novabio-charcoal text-center mb-12 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            How NovaBio Exchange Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-novabio-teal/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-novabio-teal">1</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-3">
                Join as Contributor
              </h3>
              <p className="text-novabio-charcoal/60 text-sm">
                Create your profile and become part of our expert community. Registration is free and takes just minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-novabio-amber/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-novabio-amber">2</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-3">
                Publish Instantly
              </h3>
              <p className="text-novabio-charcoal/60 text-sm">
                Write and publish articles directly to our platform. No editorial delays or approval processes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-novabio-terracotta/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-novabio-terracotta">3</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-3">
                Reach Your Audience
              </h3>
              <p className="text-novabio-charcoal/60 text-sm">
                Your articles reach 50,000+ healthcare professionals, researchers, and innovators worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-novabio-charcoal mb-4">
            Ready to share your expertise?
          </h2>
          <p className="text-novabio-charcoal/60 mb-8 max-w-xl mx-auto">
            Join our community of contributors and start publishing your insights today. 
            Help shape the future of healthcare through open knowledge sharing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button 
                size="lg"
                className="bg-novabio-deep-teal hover:bg-novabio-teal text-white rounded-full px-8 gap-2"
              >
                Join as Contributor
                <TrendingUp className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/guidelines">
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full px-8 border-novabio-deep-teal/20 hover:bg-novabio-deep-teal/5"
              >
                Read Guidelines
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
