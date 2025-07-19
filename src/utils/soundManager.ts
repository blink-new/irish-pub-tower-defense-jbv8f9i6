// Simplified sound manager for Irish Pub Tower Defense
// Only handles MP3 files for pub defenders and basic game sounds

export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private isMusicMuted = false;
  private isSoundFxMuted = false;
  private masterVolume = 0.7;
  private backgroundMusic: HTMLAudioElement | null = null;
  private isBackgroundMusicPlaying = false;
  private isPaused = false;

  static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  private getAudioContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  initializeSounds() {
    try {
      this.getAudioContext();
      console.log('🎵 Sound system initialized successfully');
    } catch (error) {
      console.log('Audio not supported in this browser');
    }
  }

  // Generate simple sound effects using Web Audio API
  playSound(soundName: string, volume: number = 0.3) {
    if (this.isSoundFxMuted) return;

    try {
      const audioContext = this.getAudioContext();
      const now = audioContext.currentTime;

      switch (soundName) {
        case 'tower_place':
          this.playTowerPlaceSound(audioContext, now, volume);
          break;
        case 'enemy_hit':
          this.playEnemyHitSound(audioContext, now, volume);
          break;
        case 'enemy_death':
          this.playEnemyDeathSound(audioContext, now, volume);
          break;
        case 'wave_start':
          this.playWaveStartSound(audioContext, now, volume);
          break;
        case 'game_over':
          this.playGameOverSound(audioContext, now, volume);
          break;
        case 'victory':
          this.playVictorySound(audioContext, now, volume);
          break;
        case 'button_click':
          this.playButtonClickSound(audioContext, now, volume);
          break;
        case 'special_attack':
          this.playSpecialAttackSound(audioContext, now, volume);
          break;
        case 'coin_collect':
          this.playCoinCollectSound(audioContext, now, volume);
          break;
        default:
          this.playDefaultSound(audioContext, now, volume);
      }
    } catch (error) {
      console.log('Could not play sound:', soundName);
    }
  }

  private playTowerPlaceSound(audioContext: AudioContext, now: number, volume: number) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  private playEnemyHitSound(audioContext: AudioContext, now: number, volume: number) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(300, now);
    oscillator.frequency.exponentialRampToValueAtTime(150, now + 0.05);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume, now + 0.005);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }

  private playEnemyDeathSound(audioContext: AudioContext, now: number, volume: number) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, now);
    oscillator.frequency.exponentialRampToValueAtTime(100, now + 0.3);
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    
    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  private playWaveStartSound(audioContext: AudioContext, now: number, volume: number) {
    const frequencies = [440, 554, 659]; // A, C#, E chord
    
    frequencies.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, now + index * 0.1);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, now + index * 0.1);
      gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume * 0.7, now + index * 0.1 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * 0.1 + 0.5);
      
      oscillator.start(now + index * 0.1);
      oscillator.stop(now + index * 0.1 + 0.5);
    });
  }

  private playGameOverSound(audioContext: AudioContext, now: number, volume: number) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(220, now);
    oscillator.frequency.exponentialRampToValueAtTime(110, now + 1.0);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume, now + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
    
    oscillator.start(now);
    oscillator.stop(now + 1.0);
  }

  private playVictorySound(audioContext: AudioContext, now: number, volume: number) {
    const melody = [440, 494, 554, 659, 740]; // A, B, C#, E, F#
    
    melody.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, now + index * 0.15);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, now + index * 0.15);
      gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume * 0.8, now + index * 0.15 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + index * 0.15 + 0.3);
      
      oscillator.start(now + index * 0.15);
      oscillator.stop(now + index * 0.15 + 0.3);
    });
  }

  private playButtonClickSound(audioContext: AudioContext, now: number, volume: number) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(1000, now);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume * 0.5, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    
    oscillator.start(now);
    oscillator.stop(now + 0.05);
  }

  private playSpecialAttackSound(audioContext: AudioContext, now: number, volume: number) {
    const oscillator1 = audioContext.createOscillator();
    const oscillator2 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator1.connect(gainNode);
    oscillator2.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator1.frequency.setValueAtTime(200, now);
    oscillator1.frequency.exponentialRampToValueAtTime(800, now + 0.2);
    oscillator1.type = 'sawtooth';
    
    oscillator2.frequency.setValueAtTime(400, now);
    oscillator2.frequency.exponentialRampToValueAtTime(1600, now + 0.2);
    oscillator2.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    
    oscillator1.start(now);
    oscillator1.stop(now + 0.4);
    oscillator2.start(now);
    oscillator2.stop(now + 0.4);
  }

  private playCoinCollectSound(audioContext: AudioContext, now: number, volume: number) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(1600, now + 0.1);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume * 0.6, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }

  private playDefaultSound(audioContext: AudioContext, now: number, volume: number) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume * this.masterVolume, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }

  // Play special attack audio files
  async playSpecialAttackAudio(attackType: string, volume: number = 0.7) {
    if (this.isSoundFxMuted) return;

    if (attackType === 'peanuts') {
      try {
        const audio = new Audio('/audio/peanuts.mp3');
        audio.volume = volume * this.masterVolume;
        console.log('🗣️ Playing Peanuts special attack audio file');
        await audio.play();
        return;
      } catch (error) {
        console.warn('⚠️ Error playing Peanuts audio file, using fallback sound effect:', error);
        this.playSound('special_attack', volume);
        return;
      }
    }

    if (attackType === 'shirt') {
      try {
        const audio = new Audio('/audio/shirt.mp3');
        audio.volume = volume * this.masterVolume;
        console.log('🗣️ Playing Shirt special attack audio file');
        await audio.play();
        return;
      } catch (error) {
        console.warn('⚠️ Error playing Shirt audio file, using fallback sound effect:', error);
        this.playSound('special_attack', volume);
        return;
      }
    }
  }

  // Background music controls
  startBackgroundMusic() {
    if (this.isMusicMuted || this.isBackgroundMusicPlaying) return;

    try {
      console.log('🎵 Starting Fiddle De Dee background music...');
      
      this.backgroundMusic = new Audio('/audio/fiddle-de-dee.mp3');
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.3 * this.masterVolume;
      
      this.backgroundMusic.play().then(() => {
        this.isBackgroundMusicPlaying = true;
        this.isPaused = false;
        console.log('🎵 Fiddle De Dee soundtrack started successfully');
      }).catch(error => {
        console.error('❌ Failed to play Fiddle De Dee soundtrack:', error);
        this.isBackgroundMusicPlaying = false;
      });
      
    } catch (error) {
      console.log('Could not start background music:', error);
    }
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      try {
        this.backgroundMusic.pause();
        this.backgroundMusic.currentTime = 0;
        this.backgroundMusic = null;
      } catch (error) {
        console.log('Error stopping background music:', error);
      }
    }
    
    this.isBackgroundMusicPlaying = false;
    this.isPaused = false;
  }

  pauseBackgroundMusic() {
    if (!this.isBackgroundMusicPlaying || this.isPaused) return;
    
    this.isPaused = true;
    console.log('🎵 Background music paused');
    
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
  }

  resumeBackgroundMusic() {
    if (!this.isBackgroundMusicPlaying || !this.isPaused) return;
    
    this.isPaused = false;
    console.log('🎵 Background music resumed');
    
    if (this.backgroundMusic) {
      this.backgroundMusic.play().catch(error => {
        console.error('❌ Failed to resume background music:', error);
      });
    }
  }

  // Audio control methods
  toggleMusicMute() {
    this.isMusicMuted = !this.isMusicMuted;
    
    if (this.isMusicMuted) {
      this.stopBackgroundMusic();
    } else {
      this.startBackgroundMusic();
    }
    
    return this.isMusicMuted;
  }

  toggleSoundFxMute() {
    this.isSoundFxMuted = !this.isSoundFxMuted;
    return this.isSoundFxMuted;
  }

  setMusicMuted(muted: boolean) {
    this.isMusicMuted = muted;
    
    if (this.isMusicMuted) {
      this.stopBackgroundMusic();
    } else {
      this.startBackgroundMusic();
    }
  }

  setSoundFxMuted(muted: boolean) {
    this.isSoundFxMuted = muted;
  }

  // Legacy methods for backward compatibility
  toggleMute() {
    const musicMuted = this.toggleMusicMute();
    this.setSoundFxMuted(musicMuted);
    return musicMuted;
  }

  setMuted(muted: boolean) {
    this.setMusicMuted(muted);
    this.setSoundFxMuted(muted);
  }

  isMusicMuted() {
    return this.isMusicMuted;
  }

  isSoundFxMuted() {
    return this.isSoundFxMuted;
  }

  isSoundMuted() {
    return this.isMusicMuted || this.isSoundFxMuted;
  }

  setMasterVolume(volume: number) {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  getMasterVolume() {
    return this.masterVolume;
  }
}

