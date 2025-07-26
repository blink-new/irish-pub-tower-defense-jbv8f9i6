// Simplified sound manager for Irish Pub Tower Defense
// Only handles basic game sounds and effects

export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private isMusicMuted = false;
  private isSoundFxMuted = false;
  private masterVolume = 0.7;
  private backgroundMusic: HTMLAudioElement | null = null;
  private isBackgroundMusicPlaying = false;
  private isPaused = false;
  private hasUserInteracted = false;

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
      
      // Set up user interaction detection
      this.setupUserInteractionDetection();
    } catch (error) {
      console.log('Audio not supported in this browser');
    }
  }

  private setupUserInteractionDetection() {
    const markUserInteraction = () => {
      this.hasUserInteracted = true;
      console.log('🎵 User interaction detected - audio playback enabled');
      
      // Remove listeners after first interaction
      document.removeEventListener('click', markUserInteraction);
      document.removeEventListener('keydown', markUserInteraction);
      document.removeEventListener('touchstart', markUserInteraction);
    };

    // Listen for any user interaction
    document.addEventListener('click', markUserInteraction, { once: true });
    document.addEventListener('keydown', markUserInteraction, { once: true });
    document.addEventListener('touchstart', markUserInteraction, { once: true });
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

  // Play Paddy Losty voice when tower is placed
  async playPaddyLostyVoice(volume: number = 0.8) {
    if (this.isSoundFxMuted) return;

    try {
      const audio = new Audio('/audio/paddy-losty-voice.mp3');
      audio.volume = volume * this.masterVolume;
      console.log('🗣️ Playing Paddy Losty voice: "I wouldn\'t be fond of drinking"');
      await audio.play();
    } catch (error) {
      console.warn('⚠️ Error playing Paddy Losty voice, using fallback sound effect:', error);
      this.playSound('tower_place', volume);
    }
  }

  // Play Maureen voice when tower is placed
  async playMaureenVoice(volume: number = 0.8) {
    if (this.isSoundFxMuted) return;

    try {
      const audio = new Audio('/audio/maureen-voice.mp3');
      audio.volume = volume * this.masterVolume;
      console.log('🗣️ Playing Maureen voice from audio file');
      await audio.play();
    } catch (error) {
      console.warn('⚠️ Error playing Maureen voice, using fallback sound effect:', error);
      this.playSound('tower_place', volume);
    }
  }

  // Play Creamer voice when Prime Mutton tower is placed
  async playCreamerVoice(volume: number = 0.8) {
    if (this.isSoundFxMuted) return;

    try {
      const audio = new Audio('/audio/creamer-voice.mp3');
      audio.volume = volume * this.masterVolume;
      console.log('🗣️ Playing Creamer voice from audio file');
      await audio.play();
    } catch (error) {
      console.warn('⚠️ Error playing Creamer voice, using fallback sound effect:', error);
      this.playSound('tower_place', volume);
    }
  }

  // Play John B Keane voice when leprechaun tower is placed
  async playJohnBKeaneVoice(volume: number = 0.8) {
    if (this.isSoundFxMuted) return;

    try {
      const audio = new Audio('/audio/john-b-keane-voice.mp3');
      audio.volume = volume * this.masterVolume;
      console.log('🗣️ Playing John B Keane voice from audio file');
      await audio.play();
    } catch (error) {
      console.warn('⚠️ Error playing John B Keane voice, using fallback sound effect:', error);
      this.playSound('tower_place', volume);
    }
  }

  // Play special attack audio files
  async playSpecialAttackAudio(attackType: string, volume: number = 0.7) {
    if (this.isSoundFxMuted) {
      console.log('🔇 Sound FX is muted, skipping special attack audio');
      return;
    }

    // Check if user has interacted with the page (required for audio playback)
    if (!this.hasUserInteracted) {
      console.warn('🥜 Cannot play audio - user interaction required first');
      this.playSound('special_attack', volume); // Fallback to Web Audio API sound
      return;
    }

    if (attackType === 'peanuts') {
      try {
        const audio = new Audio('/audio/peanuts.mp3');
        audio.volume = volume * this.masterVolume;
        console.log('🥜 Playing Peanuts special attack audio: "Peanuts!"');
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
        const audio = new Audio('/shirt-audio.mp3');
        audio.volume = volume * this.masterVolume;
        console.log('🗣️ Playing Shirt special attack audio: "I take the shirt off any mans back"');
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
      
      // Play the Fiddle De Dee audio file
      this.startFiddleDeeDeeMusic();
      this.isBackgroundMusicPlaying = true;
      this.isPaused = false;
      console.log('🎵 Fiddle De Dee background music started successfully');
      
    } catch (error) {
      console.log('Could not start background music:', error);
    }
  }

  private startFiddleDeeDeeMusic() {
    try {
      this.backgroundMusic = new Audio('/audio/fiddle-de-dee.mp3');
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.4 * this.masterVolume; // Lower volume for background
      this.backgroundMusic.play().catch(error => {
        console.warn('⚠️ Error playing Fiddle De Dee music, falling back to generated music:', error);
        // Fallback to simple Celtic ambient if file fails
        this.startCelticAmbientFallback();
      });
    } catch (error) {
      console.warn('⚠️ Error loading Fiddle De Dee music, using fallback:', error);
      this.startCelticAmbientFallback();
    }
  }

  private startCelticAmbientFallback() {
    if (!this.audioContext) return;

    const audioContext = this.getAudioContext();
    
    // Create a low-frequency drone for Celtic atmosphere
    const droneOscillator = audioContext.createOscillator();
    const droneGain = audioContext.createGain();
    
    droneOscillator.connect(droneGain);
    droneGain.connect(audioContext.destination);
    
    // Celtic drone frequency (low D note)
    droneOscillator.frequency.setValueAtTime(146.83, audioContext.currentTime);
    droneOscillator.type = 'sawtooth';
    
    // Very low volume for ambient effect
    droneGain.gain.setValueAtTime(0.05 * this.masterVolume, audioContext.currentTime);
    
    droneOscillator.start();
    
    // Store reference for stopping later
    this.backgroundMusic = droneOscillator as any;
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      try {
        // Handle both HTMLAudioElement and OscillatorNode
        if (typeof this.backgroundMusic.stop === 'function') {
          // Web Audio API OscillatorNode
          this.backgroundMusic.stop();
        } else if (typeof this.backgroundMusic.pause === 'function') {
          // HTMLAudioElement
          this.backgroundMusic.pause();
          this.backgroundMusic.currentTime = 0;
        }
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
      if (typeof this.backgroundMusic.pause === 'function') {
        // HTMLAudioElement
        this.backgroundMusic.pause();
      }
    }
  }

  resumeBackgroundMusic() {
    if (!this.isBackgroundMusicPlaying || !this.isPaused) return;
    
    this.isPaused = false;
    console.log('🎵 Background music resumed');
    
    if (this.backgroundMusic) {
      if (typeof this.backgroundMusic.play === 'function') {
        // HTMLAudioElement
        this.backgroundMusic.play().catch(error => {
          console.error('❌ Failed to resume background music:', error);
        });
      }
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

  getMusicMuted() {
    return this.isMusicMuted;
  }

  getSoundFxMuted() {
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

export const soundManager = SoundManager.getInstance();