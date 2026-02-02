import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Calendar, FileText, CheckCircle, XCircle, AlertCircle, Search, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { mockClubs, mockEvents, mockRequests } from '@/data/mockData';
import { Link } from 'react-router-dom';

export default function Admin() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const pendingClubs = mockClubs.filter((c) => !c.isApproved);
  const approvedClubs = mockClubs.filter((c) => c.isApproved);

  const stats = [
    { label: 'Total Clubs', value: mockClubs.length, icon: Users, color: 'text-primary' },
    { label: 'Total Events', value: mockEvents.length, icon: Calendar, color: 'text-accent' },
    { label: 'Active Requests', value: mockRequests.filter((r) => r.status === 'pending').length, icon: FileText, color: 'text-warning' },
  ];

  // Only admin can access
  if (user?.role !== 'admin') {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-display font-bold text-foreground mb-2">Access Denied</h2>
        <p className="text-muted-foreground">You don't have permission to access the admin dashboard.</p>
        <Link to="/">
          <Button variant="outline" className="mt-4">Go to Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-display font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage clubs, events, and system settings</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
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

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search clubs, events, or requests..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="clubs">
        <TabsList className="mb-4">
          <TabsTrigger value="clubs">Clubs ({mockClubs.length})</TabsTrigger>
          <TabsTrigger value="events">Events ({mockEvents.length})</TabsTrigger>
          <TabsTrigger value="requests">Requests ({mockRequests.length})</TabsTrigger>
        </TabsList>

        {/* Clubs Tab */}
        <TabsContent value="clubs">
          <Card>
            <CardHeader>
              <CardTitle>Club Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Club</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Members</TableHead>
                    <TableHead>Coordinator</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockClubs.map((club) => (
                    <TableRow key={club.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <img src={club.logo} alt={club.name} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-medium text-foreground">{club.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{club.category}</Badge>
                      </TableCell>
                      <TableCell>{club.memberCount}</TableCell>
                      <TableCell className="text-muted-foreground">{club.coordinator.name}</TableCell>
                      <TableCell>
                        {club.isApproved ? (
                          <Badge className="bg-success/20 text-success">Approved</Badge>
                        ) : (
                          <Badge className="bg-warning/20 text-warning">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Link to={`/clubs/${club.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          {!club.isApproved && (
                            <>
                              <Button variant="default" size="sm">
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <XCircle className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events Tab */}
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Venue</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium text-foreground">{event.title}</TableCell>
                      <TableCell className="text-muted-foreground">{event.clubName}</TableCell>
                      <TableCell>
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </TableCell>
                      <TableCell className="text-muted-foreground">{event.venue}</TableCell>
                      <TableCell>
                        {event.isUpcoming ? (
                          <Badge className="bg-success/20 text-success">Upcoming</Badge>
                        ) : (
                          <Badge variant="secondary">Past</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`/events/${event.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Requests Tab */}
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Request Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Official</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium text-foreground">{request.title}</TableCell>
                      <TableCell className="text-muted-foreground">{request.officialName}</TableCell>
                      <TableCell>
                        {new Date(request.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          request.priority === 'urgent' ? 'bg-destructive/20 text-destructive' :
                          request.priority === 'high' ? 'bg-warning/20 text-warning' :
                          'bg-secondary text-secondary-foreground'
                        }>
                          {request.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          request.status === 'completed' ? 'bg-success/20 text-success' :
                          request.status === 'accepted' ? 'bg-primary/20 text-primary' :
                          request.status === 'rejected' ? 'bg-destructive/20 text-destructive' :
                          'bg-warning/20 text-warning'
                        }>
                          {request.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