// Simple character-specific audio functions for the 4 pub defenders
export const playPaddyLostyAudio = () => {
  try {
    const audio = new Audio('/audio/paddy-losty.mp3');
    audio.volume = 0.7;
    console.log('🗣️ Playing Paddy Losty: "I wouldn\'t be fond of drinking"');
    audio.play().catch(error => {
      console.error('Error playing Paddy Losty audio:', error);
    });
  } catch (error) {
    console.error('Error creating Paddy Losty audio:', error);
  }
};

export const playMaureenAudio = () => {
  try {
    const audio = new Audio('/audio/maureen.mp3');
    audio.volume = 0.7;
    console.log('🗣️ Playing Maureen: "I have the fry on"');
    audio.play().catch(error => {
      console.error('Error playing Maureen audio:', error);
      // Fallback to sound effect if audio file doesn't exist
      soundManager.playSound('tower_place', 0.7);
    });
  } catch (error) {
    console.error('Error creating Maureen audio:', error);
    // Fallback to sound effect if audio file doesn't exist
    soundManager.playSound('tower_place', 0.7);
  }
};

export const playPrimeMuttonAudio = () => {
  try {
    const audio = new Audio('/audio/prime-mutton.mp3');
    audio.volume = 0.7;
    console.log('🗣️ Playing Prime Mutton: "It\'s an absolute creamer"');
    audio.play().catch(error => {
      console.error('Error playing Prime Mutton audio:', error);
    });
  } catch (error) {
    console.error('Error creating Prime Mutton audio:', error);
  }
};

export const playJohnBKeaneAudio = () => {
  try {
    const audio = new Audio('/audio/john-b-keane.mp3');
    audio.volume = 0.7;
    console.log('🗣️ Playing John B Keane: "Sláinte! Here\'s to good health!"');
    audio.play().catch(error => {
      console.error('Error playing John B Keane audio:', error);
    });
  } catch (error) {
    console.error('Error creating John B Keane audio:', error);
  }
};

// Legacy function name for backward compatibility
export const playLuckyAudio = playJohnBKeaneAudio;

export const soundManager = SoundManager.getInstance();