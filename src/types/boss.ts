import { EnemyType } from './game';

export interface BossStats {
  name: string;
  health: number;
  speed: number;
  gold: number;
  icon: string;
  size: number; // Multiplier for visual size (1 = normal, 2 = double size, etc.)
  abilities?: BossAbility[];
  description: string;
  isBoss: boolean;
}

export interface BossAbility {
  id: string;
  name: string;
  description: string;
  cooldown: number; // in milliseconds
  effect: 'heal' | 'speed_boost' | 'spawn_minions' | 'area_damage' | 'shield';
  value: number; // healing amount, speed multiplier, damage amount, etc.
  duration?: number; // for temporary effects
}

export interface WaveEnemyConfig {
  type: EnemyType | BossType;
  count: number;
  delay: number; // delay between spawns of this enemy type
  spawnDelay?: number; // delay before this enemy type starts spawning in the wave
}

export interface EnhancedWaveConfig {
  enemies: WaveEnemyConfig[];
  reward: number;
  waveNumber: number;
  description?: string;
  isBossWave?: boolean;
}

export type BossType = 'banshee_queen' | 'troll_king' | 'dragon_lord' | 'shadow_demon' | 'pub_destroyer';

// Extended enemy type that includes bosses
export type ExtendedEnemyType = EnemyType | BossType;