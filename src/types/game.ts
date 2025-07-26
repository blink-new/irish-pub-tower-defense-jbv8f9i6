export interface Position {
  x: number;
  y: number;
}

export interface Tower {
  id: string;
  type: TowerType;
  position: Position;
  level: number;
  damage: number;
  range: number;
  attackSpeed: number;
  cost: number;
  lastAttack: number;
  target?: Enemy;
  kills: number;
  totalDamage: number;
}

export interface Enemy {
  id: string;
  type: EnemyType | import('../types/boss').BossType;
  position: Position;
  health: number;
  maxHealth: number;
  speed: number;
  pathIndex: number;
  pathProgress: number;
  gold: number;
  isDead: boolean;
  isBoss?: boolean;
  size?: number;
  abilities?: import('../types/boss').BossAbility[];
  lastAbilityUse?: Record<string, number>;
  statusEffects?: {
    shield?: { endTime: number };
    speedBoost?: { endTime: number; multiplier: number };
  };
}

export interface Projectile {
  id: string;
  position: Position;
  target: Enemy;
  damage: number;
  speed: number;
  towerId: string;
}

export interface SpecialAttack {
  id: string;
  name: string;
  icon: string;
  description: string;
  cooldown: number;
  currentCooldown: number;
  cost: number;
  damage: number;
  radius: number;
}

export interface GameState {
  gold: number;
  lives: number;
  wave: number;
  score: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameSpeed: number;
  towers: Tower[];
  enemies: Enemy[];
  projectiles: Projectile[];
  selectedTower?: Tower;
  placingTowerType?: TowerType;
  particles: any[];
  isMusicMuted: boolean;
  isSoundFxMuted: boolean;
  specialAttacks: SpecialAttack[];
}

export type TowerType = 'paddy-losty' | 'maureen' | 'fiddler' | 'leprechaun';

export type EnemyType = 'goblin' | 'banshee' | 'troll' | 'dragon' | 'recession';

export interface TowerStats {
  name: string;
  description: string;
  damage: number;
  range: number;
  attackSpeed: number;
  cost: number;
  upgradeCost: number;
  icon: string;
  voiceLine?: string;
  accent?: 'irish' | 'english';
}

export interface WaveConfig {
  enemies: Array<{
    type: EnemyType | import('../types/boss').BossType;
    count: number;
    delay: number;
    spawnDelay?: number;
  }>;
  reward: number;
  description?: string;
  isBossWave?: boolean;
}