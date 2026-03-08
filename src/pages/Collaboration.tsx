import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Inbox, CheckCircle, XCircle, Clock, Filter, Search, Handshake, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { mockCollaborations, mockClubs } from '@/data/mockData';

export default function Collaboration() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState('all');
  const [clubFilter, setClubFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterInvites = (invites: typeof mockCollaborations) => {
    return invites.filter(c => {
      if (statusFilter !== 'all' && c.status !== statusFilter) return false;
      if (clubFilter !== 'all') {
        if (c.fromClubId !== clubFilter && c.toClubId !== clubFilter) return false;
      }
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!c.eventTitle.toLowerCase().includes(q) && !c.fromClubName.toLowerCase().includes(q) && !c.toClubName.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  };

  const sentInvites = filterInvites(mockCollaborations.filter(c => c.fromClubId === user?.clubId));
  const receivedInvites = filterInvites(mockCollaborations.filter(c => c.toClubId === user?.clubId));
  const activeCollabs = filterInvites(mockCollaborations.filter(c => c.status === 'accepted'));

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
      case 'completed': return 'bg-primary/20 text-primary';
      default: return 'bg-warning/20 text-warning';
    }
  };

  const renderInviteCard = (invite: typeof mockCollaborations[0], type: 'sent' | 'received' | 'active') => (
    <Card key={invite.id} variant="interactive">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={type === 'sent' ? invite.toClubLogo : invite.fromClubLogo} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {(type === 'sent' ? invite.toClubName : invite.fromClubName).charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">{invite.eventTitle}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {type === 'sent' ? `To: ${invite.toClubName}` : type === 'received' ? `From: ${invite.fromClubName}` : `${invite.fromClubName} ↔ ${invite.toClubName}`}
              </p>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{invite.message}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {new Date(invite.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={statusColor(invite.status)}>
              <span className="flex items-center gap-1">{statusIcon(invite.status)} {invite.status}</span>
            </Badge>
            <div className="flex gap-2 mt-2">
              {type === 'received' && invite.status === 'pending' && (
                <>
                  <Button size="sm" variant="default"><CheckCircle className="w-4 h-4 mr-1" />Accept</Button>
                  <Button size="sm" variant="outline"><XCircle className="w-4 h-4 mr-1" />Reject</Button>
                </>
              )}
              <Button size="sm" variant="ghost"><Eye className="w-4 h-4 mr-1" />Details</Button>
            </div>
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by event or club..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="accepted">Accepted</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={clubFilter} onValueChange={setClubFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Clubs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Clubs</SelectItem>
            {mockClubs.map(c => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="received">
        <TabsList>
          <TabsTrigger value="received" className="flex items-center gap-2">
            <Inbox className="w-4 h-4" /> Received ({receivedInvites.length})
          </TabsTrigger>
          <TabsTrigger value="sent" className="flex items-center gap-2">
            <Send className="w-4 h-4" /> Sent ({sentInvites.length})
          </TabsTrigger>
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Handshake className="w-4 h-4" /> Active ({activeCollabs.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received" className="space-y-4 mt-4">
          {receivedInvites.length > 0 ? receivedInvites.map(inv => renderInviteCard(inv, 'received')) : (
            <Card><CardContent className="p-8 text-center"><Inbox className="w-12 h-12 mx-auto text-muted-foreground mb-3" /><p className="text-muted-foreground">No received invitations</p></CardContent></Card>
          )}
        </TabsContent>

        <TabsContent value="sent" className="space-y-4 mt-4">
          {sentInvites.length > 0 ? sentInvites.map(inv => renderInviteCard(inv, 'sent')) : (
            <Card><CardContent className="p-8 text-center"><Send className="w-12 h-12 mx-auto text-muted-foreground mb-3" /><p className="text-muted-foreground">No sent invitations</p></CardContent></Card>
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4 mt-4">
          {activeCollabs.length > 0 ? activeCollabs.map(inv => renderInviteCard(inv, 'active')) : (
            <Card><CardContent className="p-8 text-center"><Handshake className="w-12 h-12 mx-auto text-muted-foreground mb-3" /><p className="text-muted-foreground">No active collaborations</p></CardContent></Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
