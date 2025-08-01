import { blink } from '../blink/client';

export interface ScoreData {
  score: number;
  wave: number;
  stars?: number;
  worldId?: string;
}

export const saveGameScore = async (scoreData: ScoreData): Promise<boolean> => {
  try {
    // Get current user
    const user = await blink.auth.me();
    
    if (!user) {
      console.error('No authenticated user found');
      return false;
    }

    console.log('🎮 Current user for score saving:', {
      id: user.id,
      email: user.email,
      displayName: user.displayName || 'N/A'
    });

    // Score now represents stars earned from killing enemies
    const stars = scoreData.score;

    // Save score to database using Blink SDK
    const result = await blink.db.userScores.create({
      userId: user.id,
      userEmail: user.email,
      score: scoreData.score,
      waveReached: scoreData.wave,
      starsEarned: stars,
      worldId: scoreData.worldId || 'forest-pub'
    });

    console.log(`✅ Score saved successfully:`, {
      score: scoreData.score,
      wave: scoreData.wave,
      stars: stars,
      worldId: scoreData.worldId || 'forest-pub',
      userId: user.id,
      userEmail: user.email
    });
    
    return true;
  } catch (error) {
    console.error('Error in saveGameScore:', error);
    return false;
  }
};

export const fetchTopScores = async (worldId?: string, limit: number = 10) => {
  try {
    // Use direct SQL query to avoid SDK ordering issues
    let sqlQuery = `
      SELECT id, user_id, user_email, score, stars_earned, wave_reached, world_id, created_at
      FROM user_scores
    `;
    
    const params: any[] = [];
    
    if (worldId && worldId !== 'all') {
      sqlQuery += ` WHERE world_id = ?`;
      params.push(worldId);
    }
    
    sqlQuery += ` ORDER BY stars_earned DESC, wave_reached DESC LIMIT ?`;
    params.push(limit);

    // For now, let's try the SDK approach but with a simpler structure
    let whereClause = {};
    
    if (worldId && worldId !== 'all') {
      whereClause = { worldId: worldId };
    }

    const scores = await blink.db.userScores.list({
      where: whereClause,
      limit: limit
    });

    // Sort manually to avoid ORDER BY issues
    const sortedScores = (scores || []).sort((a: any, b: any) => {
      // Sort by stars_earned first, then by wave_reached
      const starsA = Number(a.starsEarned || a.stars_earned || 0);
      const starsB = Number(b.starsEarned || b.stars_earned || 0);
      
      if (starsA !== starsB) {
        return starsB - starsA; // Descending order
      }
      
      const waveA = Number(a.waveReached || a.wave_reached || 0);
      const waveB = Number(b.waveReached || b.wave_reached || 0);
      
      return waveB - waveA; // Descending order
    });

    return sortedScores.slice(0, limit);
  } catch (error) {
    console.error('Error in fetchTopScores:', error);
    return [];
  }
};

export const fetchUserBestScore = async (worldId?: string) => {
  try {
    const user = await blink.auth.me();
    
    if (!user) {
      return null;
    }

    let whereClause = { userId: user.id };
    
    if (worldId && worldId !== 'all') {
      whereClause = { ...whereClause, worldId: worldId };
    }

    const scores = await blink.db.userScores.list({
      where: whereClause,
      limit: 50 // Get more records to sort manually
    });

    if (!scores || scores.length === 0) {
      return null;
    }

    // Sort manually to find the best score
    const sortedScores = scores.sort((a: any, b: any) => {
      const starsA = Number(a.starsEarned || a.stars_earned || 0);
      const starsB = Number(b.starsEarned || b.stars_earned || 0);
      
      if (starsA !== starsB) {
        return starsB - starsA; // Descending order
      }
      
      const waveA = Number(a.waveReached || a.wave_reached || 0);
      const waveB = Number(b.waveReached || b.wave_reached || 0);
      
      return waveB - waveA; // Descending order
    });

    return sortedScores[0] || null;
  } catch (error) {
    console.error('Error in fetchUserBestScore:', error);
    return null;
  }
};

// Debug functions for testing - can be called from browser console
(window as any).checkCurrentUser = async () => {
  try {
    const user = await blink.auth.me();
    console.log('🔍 Current authenticated user:', user);
    return user;
  } catch (error) {
    console.error('❌ Error checking user:', error);
    return null;
  }
};

(window as any).testScoreSave = async () => {
  const testScore = {
    score: 100,
    wave: 5,
    stars: 100,
    worldId: 'irish-countryside'
  };
  
  console.log('🧪 Testing score save with:', testScore);
  const result = await saveGameScore(testScore);
  console.log('🧪 Test result:', result);
  return result;
};

(window as any).testFetchScores = async () => {
  console.log('🧪 Testing fetch scores...');
  const result = await fetchTopScores('irish-countryside', 10);
  console.log('🧪 Fetch result:', result);
  return result;
};