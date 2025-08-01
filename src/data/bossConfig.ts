import { BossStats, BossType, EnhancedWaveConfig, ExtendedEnemyType } from '../types/boss';

// Boss definitions with unique abilities and characteristics
export const BOSS_STATS: Record<BossType, BossStats> = {
  banshee_queen: {
    name: 'Banshee Queen',
    health: 800,
    speed: 1.2,
    gold: 100,
    icon: '👑',
    size: 1.5,
    isBoss: true,
    description: 'A powerful banshee that can heal nearby enemies',
    abilities: [
      {
        id: 'heal_aura',
        name: 'Healing Aura',
        description: 'Heals all nearby enemies',
        cooldown: 8000,
        effect: 'heal',
        value: 50
      }
    ]
  },
  troll_king: {
    name: 'Troll King',
    health: 1500,
    speed: 0.6,
    gold: 150,
    icon: '👑',
    size: 2.0,
    isBoss: true,
    description: 'A massive troll that spawns smaller trolls',
    abilities: [
      {
        id: 'spawn_minions',
        name: 'Summon Trolls',
        description: 'Spawns 2 regular trolls',
        cooldown: 12000,
        effect: 'spawn_minions',
        value: 2
      }
    ]
  },
  dragon_lord: {
    name: 'Dragon Lord',
    health: 2500,
    speed: 0.8,
    gold: 250,
    icon: '🐲',
    size: 2.5,
    isBoss: true,
    description: 'Ancient dragon with fire breath that damages towers',
    abilities: [
      {
        id: 'fire_breath',
        name: 'Fire Breath',
        description: 'Damages nearby towers',
        cooldown: 10000,
        effect: 'area_damage',
        value: 100
      },
      {
        id: 'speed_boost',
        name: 'Dragon Fury',
        description: 'Increases speed temporarily',
        cooldown: 15000,
        effect: 'speed_boost',
        value: 2.0,
        duration: 5000
      }
    ]
  },
  shadow_demon: {
    name: 'Shadow Demon',
    health: 1200,
    speed: 1.8,
    gold: 200,
    icon: '👹',
    size: 1.8,
    isBoss: true,
    description: 'Fast demon that becomes temporarily invulnerable',
    abilities: [
      {
        id: 'shadow_shield',
        name: 'Shadow Shield',
        description: 'Becomes invulnerable for a short time',
        cooldown: 20000,
        effect: 'shield',
        value: 1,
        duration: 3000
      }
    ]
  },
  pub_destroyer: {
    name: 'Pub Destroyer',
    health: 5000,
    speed: 0.4,
    gold: 500,
    icon: '💀',
    size: 3.0,
    isBoss: true,
    description: 'The ultimate boss - a massive creature bent on destroying the pub',
    abilities: [
      {
        id: 'earthquake',
        name: 'Earthquake',
        description: 'Stuns all towers briefly',
        cooldown: 25000,
        effect: 'area_damage',
        value: 0, // No damage, just stun effect
        duration: 2000
      },
      {
        id: 'regeneration',
        name: 'Regeneration',
        description: 'Slowly heals over time',
        cooldown: 8000,
        effect: 'heal',
        value: 100
      }
    ]
  }
};

