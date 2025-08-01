import React from 'react';
import { Button } from './ui/button';
import { Volume2, VolumeX, Music, RotateCcw, LogOut, Play, Coins } from 'lucide-react';

interface PauseMenuProps {
  isVisible: boolean;
  isMusicMuted: boolean;
  isSoundFxMuted: boolean;
  onResume: () => void;
  onToggleMusic: () => void;
  onToggleSoundFx: () => void;
  onRetryLevel: () => void;
  onQuitLevel: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  isVisible,
  isMusicMuted,
  isSoundFxMuted,
  onResume,
  onToggleMusic,
  onToggleSoundFx,
  onRetryLevel,
  onQuitLevel
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-2xl p-8 border-4 border-yellow-600 shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">PAUSED</h2>
          <div className="w-16 h-1 bg-yellow-500 mx-auto rounded-full"></div>
        </div>

        {/* Main Menu Buttons - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Sound Button */}
          <Button
            onClick={onToggleSoundFx}
            className={`h-20 flex flex-col items-center justify-center rounded-xl border-2 transition-all ${
              isSoundFxMuted
                ? 'bg-red-600 hover:bg-red-700 border-red-400 text-white'
                : 'bg-blue-500 hover:bg-blue-600 border-blue-300 text-white'
            }`}
          >
            <div className="relative mb-1">
              {isSoundFxMuted ? (
                <VolumeX className="w-8 h-8" />
              ) : (
                <Volume2 className="w-8 h-8" />
              )}
              {isSoundFxMuted && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-0.5 bg-red-500 rotate-45 absolute"></div>
                </div>
              )}
            </div>
            <span className="text-sm font-bold">SOUND</span>
          </Button>

          {/* Music Button */}
          <Button
            onClick={onToggleMusic}
            className={`h-20 flex flex-col items-center justify-center rounded-xl border-2 transition-all ${
              isMusicMuted
                ? 'bg-red-600 hover:bg-red-700 border-red-400 text-white'
                : 'bg-blue-500 hover:bg-blue-600 border-blue-300 text-white'
            }`}
          >
            <div className="relative mb-1">
              <Music className="w-8 h-8" />
              {isMusicMuted && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-0.5 bg-red-500 rotate-45 absolute"></div>
                </div>
              )}
            </div>
            <span className="text-sm font-bold">MUSIC</span>
          </Button>

          {/* Retry Button */}
          <Button
            onClick={onRetryLevel}
            className="h-20 flex flex-col items-center justify-center rounded-xl border-2 bg-blue-500 hover:bg-blue-600 border-blue-300 text-white transition-all"
          >
            <RotateCcw className="w-8 h-8 mb-1" />
            <span className="text-sm font-bold">REPLAY</span>
          </Button>

          {/* Quit Button */}
          <Button
            onClick={onQuitLevel}
            className="h-20 flex flex-col items-center justify-center rounded-xl border-2 bg-blue-500 hover:bg-blue-600 border-blue-300 text-white transition-all"
          >
            <LogOut className="w-8 h-8 mb-1" />
            <span className="text-sm font-bold">QUIT</span>
          </Button>
        </div>

        {/* Bottom Row - Resume and Get Items */}
        <div className="grid grid-cols-2 gap-4">
          {/* Resume Button */}
          <Button
            onClick={onResume}
            className="h-16 flex items-center justify-center rounded-xl border-2 bg-green-600 hover:bg-green-700 border-green-400 text-white font-bold text-lg transition-all"
          >
            <Play className="w-6 h-6 mr-2" />
            RESUME
          </Button>

          {/* Get Items Button (Future expansion placeholder) */}
          <Button
            disabled
            className="h-16 flex items-center justify-center rounded-xl border-2 bg-blue-500 hover:bg-blue-600 border-blue-300 text-white font-bold transition-all opacity-75"
          >
            <Coins className="w-6 h-6 mr-2" />
            GET ITEMS
          </Button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
        <div className="absolute bottom-4 right-4 w-3 h-3 bg-yellow-400 rounded-full"></div>
      </div>
    </div>
  );
};