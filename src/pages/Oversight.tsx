import { motion } from 'framer-motion';
import { Eye, Calendar, Users, Handshake, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockEvents, mockCollaborations, mockRequests } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Oversight() {
  const stats = [
    { label: 'Active Events', value: mockEvents.filter(e => e.isUpcoming).length, icon: Calendar, color: 'text-primary' },
    { label: 'Collaborations', value: mockCollaborations.length, icon: Handshake, color: 'text-accent' },
    { label: 'Active Requests', value: mockRequests.filter(r => r.status === 'pending').length, icon: FileText, color: 'text-warning' },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Oversight Panel</h1>
        <p className="text-muted-foreground mt-1">Monitor campus activities and collaborations</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map(stat => (
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
      </div>

      <Tabs defaultValue="events">
        <TabsList>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
        </TabsList>

        <TabsContent value="events">
          <Card>
            <CardHeader><CardTitle>Event Monitoring</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Club</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEvents.map(event => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium text-foreground">{event.title}</TableCell>
                      <TableCell className="text-muted-foreground">{event.clubName}</TableCell>
                      <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                      <TableCell>{event.registeredCount || 0}</TableCell>
                      <TableCell>
                        <Badge className={event.isUpcoming ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}>
                          {event.isUpcoming ? 'Upcoming' : 'Past'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaborations">
          <Card>
            <CardHeader><CardTitle>Collaboration Tracking</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCollaborations.map(collab => (
                    <TableRow key={collab.id}>
                      <TableCell className="font-medium text-foreground">{collab.eventTitle}</TableCell>
                      <TableCell className="text-muted-foreground">{collab.fromClubName}</TableCell>
                      <TableCell className="text-muted-foreground">{collab.toClubName}</TableCell>
                      <TableCell>
                        <Badge className={
                          collab.status === 'accepted' ? 'bg-success/20 text-success' :
                          collab.status === 'rejected' ? 'bg-destructive/20 text-destructive' :
                          'bg-warning/20 text-warning'
                        }>
                          {collab.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(collab.createdAt).toLocaleDateString()}</TableCell>
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
