import { TowerStats, WaveConfig, EnemyType, Position, SpecialAttack } from '../types/game';

export const TOWER_STATS: Record<string, TowerStats> = {
  'paddy-losty': {
    name: 'Paddy Losty',
    description: 'Throws pints at enemies with splash damage',
    damage: 25,
    range: 120,
    attackSpeed: 1.5,
    cost: 50,
    upgradeCost: 75,
    icon: '🍺'
  },
  maureen: {
    name: 'Maureen',
    description: 'Throws sausages - high damage, short range',
    damage: 60,
    range: 80,
    attackSpeed: 0.8,
    cost: 100,
    upgradeCost: 150,
    icon: '🍳'
  },
  fiddler: {
    name: 'Prime Mutton',
    description: 'Creamers slow enemies in large area',
    damage: 15,
    range: 150,
    attackSpeed: 2.0,
    cost: 75,
    upgradeCost: 100,
    icon: '🥩'
  },
  leprechaun: {
    name: 'John B Keane',
    description: 'Magical whiskey attacks with extra gold rewards',
    damage: 40,
    range: 140,
    attackSpeed: 1.2,
    cost: 125,
    upgradeCost: 200,
    icon: '🥃'
  }
};

export const ENEMY_STATS = {
  goblin: {
    name: 'Goblin',
    health: 80,
    speed: 1.2,
    gold: 10,
    icon: '👹'
  },
  banshee: {
    name: 'Banshee',
    health: 120,
    speed: 1.8,
    gold: 15,
    icon: '👻'
  },
  troll: {
    name: 'Troll',
    health: 200,
    speed: 0.8,
    gold: 25,
    icon: '🧌'
  },
  dragon: {
    name: 'Dragon',
    health: 400,
    speed: 1.0,
    gold: 50,
    icon: '🐉'
  },
  recession: {
    name: 'The Recession',
    health: 600, // 3x more health than Wave 5 enemies (troll has 200)
    speed: 0.6, // 50% speed of normal enemies
    gold: 100,
    icon: '🐻'
  }
};

// Basic wave configuration without bosses (to avoid circular dependency)
export const WAVES: WaveConfig[] = [
  {
    enemies: [
      { type: 'goblin', count: 8, delay: 1000 }
    ],
    reward: 50,
    description: 'A small group of goblins approaches the pub'
  },
  {
    enemies: [
      { type: 'goblin', count: 12, delay: 800 },
      { type: 'banshee', count: 3, delay: 1500, spawnDelay: 2000 }
    ],
    reward: 75,
    description: 'Goblins with banshee support'
  },
  {
    enemies: [
      { type: 'goblin', count: 15, delay: 600 },
      { type: 'banshee', count: 5, delay: 1200, spawnDelay: 1000 },
      { type: 'troll', count: 2, delay: 2000, spawnDelay: 4000 }
    ],
    reward: 100,
    description: 'The enemy forces grow stronger'
  },
  {
    enemies: [
      { type: 'goblin', count: 20, delay: 500 },
      { type: 'banshee', count: 8, delay: 1000, spawnDelay: 1000 },
      { type: 'troll', count: 4, delay: 1500, spawnDelay: 3000 },
      { type: 'dragon', count: 1, delay: 3000, spawnDelay: 8000 }
    ],
    reward: 150,
    description: 'A dragon joins the assault!'
  },
  {
    enemies: [
      { type: 'goblin', count: 25, delay: 400 },
      { type: 'banshee', count: 10, delay: 800, spawnDelay: 2000 },
      { type: 'troll', count: 6, delay: 1200, spawnDelay: 4000 }
    ],
    reward: 200,
    description: 'The enemy forces intensify their assault'
  },
  {
    enemies: [
      { type: 'goblin', count: 30, delay: 400 },
      { type: 'banshee', count: 12, delay: 800, spawnDelay: 2000 },
      { type: 'troll', count: 8, delay: 1200, spawnDelay: 4000 },
      { type: 'dragon', count: 1, delay: 2500, spawnDelay: 6000 }
    ],
    reward: 250,
    description: 'The dragon returns with reinforcements'
  },
  {
    enemies: [
      { type: 'goblin', count: 35, delay: 350 },
      { type: 'banshee', count: 15, delay: 700, spawnDelay: 1500 },
      { type: 'troll', count: 10, delay: 1000, spawnDelay: 3000 },
      { type: 'dragon', count: 2, delay: 2000, spawnDelay: 5000 }
    ],
    reward: 300,
    description: 'Twin dragons lead a massive assault!'
  },
  {
    enemies: [
      { type: 'goblin', count: 40, delay: 300 },
      { type: 'banshee', count: 18, delay: 600, spawnDelay: 1000 },
      { type: 'troll', count: 12, delay: 900, spawnDelay: 2500 },
      { type: 'dragon', count: 3, delay: 1800, spawnDelay: 4000 }
    ],
    reward: 350,
    description: 'The enemy forces reach their peak strength'
  },
  {
    enemies: [
      { type: 'goblin', count: 45, delay: 250 },
      { type: 'banshee', count: 20, delay: 500, spawnDelay: 1000 },
      { type: 'troll', count: 15, delay: 800, spawnDelay: 2000 },
      { type: 'dragon', count: 4, delay: 1500, spawnDelay: 3500 }
    ],
    reward: 400,
    description: 'The calm before the economic storm...'
  },
  {
    enemies: [
      { type: 'goblin', count: 50, delay: 200 },
      { type: 'banshee', count: 25, delay: 400, spawnDelay: 1000 },
      { type: 'troll', count: 20, delay: 600, spawnDelay: 2000 },
      { type: 'dragon', count: 5, delay: 1200, spawnDelay: 3000 },
      { type: 'recession', count: 1, delay: 0, spawnDelay: 15000 }
    ],
    reward: 500,
    description: 'The recession bear (market) is coming!'
  }
];

// Combined enemy stats (will be extended by boss system)
export const COMBINED_ENEMY_STATS = ENEMY_STATS;

// Game path - enemies follow this route to the pub entrance
export const GAME_PATH: Position[] = [
  { x: -20, y: 300 },  // Start off-screen
  { x: 150, y: 300 },
  { x: 150, y: 150 },
  { x: 350, y: 150 },
  { x: 350, y: 450 },
  { x: 550, y: 450 },
  { x: 550, y: 250 },
  { x: 750, y: 250 },
  { x: 750, y: 350 },
  { x: 850, y: 350 }   // End at pub entrance
];

export const SPECIAL_ATTACKS: SpecialAttack[] = [
  {
    id: 'peanuts',
    name: 'Peanuts',
    icon: '🥜',
    description: 'Throw peanuts to stun enemies in target area for 3 seconds',
    cooldown: 20000, // 20 seconds
    currentCooldown: 0,
    cost: 0, // Free to use
    damage: 0, // No damage, just stun effect
    radius: 80 // Tight radius - ~2-3 tiles
  },
  {
    id: 'shirt_rip',
    name: 'Shirt Rip',
    icon: '👕',
    description: 'Rip the shirt off enemies\' backs - area damage',
    cooldown: 25000, // 25 seconds
    currentCooldown: 0,
    cost: 0, // Free to use
    damage: 150,
    radius: 100 // Tight radius - ~2-4 tiles
  }
];

export const GRID_SIZE = 50;
export const GAME_WIDTH = 900;
export const GAME_HEIGHT = 600;