import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { mockRequests, mockClubs } from '@/data/mockData';
import { AssistanceRequest, RequestStatus, RequestPriority } from '@/types';
import { Link } from 'react-router-dom';

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

function RequestCard({ request }: { request: AssistanceRequest }) {
  const { user } = useAuth();
  const isClubView = user?.role === 'coordinator';
  const StatusIcon = statusConfig[request.status].icon;

  const targetClubNames = request.targetClubs
    .map((id) => mockClubs.find((c) => c.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  return (
    <Card variant="interactive">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge className={priorityConfig[request.priority].className}>
              {priorityConfig[request.priority].label}
            </Badge>
            <div className={`flex items-center gap-1 text-sm ${statusConfig[request.status].className}`}>
              <StatusIcon className="w-4 h-4" />
              <span>{statusConfig[request.status].label}</span>
            </div>
          </div>
        </div>

        <h3 className="font-display font-bold text-lg text-foreground mb-2">
          {request.title}
        </h3>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {request.description}
        </p>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <p>
            <span className="font-medium">From:</span> {request.officialName} ({request.officialDepartment})
          </p>
          <p>
            <span className="font-medium">Event Date:</span>{' '}
            {new Date(request.eventDate).toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          {!isClubView && (
            <p>
              <span className="font-medium">Target Clubs:</span> {targetClubNames}
            </p>
          )}
        </div>

        {isClubView && request.status === 'pending' && (
          <div className="flex gap-2">
            <Button variant="default" size="sm" className="flex-1">
              Accept
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Decline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Requests() {
  const { user } = useAuth();
  const isOfficial = user?.role === 'official';
  const isCoordinator = user?.role === 'coordinator';

  const pendingRequests = mockRequests.filter((r) => r.status === 'pending');
  const acceptedRequests = mockRequests.filter((r) => r.status === 'accepted');
  const completedRequests = mockRequests.filter((r) => r.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Assistance Requests</h1>
          <p className="text-muted-foreground mt-1">
            {isOfficial ? 'Manage your requests to student clubs' : 'View and respond to official requests'}
          </p>
        </div>
        {isOfficial && (
          <Link to="/requests/create">
            <Button variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </Link>
        )}
      </motion.div>

      {/* Tabs */}
      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Accepted ({acceptedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Completed ({completedRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <RequestCard request={request} />
              </motion.div>
            ))}
          </div>
          {pendingRequests.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No pending requests.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="accepted">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {acceptedRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
          {acceptedRequests.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No accepted requests.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {completedRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
          {completedRequests.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No completed requests.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
