import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Play } from 'lucide-react';
import { soundManager } from '../utils/soundManager';

interface WaveControlModalProps {
  isVisible: boolean;
  wave: number;
  onStartWave: () => void;
}

export const WaveControlModal: React.FC<WaveControlModalProps> = ({
  isVisible,
  wave,
  onStartWave
}) => {
  if (!isVisible) return null;

  const handleStartWave = () => {
    soundManager.playSound('button_click');
    onStartWave();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with subtle blur */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      {/* Modal Content */}
      <Card className="relative z-10 w-80 bg-primary/95 border-2 border-accent shadow-2xl">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-celtic text-accent">
            Wave {wave}
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center">
          <Button
            onClick={handleStartWave}
            size="lg"
            className="w-full bg-accent hover:bg-accent/80 text-accent-foreground font-bold text-lg py-3"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Wave {wave}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};