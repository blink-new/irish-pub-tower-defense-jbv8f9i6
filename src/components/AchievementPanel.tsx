import React, { useState } from 'react';
import { Achievement, AchievementProgress } from '../types/achievements';
import { ACHIEVEMENTS } from '../data/achievements';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { X, Trophy } from 'lucide-react';

interface AchievementPanelProps {
  progress: AchievementProgress;
  onClose: () => void;
}

export const AchievementPanel: React.FC<AchievementPanelProps> = ({
  progress,
  onClose
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-500';
      case 'rare': return 'bg-blue-500';
      case 'epic': return 'bg-purple-500';
      case 'legendary': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-400';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-400';
      case 'legendary': return 'border-yellow-400';
      default: return 'border-gray-400';
    }
  };

  const filteredAchievements = ACHIEVEMENTS.filter(achievement => 
    selectedCategory === 'all' || achievement.category === selectedCategory
  );

  const unlockedCount = ACHIEVEMENTS.filter(achievement => 
    progress[achievement.id]?.unlocked
  ).length;

  const totalCount = ACHIEVEMENTS.length;
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[80vh] bg-card border-2 border-accent shadow-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="w-6 h-6 text-accent" />
              <div>
                <CardTitle className="text-accent font-celtic text-xl">
                  Achievements
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {unlockedCount}/{totalCount} unlocked ({completionPercentage}%)
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div 
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </CardHeader>
        
        <CardContent className="overflow-y-auto max-h-[60vh]">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="combat">Combat</TabsTrigger>
              <TabsTrigger value="defense">Defense</TabsTrigger>
              <TabsTrigger value="economy">Economy</TabsTrigger>
              <TabsTrigger value="special">Special</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedCategory} className="space-y-3">
              {filteredAchievements.map((achievement) => {
                const isUnlocked = progress[achievement.id]?.unlocked || false;
                const unlockedAt = progress[achievement.id]?.unlockedAt;
                
                return (
                  <Card 
                    key={achievement.id}
                    className={`border ${getRarityBorder(achievement.rarity)} ${
                      isUnlocked ? 'bg-card' : 'bg-muted/50'
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        {/* Achievement Icon */}
                        <div className={`text-3xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                          {achievement.icon}
                        </div>
                        
                        {/* Achievement Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={`font-bold text-base ${
                              isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                            }`}>
                              {achievement.name}
                            </h3>
                            <Badge className={`${getRarityColor(achievement.rarity)} text-white text-xs`}>
                              {achievement.rarity.toUpperCase()}
                            </Badge>
                            {isUnlocked && (
                              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                                ✓ UNLOCKED
                              </Badge>
                            )}
                          </div>
                          
                          <p className={`text-sm ${
                            isUnlocked ? 'text-muted-foreground' : 'text-muted-foreground/70'
                          }`}>
                            {achievement.description}
                          </p>
                          
                          {isUnlocked && unlockedAt && (
                            <p className="text-xs text-accent mt-1">
                              Unlocked: {new Date(unlockedAt).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        
                        {/* Status Icon */}
                        <div className="text-2xl">
                          {isUnlocked ? (
                            <span className="text-accent">🏆</span>
                          ) : (
                            <span className="text-muted-foreground opacity-50">🔒</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};