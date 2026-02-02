import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Club } from '@/types';

interface ClubCardProps {
  club: Club;
  index?: number;
}

export function ClubCard({ club, index = 0 }: ClubCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card variant="interactive" className="h-full">
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            {/* Club Logo */}
            <div className="flex-shrink-0">
              <img
                src={club.logo}
                alt={club.name}
                className="w-16 h-16 rounded-xl object-cover shadow-md"
              />
            </div>

            {/* Club Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-display font-bold text-foreground line-clamp-1">
                  {club.name}
                </h3>
                <Badge variant="secondary" className="flex-shrink-0 text-xs">
                  {club.category}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                {club.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3.5 h-3.5" />
                  <span>{club.memberCount} members</span>
                </div>
                
                <Link to={`/clubs/${club.id}`}>
                  <Button variant="ghost" size="sm" className="h-8 group">
                    View Club
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
