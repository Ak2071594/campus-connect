import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Event } from '@/types';

interface EventCardProps {
  event: Event;
  index?: number;
}

export function EventCard({ event, index = 0 }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card variant="interactive" className="overflow-hidden h-full">
        {/* Event Banner */}
        <div className="relative h-40 overflow-hidden">
          <img
            src={event.banner}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          
          {/* Club Badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-full py-1 px-3">
            <img
              src={event.clubLogo}
              alt={event.clubName}
              className="w-5 h-5 rounded-full"
            />
            <span className="text-xs font-medium text-foreground">{event.clubName}</span>
          </div>
        </div>

        <CardContent className="p-4">
          <h3 className="font-display font-bold text-lg text-foreground mb-2 line-clamp-2">
            {event.title}
          </h3>
          
          <div className="space-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'short',
                  month: 'short', 
                  day: 'numeric' 
                })} • {event.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>

          <Link to={`/events/${event.id}`}>
            <Button variant="outline" size="sm" className="w-full group">
              View Details
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
