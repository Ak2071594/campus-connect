import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventCarousel } from '@/components/events/EventCarousel';
import { EventCard } from '@/components/events/EventCard';
import { ClubCard } from '@/components/clubs/ClubCard';
import { mockEvents, mockClubs } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const upcomingEvents = mockEvents.filter(e => e.isUpcoming).slice(0, 4);
  const featuredClubs = mockClubs.slice(0, 4);

  const stats = [
    { label: 'Active Clubs', value: mockClubs.length, icon: Users, color: 'text-primary' },
    { label: 'Upcoming Events', value: mockEvents.length, icon: Calendar, color: 'text-accent' },
    { label: 'Active Members', value: '2.5K+', icon: TrendingUp, color: 'text-success' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening in your campus today
          </p>
        </div>
        {(user?.role === 'coordinator' || user?.role === 'admin') && (
          <Link to="/events/create">
            <Button variant="hero" size="lg">
              Create Event
            </Button>
          </Link>
        )}
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {stats.map((stat, index) => (
          <Card key={stat.label} variant="default">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-2xl font-display font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Event Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <EventCarousel events={mockEvents} />
      </motion.div>

      {/* Upcoming Events Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Upcoming Events</h2>
            <p className="text-muted-foreground text-sm">Don't miss out on these exciting events</p>
          </div>
          <Link to="/events">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Featured Clubs Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Featured Clubs</h2>
            <p className="text-muted-foreground text-sm">Discover amazing student communities</p>
          </div>
          <Link to="/clubs">
            <Button variant="ghost" className="group">
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredClubs.map((club, index) => (
            <ClubCard key={club.id} club={club} index={index} />
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
