import React from 'react';
import { Button } from './ui/button';
import { Pause, Play, FastForward } from 'lucide-react';

interface TopRightControlsProps {
  isPlaying: boolean;
  isPaused: boolean;
  gameSpeed: number;
  onTogglePause: () => void;
  onChangeGameSpeed: () => void;
}

export const TopRightControls: React.FC<TopRightControlsProps> = ({
  isPlaying,
  isPaused,
  gameSpeed,
  onTogglePause,
  onChangeGameSpeed
}) => {
  return (
    <div className="absolute top-4 right-4 flex gap-2 z-10">
      {/* Pause Button - Always clickable to access menu */}
      <Button
        onClick={onTogglePause}
        className="w-14 h-14 rounded-full border-4 border-yellow-600 shadow-lg transition-all bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500"
      >
        <div className="w-8 h-8 flex items-center justify-center">
          {isPaused ? (
            <Play className="w-6 h-6 text-black fill-black" />
          ) : (
            <Pause className="w-6 h-6 text-black fill-black" />
          )}
        </div>
      </Button>

      {/* Fast Forward Button */}
      <Button
        onClick={onChangeGameSpeed}
        className="w-14 h-14 rounded-full border-4 border-yellow-600 bg-gradient-to-b from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 shadow-lg transition-all"
      >
        <div className="w-8 h-8 flex items-center justify-center relative">
          <FastForward className="w-6 h-6 text-black fill-black" />
          {/* Speed indicator */}
          <div className="absolute -bottom-1 -right-1 bg-black text-yellow-400 text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            {gameSpeed}
          </div>
        </div>
      </Button>
    </div>
  );
};