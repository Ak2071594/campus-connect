import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Users, TrendingUp, Handshake, Trophy, FileText, Shield, Activity, Eye, Bell, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventCarousel } from '@/components/events/EventCarousel';
import { EventCard } from '@/components/events/EventCard';
import { ClubCard } from '@/components/clubs/ClubCard';
import { Badge } from '@/components/ui/badge';
import { mockEvents, mockClubs, mockCollaborations, mockRequests, mockVolunteerRequests } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const upcomingEvents = mockEvents.filter(e => e.isUpcoming).slice(0, 4);
  const featuredClubs = mockClubs.slice(0, 4);

  const stats = [
    { label: 'Active Clubs', value: mockClubs.length, icon: Users, color: 'text-primary' },
    { label: 'Upcoming Events', value: mockEvents.filter(e => e.isUpcoming).length, icon: Calendar, color: 'text-accent' },
    { label: 'Active Collaborations', value: mockCollaborations.filter(c => c.status === 'accepted').length, icon: Handshake, color: 'text-success' },
  ];

  // Role-specific quick actions
  const quickActions = (() => {
    switch (user?.role) {
      case 'student':
        return [
          { label: 'Browse Events', href: '/events', icon: Calendar, desc: 'Find and register for events' },
          { label: 'View Results', href: '/results', icon: Trophy, desc: 'Check event leaderboards' },
          { label: 'Explore Clubs', href: '/clubs', icon: Users, desc: 'Discover student clubs' },
        ];
      case 'coordinator':
        return [
          { label: 'Create Event', href: '/events/create', icon: Calendar, desc: 'Organize a new event' },
          { label: 'Collaborations', href: '/collaboration', icon: Handshake, desc: `${mockCollaborations.filter(c => c.status === 'pending').length} pending` },
          { label: 'Volunteers', href: '/volunteers', icon: Users, desc: `${mockVolunteerRequests.filter(r => r.status === 'open').length} open requests` },
          { label: 'Publish Results', href: '/results', icon: Trophy, desc: 'Upload event results' },
        ];
      case 'official':
        return [
          { label: 'Oversight', href: '/oversight', icon: Eye, desc: 'Monitor club activities' },
          { label: 'New Request', href: '/requests/create', icon: FileText, desc: 'Request club assistance' },
          { label: 'Collaborations', href: '/collaboration', icon: Handshake, desc: 'View collaboration status' },
        ];
      case 'admin':
        return [
          { label: 'Approvals', href: '/admin', icon: Shield, desc: 'Review pending approvals' },
          { label: 'Activity Logs', href: '/activity-logs', icon: Activity, desc: 'Monitor system activity' },
          { label: 'All Events', href: '/events', icon: Calendar, desc: 'View all campus events' },
        ];
      default:
        return [];
    }
  })();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">Here's what's happening in your campus today</p>
        </div>
        <Badge variant="outline" className="capitalize text-sm px-3 py-1">{user?.role === 'official' ? 'Teacher' : user?.role}</Badge>
      </motion.div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
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

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <h2 className="text-xl font-display font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(action => (
            <Link key={action.href} to={action.href}>
              <Card variant="interactive" className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <action.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{action.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{action.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Event Carousel */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <EventCarousel events={mockEvents} />
      </motion.div>

      {/* Upcoming Events */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Upcoming Events</h2>
            <p className="text-muted-foreground text-sm">Don't miss out on these exciting events</p>
          </div>
          <Link to="/events">
            <Button variant="ghost" className="group">
              View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {upcomingEvents.map((event, index) => (
            <EventCard key={event.id} event={event} index={index} />
          ))}
        </div>
      </motion.section>

      {/* Featured Clubs */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Featured Clubs</h2>
            <p className="text-muted-foreground text-sm">Discover amazing student communities</p>
          </div>
          <Link to="/clubs">
            <Button variant="ghost" className="group">
              View All <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
