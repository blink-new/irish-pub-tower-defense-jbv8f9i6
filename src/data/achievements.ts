import { Achievement } from '../types/achievements';
import { GameState } from '../types/game';

export const ACHIEVEMENTS: Achievement[] = [
  // Combat Achievements
  {
    id: 'first_blood',
    name: 'First Blood',
    description: 'Defeat your first enemy',
    icon: '⚔️',
    condition: (gameState: GameState) => gameState.score > 0,
    unlocked: false,
    category: 'combat',
    rarity: 'common'
  },
  {
    id: 'goblin_slayer',
    name: 'Goblin Slayer',
    description: 'Defeat 50 goblins',
    icon: '👹',
    condition: (gameState: GameState) => {
      return gameState.towers.reduce((total, tower) => total + tower.kills, 0) >= 50;
    },
    unlocked: false,
    category: 'combat',
    rarity: 'common'
  },
  {
    id: 'dragon_hunter',
    name: 'Dragon Hunter',
    description: 'Defeat a dragon',
    icon: '🐉',
    condition: (gameState: GameState) => {
      // Check if any dragon has been defeated (would need to track this separately)
      return gameState.wave >= 4; // Dragons appear from wave 4
    },
    unlocked: false,
    category: 'combat',
    rarity: 'rare'
  },
  
  // Defense Achievements
  {
    id: 'perfect_defense',
    name: 'Perfect Defense',
    description: 'Complete a wave without losing any lives',
    icon: '🛡️',
    condition: (gameState: GameState) => gameState.lives === 20 && gameState.wave > 1,
    unlocked: false,
    category: 'defense',
    rarity: 'rare'
  },
  {
    id: 'fortress_builder',
    name: 'Fortress Builder',
    description: 'Place 10 towers in a single game',
    icon: '🏰',
    condition: (gameState: GameState) => gameState.towers.length >= 10,
    unlocked: false,
    category: 'defense',
    rarity: 'common'
  },
  {
    id: 'master_defender',
    name: 'Master Defender',
    description: 'Complete all 6 waves',
    icon: '👑',
    condition: (gameState: GameState) => gameState.wave > 6 && gameState.lives > 0,
    unlocked: false,
    category: 'defense',
    rarity: 'epic'
  },
  
  // Economy Achievements
  {
    id: 'gold_digger',
    name: 'Gold Digger',
    description: 'Accumulate 500 gold',
    icon: '💰',
    condition: (gameState: GameState) => gameState.gold >= 500,
    unlocked: false,
    category: 'economy',
    rarity: 'common'
  },
  {
    id: 'wealthy_publican',
    name: 'Wealthy Publican',
    description: 'Accumulate 1000 gold',
    icon: '💎',
    condition: (gameState: GameState) => gameState.gold >= 1000,
    unlocked: false,
    category: 'economy',
    rarity: 'rare'
  },
  {
    id: 'high_scorer',
    name: 'High Scorer',
    description: 'Reach 5000 points',
    icon: '⭐',
    condition: (gameState: GameState) => gameState.score >= 5000,
    unlocked: false,
    category: 'economy',
    rarity: 'rare'
  },
  
  // Special Achievements
  {
    id: 'paddy_fan',
    name: 'Paddy\'s Biggest Fan',
    description: 'Place 5 Paddy Losty towers',
    icon: '🍺',
    condition: (gameState: GameState) => {
      return gameState.towers.filter(tower => tower.type === 'bartender').length >= 5;
    },
    unlocked: false,
    category: 'special',
    rarity: 'common'
  },
  {
    id: 'maureen_master',
    name: 'Maureen\'s Kitchen Master',
    description: 'Upgrade a Maureen tower to max level',
    icon: '🍳',
    condition: (gameState: GameState) => {
      return gameState.towers.some(tower => tower.type === 'maureen' && tower.level >= 5);
    },
    unlocked: false,
    category: 'special',
    rarity: 'rare'
  },
  {
    id: 'special_attack_master',
    name: 'Special Attack Master',
    description: 'Use both special attacks in a single game',
    icon: '💥',
    condition: (gameState: GameState) => {
      // This would need to be tracked separately
      return false; // Placeholder
    },
    unlocked: false,
    category: 'special',
    rarity: 'epic'
  },
  {
    id: 'irish_legend',
    name: 'Irish Legend',
    description: 'Complete the game with all tower types placed',
    icon: '🇮🇪',
    condition: (gameState: GameState) => {
      const towerTypes = new Set(gameState.towers.map(tower => tower.type));
      return towerTypes.size >= 4 && gameState.wave > 6 && gameState.lives > 0;
    },
    unlocked: false,
    category: 'special',
    rarity: 'legendary'
  }
];

export const checkAchievements = (gameState: GameState, currentProgress: any): Achievement[] => {
  const newlyUnlocked: Achievement[] = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    const isCurrentlyUnlocked = currentProgress[achievement.id]?.unlocked || false;
    
    if (!isCurrentlyUnlocked && achievement.condition(gameState)) {
      newlyUnlocked.push({
        ...achievement,
        unlocked: true,
        unlockedAt: new Date()
      });
    }
  });
  
  return newlyUnlocked;
};