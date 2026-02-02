import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockEvents, mockClubs } from '@/data/mockData';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  
  const event = mockEvents.find((e) => e.id === id);
  const club = event ? mockClubs.find((c) => c.id === event.clubId) : null;

  if (!event) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Event not found.</p>
        <Link to="/events">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link to="/events">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Events
        </Button>
      </Link>

      {/* Event Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-64 md:h-96 rounded-2xl overflow-hidden"
      >
        <img
          src={event.banner}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
        
        <div className="absolute bottom-6 left-6 right-6">
          <Badge className="mb-3 bg-card/90 text-foreground">
            {event.isUpcoming ? 'Upcoming' : 'Past Event'}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">
            {event.title}
          </h1>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">About This Event</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {/* Event Details Card */}
          <Card>
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-semibold text-foreground">
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-semibold text-foreground">{event.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Venue</p>
                  <p className="font-semibold text-foreground">{event.venue}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organizing Club Card */}
          <Card>
            <CardContent className="p-5">
              <p className="text-sm text-muted-foreground mb-3">Organized by</p>
              <Link to={`/clubs/${event.clubId}`} className="flex items-center gap-3 group">
                <img
                  src={event.clubLogo}
                  alt={event.clubName}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {event.clubName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {club?.memberCount} members
                  </p>
                </div>
              </Link>
            </CardContent>
          </Card>

          {event.isUpcoming && (
            <Button variant="hero" size="lg" className="w-full">
              Register for Event
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
