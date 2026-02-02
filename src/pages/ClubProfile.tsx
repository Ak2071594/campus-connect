import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Mail, Calendar, MessageSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventCard } from '@/components/events/EventCard';
import { mockClubs, mockEvents } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';

export default function ClubProfile() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const club = mockClubs.find((c) => c.id === id);
  const clubEvents = mockEvents.filter((e) => e.clubId === id);
  const upcomingEvents = clubEvents.filter((e) => e.isUpcoming);
  const pastEvents = clubEvents.filter((e) => !e.isUpcoming);
  
  const isCoordinator = user?.role === 'coordinator' && user?.clubId === id;

  if (!club) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Club not found.</p>
        <Link to="/clubs">
          <Button variant="outline" className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clubs
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/clubs">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clubs
        </Button>
      </Link>

      {/* Club Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-48 md:h-64 rounded-2xl overflow-hidden"
      >
        <img
          src={club.banner || club.logo}
          alt={club.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
        
        {/* Club Logo Overlay */}
        <div className="absolute bottom-4 left-6 flex items-end gap-4">
          <img
            src={club.logo}
            alt={club.name}
            className="w-20 h-20 rounded-xl border-4 border-card shadow-lg object-cover"
          />
          <div className="mb-2">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-primary-foreground">
              {club.name}
            </h1>
            <Badge className="mt-1 bg-card/90 text-foreground">{club.category}</Badge>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        {!isCoordinator && (
          <Button variant="default" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Message Club
          </Button>
        )}
        {isCoordinator && (
          <Link to="/events/create">
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Post Event
            </Button>
          </Link>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{club.description}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Events Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs defaultValue="upcoming">
              <TabsList className="mb-4">
                <TabsTrigger value="upcoming">Upcoming Events ({upcomingEvents.length})</TabsTrigger>
                <TabsTrigger value="past">Past Events ({pastEvents.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upcoming">
                {upcomingEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {upcomingEvents.map((event, index) => (
                      <EventCard key={event.id} event={event} index={index} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No upcoming events scheduled.
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="past">
                {pastEvents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pastEvents.map((event, index) => (
                      <EventCard key={event.id} event={event} index={index} />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="py-8 text-center text-muted-foreground">
                      No past events to show.
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{club.memberCount}</p>
                    <p className="text-sm text-muted-foreground">Members</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{clubEvents.length}</p>
                    <p className="text-sm text-muted-foreground">Total Events</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Coordinator Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Coordinator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {club.coordinator.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{club.coordinator.name}</p>
                    <a 
                      href={`mailto:${club.coordinator.email}`}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      <Mail className="w-3 h-3" />
                      {club.coordinator.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