// Regular enemy stats (defined here to avoid circular dependency)
const ENEMY_STATS = {
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

// Combined enemy stats (regular enemies + bosses)
export const ALL_ENEMY_STATS = {
  ...ENEMY_STATS,
  ...Object.fromEntries(
    Object.entries(BOSS_STATS).map(([key, boss]) => [
      key,
      {
        name: boss.name,
        health: boss.health,
        speed: boss.speed,
        gold: boss.gold,
        icon: boss.icon
      }
    ])
  )
};

// Enhanced wave configuration with bosses
export const ENHANCED_WAVES: EnhancedWaveConfig[] = [
  // Wave 1 - Tutorial wave
  {
    waveNumber: 1,
    enemies: [
      { type: 'goblin', count: 8, delay: 1000 }
    ],
    reward: 50,
    description: 'A small group of goblins approaches the pub'
  },
  
  // Wave 2 - Mixed enemies
  {
    waveNumber: 2,
    enemies: [
      { type: 'goblin', count: 12, delay: 800 },
      { type: 'banshee', count: 3, delay: 1500, spawnDelay: 2000 }
    ],
    reward: 75,
    description: 'Goblins with banshee support'
  },
  
  // Wave 3 - Introducing trolls
  {
    waveNumber: 3,
    enemies: [
      { type: 'goblin', count: 15, delay: 600 },
      { type: 'banshee', count: 5, delay: 1200, spawnDelay: 1000 },
      { type: 'troll', count: 2, delay: 2000, spawnDelay: 4000 }
    ],
    reward: 100,
    description: 'The enemy forces grow stronger'
  },
  
  // Wave 4 - First dragon appearance
  {
    waveNumber: 4,
    enemies: [
      { type: 'goblin', count: 20, delay: 500 },
      { type: 'banshee', count: 8, delay: 1000, spawnDelay: 1000 },
      { type: 'troll', count: 4, delay: 1500, spawnDelay: 3000 },
      { type: 'dragon', count: 1, delay: 3000, spawnDelay: 8000 }
    ],
    reward: 150,
    description: 'A dragon joins the assault!'
  },
  
  // Wave 5 - BOSS WAVE: Banshee Queen
  {
    waveNumber: 5,
    enemies: [
      { type: 'goblin', count: 15, delay: 400 },
      { type: 'banshee', count: 8, delay: 800, spawnDelay: 2000 },
      { type: 'banshee_queen', count: 1, delay: 0, spawnDelay: 6000 }
    ],
    reward: 300,
    description: 'The Banshee Queen leads her ghostly army!',
    isBossWave: true
  },
  
  // Wave 6 - Recovery wave
  {
    waveNumber: 6,
    enemies: [
      { type: 'goblin', count: 25, delay: 300 },
      { type: 'troll', count: 6, delay: 1000, spawnDelay: 2000 },
      { type: 'dragon', count: 2, delay: 2500, spawnDelay: 5000 }
    ],
    reward: 200,
    description: 'The enemy regroups after their queen\'s defeat'
  },
  
  // Wave 7 - Heavy assault
  {
    waveNumber: 7,
    enemies: [
      { type: 'goblin', count: 30, delay: 250 },
      { type: 'banshee', count: 12, delay: 600, spawnDelay: 1000 },
      { type: 'troll', count: 8, delay: 800, spawnDelay: 3000 },
      { type: 'dragon', count: 3, delay: 2000, spawnDelay: 6000 }
    ],
    reward: 250,
    description: 'A massive coordinated attack'
  },
  
  // Wave 8 - BOSS WAVE: Troll King
  {
    waveNumber: 8,
    enemies: [
      { type: 'troll', count: 10, delay: 1000 },
      { type: 'dragon', count: 2, delay: 3000, spawnDelay: 3000 },
      { type: 'troll_king', count: 1, delay: 0, spawnDelay: 8000 }
    ],
    reward: 400,
    description: 'The Troll King emerges from his mountain lair!',
    isBossWave: true
  },
  
  // Wave 9 - Elite forces
  {
    waveNumber: 9,
    enemies: [
      { type: 'banshee', count: 20, delay: 400 },
      { type: 'troll', count: 12, delay: 800, spawnDelay: 2000 },
      { type: 'dragon', count: 5, delay: 1500, spawnDelay: 4000 }
    ],
    reward: 300,
    description: 'Elite enemy forces test your defenses'
  },
  
  // Wave 10 - BOSS WAVE: Dragon Lord
  {
    waveNumber: 10,
    enemies: [
      { type: 'dragon', count: 5, delay: 2000 },
      { type: 'banshee', count: 15, delay: 600, spawnDelay: 1000 },
      { type: 'dragon_lord', count: 1, delay: 0, spawnDelay: 10000 }
    ],
    reward: 500,
    description: 'The ancient Dragon Lord awakens!',
    isBossWave: true
  },
  
  // Wave 11 - Chaos wave
  {
    waveNumber: 11,
    enemies: [
      { type: 'goblin', count: 40, delay: 200 },
      { type: 'banshee', count: 20, delay: 400, spawnDelay: 1000 },
      { type: 'troll', count: 15, delay: 600, spawnDelay: 3000 },
      { type: 'dragon', count: 8, delay: 1200, spawnDelay: 5000 }
    ],
    reward: 350,
    description: 'Chaos erupts as all enemy types attack together'
  },
  
  // Wave 12 - BOSS WAVE: Shadow Demon
  {
    waveNumber: 12,
    enemies: [
      { type: 'banshee', count: 25, delay: 300, spawnDelay: 0 },
      { type: 'shadow_demon', count: 1, delay: 0, spawnDelay: 8000 }
    ],
    reward: 600,
    description: 'A Shadow Demon materializes from the darkness!',
    isBossWave: true
  },
  
  // Wave 13-14 - Preparation waves
  {
    waveNumber: 13,
    enemies: [
      { type: 'troll', count: 20, delay: 500 },
      { type: 'dragon', count: 10, delay: 1000, spawnDelay: 2000 },
      { type: 'banshee_queen', count: 1, delay: 0, spawnDelay: 8000 }
    ],
    reward: 400,
    description: 'The enemy prepares for their final assault'
  },
  
  {
    waveNumber: 14,
    enemies: [
      { type: 'dragon', count: 15, delay: 800 },
      { type: 'troll_king', count: 1, delay: 0, spawnDelay: 6000 },
      { type: 'shadow_demon', count: 1, delay: 0, spawnDelay: 12000 }
    ],
    reward: 500,
    description: 'Multiple bosses join forces!'
  },
  
  // Wave 15 - FINAL BOSS WAVE: Pub Destroyer
  {
    waveNumber: 15,
    enemies: [
      { type: 'goblin', count: 50, delay: 150 },
      { type: 'banshee', count: 30, delay: 300, spawnDelay: 2000 },
      { type: 'troll', count: 20, delay: 400, spawnDelay: 4000 },
      { type: 'dragon', count: 10, delay: 800, spawnDelay: 6000 },
      { type: 'pub_destroyer', count: 1, delay: 0, spawnDelay: 15000 }
    ],
    reward: 1000,
    description: 'The ultimate threat emerges - the Pub Destroyer!',
    isBossWave: true
  }
];

// Helper function to get enemy stats (regular or boss)
export const getEnemyStats = (type: ExtendedEnemyType) => {
  return ALL_ENEMY_STATS[type as keyof typeof ALL_ENEMY_STATS];
};

// Helper function to check if an enemy type is a boss
export const isBossType = (type: ExtendedEnemyType): type is BossType => {
  return type in BOSS_STATS;
};

// Helper function to get boss-specific stats
export const getBossStats = (type: BossType): BossStats => {
  return BOSS_STATS[type];
};