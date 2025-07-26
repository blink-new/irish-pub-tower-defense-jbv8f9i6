export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (gameState: any) => boolean;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'combat' | 'defense' | 'economy' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface AchievementProgress {
  [achievementId: string]: {
    unlocked: boolean;
    unlockedAt?: Date;
    progress?: number;
    maxProgress?: number;
  };
}