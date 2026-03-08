import { motion } from 'framer-motion';
import { Users, Calendar, CheckCircle, XCircle, Clock, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { mockVolunteerRequests, mockVolunteerApplications, mockRequests, mockClubs } from '@/data/mockData';
import { AssistanceRequest, RequestPriority, RequestStatus } from '@/types';

const priorityConfig: Record<RequestPriority, { label: string; className: string }> = {
  low: { label: 'Low', className: 'bg-muted text-muted-foreground' },
  medium: { label: 'Medium', className: 'bg-secondary text-secondary-foreground' },
  high: { label: 'High', className: 'bg-warning/20 text-warning' },
  urgent: { label: 'Urgent', className: 'bg-destructive/20 text-destructive' },
};

const statusConfig: Record<RequestStatus, { label: string; icon: any; className: string }> = {
  pending: { label: 'Pending', icon: Clock, className: 'text-warning' },
  accepted: { label: 'Accepted', icon: CheckCircle, className: 'text-success' },
  completed: { label: 'Completed', icon: CheckCircle, className: 'text-primary' },
  rejected: { label: 'Rejected', icon: XCircle, className: 'text-destructive' },
};

function AssistanceRequestCard({ request }: { request: AssistanceRequest }) {
  const StatusIcon = statusConfig[request.status].icon;
  const targetClubNames = request.targetClubs.map(id => mockClubs.find(c => c.id === id)?.name).filter(Boolean).join(', ');

  return (
    <Card variant="interactive">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={priorityConfig[request.priority].className}>{priorityConfig[request.priority].label}</Badge>
            <div className={`flex items-center gap-1 text-sm ${statusConfig[request.status].className}`}>
              <StatusIcon className="w-4 h-4" />
              <span>{statusConfig[request.status].label}</span>
            </div>
          </div>
        </div>
        <h3 className="font-display font-bold text-lg text-foreground mb-2">{request.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{request.description}</p>
        <div className="space-y-1 text-sm text-muted-foreground mb-4">
          <p><span className="font-medium">From:</span> {request.officialName} ({request.officialDepartment})</p>
          <p><span className="font-medium">Clubs:</span> {targetClubNames}</p>
          <p><span className="font-medium">Deadline:</span> {new Date(request.eventDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>
        {request.status === 'pending' && (
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="flex-1">Accept</Button>
            <Button variant="outline" size="sm" className="flex-1">Decline</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Volunteers() {
  const { user } = useAuth();
  const isCoordinator = user?.role === 'coordinator' || user?.role === 'official';

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Volunteer & Assistance Requests</h1>
        <p className="text-muted-foreground mt-1">
          {isCoordinator ? 'Manage volunteer applications and assistance requests' : 'Find volunteering opportunities'}
        </p>
      </motion.div>

      <Tabs defaultValue={isCoordinator ? 'volunteer-apps' : 'opportunities'}>
        <TabsList>
          {isCoordinator && (
            <>
              <TabsTrigger value="volunteer-apps" className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Volunteer Applications
              </TabsTrigger>
              <TabsTrigger value="assistance" className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> Assistance Requests
              </TabsTrigger>
            </>
          )}
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Opportunities
          </TabsTrigger>
        </TabsList>

        {/* Volunteer Applications Tab */}
        {isCoordinator && (
          <TabsContent value="volunteer-apps" className="space-y-4 mt-4">
            {/* Requests overview */}
            {mockVolunteerRequests.map((req) => (
              <Card key={req.id}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{req.eventTitle}</h3>
                      <p className="text-sm text-muted-foreground">by {req.clubName}</p>
                    </div>
                    <Badge className={req.status === 'open' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'}>{req.status}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span><Users className="w-4 h-4 inline mr-1" />{req.appliedCount}/{req.requiredCount} applied</span>
                    <span><Calendar className="w-4 h-4 inline mr-1" />Deadline: {new Date(req.deadline).toLocaleDateString()}</span>
                  </div>
                  <Progress value={(req.appliedCount / req.requiredCount) * 100} className="h-2 mb-4" />

                  {/* Applications for this request */}
                  <div className="space-y-3">
                    {mockVolunteerApplications.filter(a => a.requestId === req.id).map(app => (
                      <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9">
                            <AvatarImage src={app.studentAvatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-xs">{app.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm text-foreground">{app.studentName}</p>
                            <div className="flex gap-1 mt-0.5">
                              {app.skills.map(s => <Badge key={s} variant="secondary" className="text-xs py-0">{s}</Badge>)}
                            </div>
                          </div>
                        </div>
                        {app.status === 'pending' ? (
                          <div className="flex gap-2">
                            <Button size="sm" variant="default"><CheckCircle className="w-3 h-3 mr-1" />Approve</Button>
                            <Button size="sm" variant="outline"><XCircle className="w-3 h-3 mr-1" />Reject</Button>
                          </div>
                        ) : (
                          <Badge className={app.status === 'approved' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}>{app.status}</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        )}

        {/* Assistance Requests Tab */}
        {isCoordinator && (
          <TabsContent value="assistance" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockRequests.map(req => (
                <motion.div key={req.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <AssistanceRequestCard request={req} />
                </motion.div>
              ))}
            </div>
            {mockRequests.length === 0 && (
              <Card><CardContent className="py-12 text-center"><AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" /><p className="text-muted-foreground">No assistance requests.</p></CardContent></Card>
            )}
          </TabsContent>
        )}

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4 mt-4">
          {mockVolunteerRequests.filter(r => r.status === 'open').map(req => (
            <Card key={req.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">{req.eventTitle}</h3>
                    <p className="text-sm text-muted-foreground mb-3">by {req.clubName}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {req.skills.map(skill => <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>)}
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
      </Tabs>
    </div>
  );
}
