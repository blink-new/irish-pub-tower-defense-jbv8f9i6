import { WorldTheme } from '../types/world';

export const WORLD_THEMES: Record<string, WorldTheme> = {
  'irish-countryside': {
    id: 'irish-countryside',
    name: 'Irish Countryside',
    description: 'Defend the rural Irish pub from mythical creatures in the rolling green hills.',
    waveRange: {
      start: 1,
      end: 10
    },
    background: {
      type: 'countryside',
      colors: {
        primary: '#228B22',
        secondary: '#32CD32', 
        accent: '#FFD700'
      }
    },
    enemies: {
      goblin: {
        name: 'Goblin',
        description: 'Small green creatures from the hills',
        icon: '👹',
        baseType: 'goblin'
      },
      banshee: {
        name: 'Banshee',
        description: 'Wailing spirits of the moors',
        icon: '👻',
        baseType: 'banshee'
      },
      troll: {
        name: 'Troll',
        description: 'Ancient stone bridge guardians',
        icon: '🧌',
        baseType: 'troll'
      },
      dragon: {
        name: 'Dragon',
        description: 'Fire-breathing beasts from Celtic legends',
        icon: '🐉',
        baseType: 'dragon'
      },
      recession: {
        name: 'The Recession',
        description: 'Economic doom threatening the countryside',
        icon: '🐻',
        baseType: 'recession'
      }
    },
    towers: {
      'paddy-losty': {
        name: 'Paddy Losty',
        description: 'The legendary pub owner with his trusty pints',
        icon: '🍺',
        baseType: 'paddy-losty'
      },
      maureen: {
        name: 'Maureen',
        description: 'The fierce cook with her frying pan arsenal',
        icon: '🍳',
        baseType: 'maureen'
      },
      fiddler: {
        name: 'Prime Mutton',
        description: 'The mysterious fiddler with Guinness magic',
        icon: '🥩',
        baseType: 'fiddler'
      },
      leprechaun: {
        name: 'John B Keane',
        description: 'The wise leprechaun with golden whiskey',
        icon: '🥃',
        baseType: 'leprechaun'
      }
    },
    decorations: {
      buildings: [
        {
          type: 'pub',
          name: "Paddy's Pub",
          position: { x: 840, y: 280 },
          size: { width: 80, height: 80 },
          color: '#8B4513',
          details: ['chimney', 'sign', 'windows']
        },
        {
          type: 'cottage',
          name: 'Stone Cottage',
          position: { x: 60, y: 200 },
          size: { width: 40, height: 30 },
          color: '#A0522D',
          details: ['thatched_roof', 'chimney']
        }
      ],
      pathStyle: {
        color: '#D2B48C',
        texture: 'dirt'
      },
      ambientElements: ['rolling_hills', 'stone_walls', 'sheep', 'celtic_crosses']
    }
  },

  'city-pub': {
    id: 'city-pub',
    name: 'City Pub',
    description: 'Defend the urban pub from corporate invaders and city threats.',
    waveRange: {
      start: 11,
      end: 20
    },
    background: {
      type: 'city',
      colors: {
        primary: '#4A5568',
        secondary: '#718096',
        accent: '#F6AD55'
      }
    },
    enemies: {
      // City-themed enemies with same stats as countryside equivalents
      'office-worker': {
        name: 'Office Worker',
        description: 'Stressed corporate employees seeking escape',
        icon: '👔',
        baseType: 'goblin' // Same stats as goblin
      },
      'tourist': {
        name: 'Tourist',
        description: 'Lost tourists causing chaos',
        icon: '📷',
        baseType: 'banshee' // Same stats as banshee
      },
      'security-guard': {
        name: 'Security Guard',
        description: 'Overzealous mall security',
        icon: '👮',
        baseType: 'troll' // Same stats as troll
      },
      'corporate-exec': {
        name: 'Corporate Executive',
        description: 'Ruthless business leaders',
        icon: '💼',
        baseType: 'dragon' // Same stats as dragon
      },
      'gentrification': {
        name: 'Gentrification',
        description: 'The ultimate threat to local pubs',
        icon: '🏢',
        baseType: 'recession' // Same stats as recession
      }
    },
    towers: {
      // City pub staff with same mechanics as countryside equivalents
      'head-bartender': {
        name: 'Head Bartender',
        description: 'Experienced city bartender with craft cocktails',
        icon: '🍸',
        baseType: 'paddy-losty' // Same mechanics as Paddy Losty
      },
      'chef': {
        name: 'Executive Chef',
        description: 'Professional chef with gourmet weapons',
        icon: '👨‍🍳',
        baseType: 'maureen' // Same mechanics as Maureen
      },
      'sommelier': {
        name: 'Wine Sommelier',
        description: 'Wine expert with vintage attacks',
        icon: '🍷',
        baseType: 'fiddler' // Same mechanics as Prime Mutton
      },
      'manager': {
        name: 'Pub Manager',
        description: 'Business-savvy manager with premium spirits',
        icon: '📊',
        baseType: 'leprechaun' // Same mechanics as John B Keane
      }
    },
    decorations: {
      buildings: [
        {
          type: 'urban-pub',
          name: 'The City Tap',
          position: { x: 840, y: 280 },
          size: { width: 80, height: 80 },
          color: '#2D3748',
          details: ['neon_sign', 'glass_windows', 'fire_escape']
        },
        {
          type: 'apartment',
          name: 'City Apartment',
          position: { x: 60, y: 200 },
          size: { width: 40, height: 50 },
          color: '#4A5568',
          details: ['balcony', 'air_conditioning']
        }
      ],
      pathStyle: {
        color: '#718096',
        texture: 'asphalt'
      },
      ambientElements: ['skyscrapers', 'street_lights', 'traffic', 'billboards']
    }
  }
};

export const DEFAULT_WORLD = 'irish-countryside';

// Helper function to get world by wave number
export const getWorldByWave = (wave: number): WorldTheme => {
  for (const world of Object.values(WORLD_THEMES)) {
    if (wave >= world.waveRange.start && wave <= world.waveRange.end) {
      return world;
    }
  }
  // Default to countryside if wave is out of range
  return WORLD_THEMES[DEFAULT_WORLD];
};

// Helper function to get all available worlds
export const getAllWorlds = (): WorldTheme[] => {
  return Object.values(WORLD_THEMES);
};

// Helper function to check if world is unlocked
export const isWorldUnlocked = (worldId: string, highestCompletedWave: number): boolean => {
  const world = WORLD_THEMES[worldId];
  if (!world) return false;
  
  // DEVELOPER MODE: All worlds unlocked for testing
  return true;
  
  // Original logic (commented out for development):
  // // First world is always unlocked
  // if (world.waveRange.start === 1) return true;
  // 
  // // Other worlds unlock when previous world's last wave is completed
  // return highestCompletedWave >= world.waveRange.start - 1;
};