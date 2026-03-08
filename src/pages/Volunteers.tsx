import { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, Users, Calendar, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { mockVolunteerRequests, mockVolunteerApplications } from '@/data/mockData';

export default function Volunteers() {
  const { user } = useAuth();
  const isCoordinator = user?.role === 'coordinator' || user?.role === 'official';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Volunteer Management</h1>
        <p className="text-muted-foreground mt-1">
          {isCoordinator ? 'Manage volunteer requests and applications' : 'Find volunteering opportunities'}
        </p>
      </motion.div>

      <Tabs defaultValue={isCoordinator ? 'requests' : 'opportunities'}>
        <TabsList>
          {isCoordinator && <TabsTrigger value="requests">My Requests</TabsTrigger>}
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          {isCoordinator && <TabsTrigger value="applications">Applications</TabsTrigger>}
        </TabsList>

        {isCoordinator && (
          <TabsContent value="requests" className="space-y-4">
            {mockVolunteerRequests.map((req) => (
              <Card key={req.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{req.eventTitle}</h3>
                        <Badge className={req.status === 'open' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}>
                          {req.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">by {req.clubName}</p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {req.skills.map(skill => (
                          <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {req.appliedCount}/{req.requiredCount} applied</span>
                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Deadline: {new Date(req.deadline).toLocaleDateString()}</span>
                      </div>
                      <Progress value={(req.appliedCount / req.requiredCount) * 100} className="mt-3 h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        )}

        <TabsContent value="opportunities" className="space-y-4">
          {mockVolunteerRequests.filter(r => r.status === 'open').map((req) => (
            <Card key={req.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{req.eventTitle}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {req.clubName}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {req.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span><Users className="w-4 h-4 inline mr-1" />{req.requiredCount - req.appliedCount} spots left</span>
                      <span><Calendar className="w-4 h-4 inline mr-1" />Deadline: {new Date(req.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button variant="hero" size="sm">Apply Now</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {isCoordinator && (
          <TabsContent value="applications" className="space-y-4">
            {mockVolunteerApplications.map((app) => (
              <Card key={app.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={app.studentAvatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{app.studentName.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-foreground">{app.studentName}</p>
                        <div className="flex gap-1 mt-1">
                          {app.skills.map(s => (
                            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {app.status === 'pending' ? (
                        <>
                          <Button size="sm" variant="default"><CheckCircle className="w-4 h-4 mr-1" />Approve</Button>
                          <Button size="sm" variant="outline"><XCircle className="w-4 h-4 mr-1" />Reject</Button>
                        </>
                      ) : (
                        <Badge className={app.status === 'approved' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}>
                          {app.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
