import { TowerStats, WaveConfig, EnemyType, Position, SpecialAttack } from '../types/game';

export const TOWER_STATS: Record<string, TowerStats> = {
  bartender: {
    name: 'Paddy Losty',
    description: 'Throws pints at enemies with splash damage',
    damage: 25,
    range: 120,
    attackSpeed: 1.5,
    cost: 50,
    upgradeCost: 75,
    icon: '🍺'
  },
  bouncer: {
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
  }
};

export const WAVES: WaveConfig[] = [
  {
    enemies: [
      { type: 'goblin' as EnemyType, count: 8, delay: 1000 }
    ],
    reward: 50
  },
  {
    enemies: [
      { type: 'goblin' as EnemyType, count: 12, delay: 800 },
      { type: 'banshee' as EnemyType, count: 3, delay: 1500 }
    ],
    reward: 75
  },
  {
    enemies: [
      { type: 'goblin' as EnemyType, count: 15, delay: 600 },
      { type: 'banshee' as EnemyType, count: 5, delay: 1200 },
      { type: 'troll' as EnemyType, count: 2, delay: 2000 }
    ],
    reward: 100
  },
  {
    enemies: [
      { type: 'goblin' as EnemyType, count: 20, delay: 500 },
      { type: 'banshee' as EnemyType, count: 8, delay: 1000 },
      { type: 'troll' as EnemyType, count: 4, delay: 1500 },
      { type: 'dragon' as EnemyType, count: 1, delay: 3000 }
    ],
    reward: 150
  },
  {
    enemies: [
      { type: 'goblin' as EnemyType, count: 25, delay: 400 },
      { type: 'banshee' as EnemyType, count: 12, delay: 800 },
      { type: 'troll' as EnemyType, count: 6, delay: 1200 },
      { type: 'dragon' as EnemyType, count: 2, delay: 2500 }
    ],
    reward: 200
  },
  {
    enemies: [
      { type: 'goblin' as EnemyType, count: 30, delay: 300 },
      { type: 'banshee' as EnemyType, count: 15, delay: 600 },
      { type: 'troll' as EnemyType, count: 8, delay: 1000 },
      { type: 'dragon' as EnemyType, count: 3, delay: 2000 }
    ],
    reward: 250
  }
];

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
    radius: 100 // Local area effect
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
    radius: 120 // Local area effect
  }
];

export const GRID_SIZE = 50;
export const GAME_WIDTH = 900;
export const GAME_HEIGHT = 600;