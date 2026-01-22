import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin, Clock, Users, Video } from 'lucide-react';
import { events } from '@/data/content';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Events() {
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

  const upcomingEvents = events.filter(event => new Date(event.date) >= new Date()).slice(0, 3);

  return (
    <section 
      ref={sectionRef}
      id="events"
      className="section-padding bg-novabio-light"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div>
            <span className="text-novabio-terracotta font-medium text-sm uppercase tracking-wider">
              Upcoming Events
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-novabio-charcoal mt-2">
              Events & Webinars
            </h2>
          </div>
          <Link 
            to="/events"
            className="group inline-flex items-center gap-2 text-novabio-deep-teal font-medium hover:text-novabio-teal transition-colors"
          >
            View all events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event, index) => {
            const eventDate = new Date(event.date);
            const isUpcoming = eventDate >= new Date();
            
            return (
              <div 
                key={event.id}
                className={`group transition-all duration-700 ease-fluid ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
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
                      className={`w-full rounded-xl gap-2 ${
                        isUpcoming 
                          ? 'bg-novabio-deep-teal hover:bg-novabio-teal text-white' 
                          : 'bg-novabio-sage/20 text-novabio-charcoal/60 cursor-not-allowed'
                      }`}
                      disabled={!isUpcoming}
                      asChild={isUpcoming}
                    >
                      {isUpcoming ? (
                        <a href={event.link} target="_blank" rel="noopener noreferrer">
                          Register Now
                          <ArrowRight className="w-4 h-4" />
                        </a>
                      ) : (
                        <>Event Ended</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
