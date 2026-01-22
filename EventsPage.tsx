import { useState, useRef, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, Video, ArrowRight } from 'lucide-react';
import { events } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type EventType = 'all' | 'conference' | 'webinar' | 'workshop';

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState<EventType>('all');
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

  // Filter events
  const filteredEvents = events.filter(event => {
    if (selectedType === 'all') return true;
    return event.category.toLowerCase() === selectedType;
  });

  // Separate upcoming and past events
  const now = new Date();
  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= now);
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < now);

  return (
    <div className="min-h-screen bg-novabio-light pt-24 pb-16">
      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-novabio-terracotta font-medium text-sm uppercase tracking-wider">
            Connect & Learn
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-novabio-charcoal mt-3 mb-4">
            Events & Webinars
          </h1>
          <p className="text-lg text-novabio-charcoal/60 max-w-2xl mx-auto">
            Join industry experts, researchers, and innovators at our events covering the latest in biotechnology and healthcare.
          </p>
        </div>

        {/* Filter */}
        <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedType('all')}
            className={`rounded-full ${selectedType === 'all' ? 'bg-novabio-deep-teal' : 'border-novabio-deep-teal/20'}`}
          >
            All Events
          </Button>
          <Button
            variant={selectedType === 'conference' ? 'default' : 'outline'}
            onClick={() => setSelectedType('conference')}
            className={`rounded-full ${selectedType === 'conference' ? 'bg-novabio-deep-teal' : 'border-novabio-deep-teal/20'}`}
          >
            Conferences
          </Button>
          <Button
            variant={selectedType === 'webinar' ? 'default' : 'outline'}
            onClick={() => setSelectedType('webinar')}
            className={`rounded-full ${selectedType === 'webinar' ? 'bg-novabio-deep-teal' : 'border-novabio-deep-teal/20'}`}
          >
            Webinars
          </Button>
          <Button
            variant={selectedType === 'workshop' ? 'default' : 'outline'}
            onClick={() => setSelectedType('workshop')}
            className={`rounded-full ${selectedType === 'workshop' ? 'bg-novabio-deep-teal' : 'border-novabio-deep-teal/20'}`}
          >
            Workshops
          </Button>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-novabio-charcoal mb-8">
              Upcoming Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event, index) => {
                const eventDate = new Date(event.date);
                
                return (
                  <div 
                    key={event.id}
                    className={`group transition-all duration-700 ease-fluid ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${(index % 6) * 100}ms` }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-fluid card-hover border border-transparent hover:border-novabio-teal/20">
                      {/* Image */}
                      <div className="relative aspect-[3/2] overflow-hidden img-zoom">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-novabio-deep-teal/60 to-transparent" />
                        
                        {/* Category Badge */}
                        <Badge 
                          className={`absolute top-4 left-4 ${
                            event.isOnline 
                              ? 'bg-novabio-teal text-white hover:bg-novabio-teal' 
                              : 'bg-novabio-amber text-white hover:bg-novabio-amber'
                          }`}
                        >
                          {event.isOnline ? (
                            <Video className="w-3 h-3 mr-1" />
                          ) : (
                            <MapPin className="w-3 h-3 mr-1" />
                          )}
                          {event.category}
                        </Badge>

                        {/* Date Badge */}
                        <div className="absolute bottom-4 right-4 bg-white rounded-xl px-4 py-2 shadow-lg text-center min-w-[80px]">
                          <p className="text-2xl font-bold text-novabio-deep-teal">
                            {eventDate.getDate()}
                          </p>
                          <p className="text-xs text-novabio-charcoal/60 uppercase">
                            {eventDate.toLocaleDateString('en-US', { month: 'short' })}
                          </p>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Date & Time */}
                        <div className="flex flex-wrap gap-4 text-sm text-novabio-charcoal/60 mb-4">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {eventDate.toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-xl font-bold text-novabio-charcoal mb-3 line-clamp-2 group-hover:text-novabio-deep-teal transition-colors">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-novabio-charcoal/60 text-sm mb-4 line-clamp-3">
                          {event.description}
                        </p>

                        {/* Speakers */}
                        {event.speakers.length > 0 && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2 text-sm text-novabio-charcoal/60 mb-2">
                              <Users className="w-4 h-4" />
                              <span>Speakers</span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {event.speakers.map((speaker, idx) => (
                                <span 
                                  key={idx}
                                  className="text-xs px-2 py-1 rounded-full bg-novabio-light text-novabio-charcoal/70"
                                >
                                  {speaker.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-novabio-charcoal/60 mb-4">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>

                        {/* CTA */}
                        <Button 
                          className="w-full rounded-xl gap-2 bg-novabio-deep-teal hover:bg-novabio-teal text-white"
                          asChild
                        >
                          <a href={event.link} target="_blank" rel="noopener noreferrer">
                            Register Now
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl font-bold text-novabio-charcoal mb-8">
              Past Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event, index) => {
                const eventDate = new Date(event.date);
                
                return (
                  <div 
                    key={event.id}
                    className={`group transition-all duration-700 ease-fluid ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                    style={{ transitionDelay: `${(index % 6) * 100}ms` }}
                  >
                    <div className="bg-white/50 rounded-2xl overflow-hidden border border-novabio-deep-teal/10 opacity-70">
                      {/* Image */}
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover grayscale"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-novabio-deep-teal/60 to-transparent" />
                        
                        {/* Past Event Badge */}
                        <Badge className="absolute top-4 left-4 bg-novabio-sage text-white">
                          Completed
                        </Badge>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-sm text-novabio-charcoal/50 mb-3">
                          <Calendar className="w-4 h-4" />
                          {eventDate.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-lg font-bold text-novabio-charcoal mb-3 line-clamp-2">
                          {event.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-novabio-charcoal/50">
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-novabio-charcoal mb-2">No events found</h3>
            <p className="text-novabio-charcoal/60">
              Try adjusting your filters to see more events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
