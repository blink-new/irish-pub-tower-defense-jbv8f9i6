import React, { useState, useEffect, useCallback } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Trophy, Star, Crown, Medal, Award } from 'lucide-react';
import { fetchTopScores } from '../utils/scoreManager';

interface ScoreEntry {
  id: string;
  userEmail?: string;
  user_email?: string;
  score: number;
  waveReached?: number;
  wave_reached?: number;
  starsEarned?: number;
  stars_earned?: number;
  worldId?: string;
  world_id?: string;
  createdAt?: string;
  created_at?: string;
}

interface LeaderboardProps {
  isVisible: boolean;
  onClose: () => void;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ isVisible, onClose }) => {
  const [scores, setScores] = useState<ScoreEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedWorld, setSelectedWorld] = useState<string>('irish-countryside');

  const fetchScores = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchTopScores(selectedWorld === 'all' ? undefined : selectedWorld, 50);
      setScores(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedWorld]);

  useEffect(() => {
    if (isVisible) {
      fetchScores();
    }
  }, [isVisible, fetchScores]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-card hover:bg-card/80';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getWorldName = (worldId: string) => {
    const worldNames: { [key: string]: string } = {
      'irish-countryside': 'Irish Countryside',
      'city-pub': 'City Pub',
      'all': 'All Worlds'
    };
    return worldNames[worldId] || worldId;
  };

  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-celtic text-accent flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            Pub Champions Leaderboard
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* World Filter */}
          <div className="flex gap-2 flex-wrap">
            {['all', 'irish-countryside', 'city-pub'].map((world) => (
              <Button
                key={world}
                onClick={() => setSelectedWorld(world)}
                variant={selectedWorld === world ? 'default' : 'outline'}
                size="sm"
                className="font-celtic"
              >
                {getWorldName(world)}
              </Button>
            ))}
          </div>

          {/* Leaderboard */}
          <div className="overflow-y-auto max-h-96 space-y-2">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
                <p className="text-muted-foreground mt-2">Loading champions...</p>
              </div>
            ) : scores.length === 0 ? (
              <div className="text-center py-8">
                <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No scores yet. Be the first champion!</p>
              </div>
            ) : (
              scores.map((score, index) => {
                const rank = index + 1;
                return (
                  <div
                    key={score.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${getRankColor(rank)} ${
                      rank <= 3 ? 'border-accent shadow-lg' : 'border-muted'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getRankIcon(rank)}
                          <span className={`font-bold text-lg ${rank <= 3 ? 'text-white' : 'text-foreground'}`}>
                            #{rank}
                          </span>
                        </div>
                        
                        <div>
                          <p className={`font-semibold ${rank <= 3 ? 'text-white' : 'text-foreground'}`}>
                            {(score.userEmail || score.user_email)?.split('@')[0] || 'Anonymous'}
                          </p>
                          <p className={`text-sm ${rank <= 3 ? 'text-white/80' : 'text-muted-foreground'}`}>
                            {getWorldName(score.worldId || score.world_id || 'unknown')} • {formatDate(score.createdAt || score.created_at || new Date().toISOString())}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${rank <= 3 ? 'text-white' : 'text-foreground'} flex items-center gap-2`}>
                            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            {score.starsEarned || score.stars_earned || score.score || 0}
                          </div>
                          <div className={`text-sm ${rank <= 3 ? 'text-white/80' : 'text-muted-foreground'}`}>
                            Wave {score.waveReached || score.wave_reached || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              Showing top {scores.length} champions
            </p>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};