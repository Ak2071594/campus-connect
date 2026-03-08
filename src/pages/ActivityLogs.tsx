import { motion } from 'framer-motion';
import { Activity, Users, Calendar, Shield, UserCheck } from 'lucide-react';
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
import { mockActivityLogs } from '@/data/mockData';

export default function ActivityLogs() {
  const roleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'coordinator': return <Users className="w-4 h-4" />;
      case 'official': return <UserCheck className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const roleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-destructive/20 text-destructive';
      case 'coordinator': return 'bg-primary/20 text-primary';
      case 'official': return 'bg-accent/20 text-accent';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Activity Logs</h1>
        <p className="text-muted-foreground mt-1">System-wide activity monitoring</p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockActivityLogs.map(log => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-foreground">{log.action}</TableCell>
                  <TableCell className="text-muted-foreground">{log.actor}</TableCell>
                  <TableCell>
                    <Badge className={roleBadgeColor(log.actorRole)}>
                      <span className="flex items-center gap-1">{roleIcon(log.actorRole)} {log.actorRole}</span>
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{log.target}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
