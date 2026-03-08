import { motion } from 'framer-motion';
import { Send, Inbox, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { mockCollaborations } from '@/data/mockData';

export default function Collaboration() {
  const { user } = useAuth();

  const sentInvites = mockCollaborations.filter(c => c.fromClubId === user?.clubId);
  const receivedInvites = mockCollaborations.filter(c => c.toClubId === user?.clubId);

  const statusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-destructive" />;
      default: return <Clock className="w-4 h-4 text-warning" />;
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-success/20 text-success';
      case 'rejected': return 'bg-destructive/20 text-destructive';
      default: return 'bg-warning/20 text-warning';
    }
  };

  const renderInviteCard = (invite: typeof mockCollaborations[0], type: 'sent' | 'received') => (
    <Card key={invite.id}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-12 h-12">
                <AvatarImage src={type === 'sent' ? invite.toClubLogo : invite.fromClubLogo} />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {(type === 'sent' ? invite.toClubName : invite.fromClubName).charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{invite.eventTitle}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {type === 'sent' ? `To: ${invite.toClubName}` : `From: ${invite.fromClubName}`}
              </p>
              <p className="text-sm text-muted-foreground mt-2">{invite.message}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(invite.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={statusColor(invite.status)}>
              <span className="flex items-center gap-1">{statusIcon(invite.status)} {invite.status}</span>
            </Badge>
            {type === 'received' && invite.status === 'pending' && (
              <div className="flex gap-2 mt-2">
                <Button size="sm" variant="default"><CheckCircle className="w-4 h-4 mr-1" />Accept</Button>
                <Button size="sm" variant="outline"><XCircle className="w-4 h-4 mr-1" />Decline</Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Collaboration</h1>
        <p className="text-muted-foreground mt-1">Manage club collaboration invitations</p>
      </motion.div>

      <Tabs defaultValue="received">
        <TabsList>
          <TabsTrigger value="received" className="flex items-center gap-2">
            <Inbox className="w-4 h-4" /> Received ({receivedInvites.length})
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Send className="w-4 h-4" /> Sent ({sentInvites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4 mt-4">
          {receivedInvites.length > 0 ? (
            receivedInvites.map(inv => renderInviteCard(inv, 'received'))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Inbox className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No received invitations</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4 mt-4">
          {sentInvites.length > 0 ? (
            sentInvites.map(inv => renderInviteCard(inv, 'sent'))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Send className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No sent invitations</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
