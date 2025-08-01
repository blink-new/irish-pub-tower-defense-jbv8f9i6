export interface WorldTheme {
  id: string;
  name: string;
  description: string;
  waveRange: {
    start: number;
    end: number;
  };
  background: {
    type: 'countryside' | 'city';
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
  };
  enemies: Record<string, EnemyThemeData>;
  towers: Record<string, TowerThemeData>;
  decorations: DecorationTheme;
}

export interface EnemyThemeData {
  name: string;
  description: string;
  icon: string;
  // Keep same stats as base enemy, just change visuals
  baseType: string; // Maps to original enemy type for stats
}

export interface TowerThemeData {
  name: string;
  description: string;
  icon: string;
  // Keep same stats as base tower, just change visuals
  baseType: string; // Maps to original tower type for stats
}

export interface DecorationTheme {
  buildings: BuildingTheme[];
  pathStyle: {
    color: string;
    texture: 'dirt' | 'cobblestone' | 'asphalt';
  };
  ambientElements: string[];
}

export interface BuildingTheme {
  type: string;
  name: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  color: string;
  details: string[];
}

export interface WorldState {
  currentWorldId: string;
  unlockedWorlds: string[];
  worldProgress: Record<string, {
    highestWave: number;
    isCompleted: boolean;
  }>;
}