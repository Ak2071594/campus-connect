import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockResults } from '@/data/mockData';

export default function Results() {
  const positionIcon = (pos: number) => {
    switch (pos) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-700" />;
      default: return <span className="w-5 h-5 text-center text-sm font-bold text-muted-foreground">#{pos}</span>;
    }
  };

  const positionBg = (pos: number) => {
    switch (pos) {
      case 1: return 'bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-500/20';
      case 2: return 'bg-gray-50 dark:bg-gray-500/10 border-gray-200 dark:border-gray-500/20';
      case 3: return 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20';
      default: return 'bg-muted border-border';
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-display font-bold text-foreground">Event Results</h1>
        <p className="text-muted-foreground mt-1">View results and leaderboards from past events</p>
      </motion.div>

      <div className="space-y-6">
        {mockResults.map((result) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{result.eventTitle}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Organized by {result.clubName} • Published {new Date(result.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant="secondary"><Trophy className="w-3 h-3 mr-1" />Results</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.winners.map((winner) => (
                    <div
                      key={winner.position}
                      className={`flex items-center justify-between p-4 rounded-xl border ${positionBg(winner.position)}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-card border">
                          {positionIcon(winner.position)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{winner.name}</p>
                          <p className="text-sm text-muted-foreground">{winner.department}</p>
                        </div>
                      </div>
                      {winner.prize && (
                        <Badge variant="outline" className="text-sm">{winner.prize}</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
