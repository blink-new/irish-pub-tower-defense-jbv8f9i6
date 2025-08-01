import React, { useState } from 'react';
import { Button } from './ui/button';
import { saveGameScore } from '../utils/scoreManager';
import { blink } from '../blink/client';

export const ScoreTestButton: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const testScoreSaving = async () => {
    setTesting(true);
    setResult(null);

    try {
      // Get current user first
      const user = await blink.auth.me();
      console.log('🎮 Testing score save for user:', user);

      // Test saving a score
      const testScore = {
        score: Math.floor(Math.random() * 10000) + 1000, // Random score between 1000-11000
        wave: Math.floor(Math.random() * 10) + 1, // Random wave 1-10
        worldId: 'forest-pub'
      };

      console.log('🎯 Attempting to save test score:', testScore);
      
      const success = await saveGameScore(testScore);
      
      if (success) {
        setResult(`✅ Test score saved successfully! Score: ${testScore.score}, Wave: ${testScore.wave}`);
        console.log('✅ Score save test passed!');
      } else {
        setResult('❌ Failed to save test score');
        console.error('❌ Score save test failed');
      }
    } catch (error) {
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error('❌ Score save test error:', error);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg border z-50">
      <div className="space-y-2">
        <Button
          onClick={testScoreSaving}
          disabled={testing}
          size="sm"
          className="w-full"
        >
          {testing ? 'Testing...' : '🧪 Test Score Save'}
        </Button>
        {result && (
          <p className="text-xs max-w-64 break-words">
            {result}
          </p>
        )}
      </div>
    </div>
  );
};