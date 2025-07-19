import { blink } from '../blink/client';

// Advanced sound manager with built-in audio generation and AI speech
export class SoundManager {
  private static instance: SoundManager;
  private audioContext: AudioContext | null = null;
  private isMusicMuted = false;
  private isSoundFxMuted = false;
  private masterVolume = 0.7;
  private backgroundMusic: HTMLAudioElement | null = null;
  private isBackgroundMusicPlaying = false;
  private isPaused = false;
  private aiAudioCache: Map<string, string> = new Map(); // Cache for AI-generated audio URLs

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

  // Generate complex sound effects using Web Audio API
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
    // Pleasant "ding" sound for tower placement
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
    // Sharp hit sound
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
    // Descending death sound
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
    // Heroic fanfare
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
    // Sad descending sound
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
    // Triumphant ascending melody
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
    // Quick click sound
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
    // Powerful magical sound
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
    // Pleasant coin collection sound
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

  // Play tower voice line with appropriate accent
  async playTowerVoiceLine(towerType: string, voiceLine: string, accent?: string, volume: number = 0.7) {
    if (this.isSoundFxMuted) return;

    try {
      // Play a sound effect first
      this.playSound('tower_place', volume * 0.3);
      
      // Convert voice lines to rural Irish accent (except Prime Mutton who gets English)
      let accentedVoiceLine = voiceLine;
      
      if (accent === 'english') {
        // Prime Mutton keeps English accent - no changes needed
        accentedVoiceLine = voiceLine;
      } else if (towerType === 'bartender') {
        // Hardcode Paddy Losty's exact line to ensure consistency
        accentedVoiceLine = "I wouldn't be fond of drinking";
      } else {
        // Convert to rural Irish accent for other towers
        accentedVoiceLine = this.convertToRuralIrish(voiceLine);
      }
      
      // Determine voice based on tower type
      let voice = 'nova'; // Default female voice
      
      if (towerType === 'bartender') {
        voice = 'onyx'; // Male voice for Paddy Losty
      } else if (towerType === 'bouncer') {
        voice = 'nova'; // Female voice for Maureen
      } else if (towerType === 'fiddler' && accent === 'english') {
        voice = 'onyx'; // Male voice for Prime Mutton
      } else if (towerType === 'leprechaun') {
        voice = 'nova'; // Female voice for Lucky
      }

      console.log(`🗣️ Playing ${towerType} voice line: "${accentedVoiceLine}" with ${voice} voice`);

      // Generate and play AI speech with accented voice line
      const audioUrl = await this.generateAIVoice(accentedVoiceLine, voice === 'onyx' ? 'male' : 'female');
      
      if (audioUrl) {
        // Delay the speech slightly so it doesn't overlap with the sound effect
        setTimeout(async () => {
          await this.playAIAudio(audioUrl, volume);
        }, 300);
      } else {
        // Fallback to browser speech synthesis
        setTimeout(() => {
          if (accent === 'english') {
            this.speakEnglishPhrase(accentedVoiceLine, towerType);
          } else {
            this.speakIrishPhrase(accentedVoiceLine, towerType);
          }
        }, 300);
      }
      
    } catch (error) {
      console.warn(`⚠️ Error playing ${towerType} voice line, using fallback:`, error.message || error);
      // Fallback to browser speech synthesis
      this.playSound('tower_place', volume * 0.5);
      setTimeout(() => {
        const accentedLine = accent === 'english' ? voiceLine : this.convertToRuralIrish(voiceLine);
        if (accent === 'english') {
          this.speakEnglishPhrase(accentedLine, towerType);
        } else {
          this.speakIrishPhrase(accentedLine, towerType);
        }
      }, 200);
    }
  }

  // Convert text to rural Irish accent
  convertToRuralIrish(text: string): string {
    let irishText = text;
    
    // Common rural Irish speech patterns
    irishText = irishText.replace(/\bthe\b/gi, 'de');
    irishText = irishText.replace(/\bthis\b/gi, 'dis');
    irishText = irishText.replace(/\bthat\b/gi, 'dat');
    irishText = irishText.replace(/\bthree\b/gi, 'tree');
    irishText = irishText.replace(/\bthink\b/gi, 'tink');
    irishText = irishText.replace(/\bthing\b/gi, 'ting');
    irishText = irishText.replace(/\bwith\b/gi, 'wit');
    irishText = irishText.replace(/\bwould\b/gi, 'would');
    irishText = irishText.replace(/\bwouldn't\b/gi, 'wouldn\'t');
    irishText = irishText.replace(/\bI am\b/gi, 'I\'m');
    irishText = irishText.replace(/\bI have\b/gi, 'I\'ve');
    irishText = irishText.replace(/\bgoing to\b/gi, 'gonna');
    irishText = irishText.replace(/\bwant to\b/gi, 'wanna');
    
    // Add rural Irish expressions
    if (irishText.includes('drinking') || irishText.includes('drink')) {
      irishText = irishText.replace(/drinking/gi, 'takin\' a drop');
      irishText = irishText.replace(/drink/gi, 'drop');
    }
    
    if (irishText.includes('fry')) {
      irishText = irishText.replace(/fry/gi, 'fry');
    }
    
    // Add "Ah sure" to the beginning for authenticity
    if (!irishText.toLowerCase().startsWith('ah')) {
      irishText = 'Ah sure, ' + irishText.toLowerCase();
    }
    
    return irishText;
  }

  // Enhanced text-to-speech for character voices with rural Irish accents
  speakIrishPhrase(phrase: string, characterType: string = 'default', rate: number = 0.8, pitch: number = 1.0) {
    if (this.isSoundFxMuted) return;

    try {
      // Use the clean phrase without accent prompts
      const utterance = new SpeechSynthesisUtterance(phrase);
      
      // Character-specific voice settings for rural Irish characters
      switch (characterType) {
        case 'paddy_losty':
          utterance.rate = 0.6; // Slower for thick rural accent
          utterance.pitch = 0.7; // Lower pitch for old Irish farmer
          utterance.volume = 0.8;
          break;
        case 'maureen':
          utterance.rate = 0.8; // Moderate pace for Irish grandmother
          utterance.pitch = 1.1; // Slightly higher for female
          utterance.volume = 0.7;
          break;
        case 'seamus':
          utterance.rate = 0.5; // Very slow for thick rural accent
          utterance.pitch = 0.6; // Deep voice
          utterance.volume = 0.9;
          break;
        case 'brigid':
          utterance.rate = 0.9; // Warm speaking pace
          utterance.pitch = 1.2; // Higher female voice
          utterance.volume = 0.6;
          break;
        default:
          utterance.rate = 0.7; // Default slower for Irish accent
          utterance.pitch = pitch;
          utterance.volume = 0.7;
      }
      
      // Prioritize Irish and British voices for authentic accent
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en-IE') || // Irish English first priority
        voice.name.toLowerCase().includes('irish') ||
        voice.lang.includes('en-GB') || // British English second priority
        voice.name.toLowerCase().includes('british') ||
        voice.name.toLowerCase().includes('daniel') ||
        voice.name.toLowerCase().includes('karen') ||
        voice.name.toLowerCase().includes('moira') || // Often Irish-sounding
        voice.name.toLowerCase().includes('rory')    // Often Irish name
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        console.log(`🗣️ Using voice: ${preferredVoice.name} (${preferredVoice.lang}) for ${characterType}`);
      }
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.log('Text-to-speech not supported:', error);
    }
  }

  // Enhanced text-to-speech for English accent
  speakEnglishPhrase(phrase: string, characterType: string = 'default', rate: number = 0.9, pitch: number = 1.0) {
    if (this.isSoundFxMuted) return;

    try {
      const utterance = new SpeechSynthesisUtterance(phrase);
      
      // Character-specific voice settings for English accent
      utterance.rate = 0.8; // Moderate pace for English accent
      utterance.pitch = 0.9; // Slightly lower pitch for distinguished sound
      utterance.volume = 0.7;
      
      // Prioritize British/English voices for authentic accent
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.includes('en-GB') || // British English first priority
        voice.name.toLowerCase().includes('british') ||
        voice.name.toLowerCase().includes('english') ||
        voice.name.toLowerCase().includes('daniel') ||
        voice.name.toLowerCase().includes('oliver') ||
        voice.name.toLowerCase().includes('arthur') ||
        voice.name.toLowerCase().includes('george')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
        console.log(`🗣️ Using English voice: ${preferredVoice.name} (${preferredVoice.lang}) for ${characterType}`);
      }
      
      speechSynthesis.speak(utterance);
    } catch (error) {
      console.log('Text-to-speech not supported:', error);
    }
  }

  // Generate AI speech for characters with appropriate rural Irish accents
  async generateAIVoice(text: string, characterType: string = 'paddy_losty'): Promise<string | null> {
    try {
      // Check cache first
      const cacheKey = `${characterType}_${text}`;
      if (this.aiAudioCache.has(cacheKey)) {
        return this.aiAudioCache.get(cacheKey)!;
      }

      // Check if user is authenticated before attempting AI generation
      try {
        await blink.auth.me();
      } catch (authError) {
        console.info('🔐 Authentication required for AI voice generation, using browser speech');
        return null;
      }

      // Choose voice based on character type - use clean text without accent prompts
      let voice = 'nova'; // Default female voice
      
      if (characterType === 'paddy_losty' || characterType === 'male') {
        voice = 'onyx'; // Male voice for Paddy Losty and male characters
      } else if (characterType === 'maureen' || characterType === 'female') {
        voice = 'nova'; // Female voice for Maureen and female characters
      }

      // Generate AI speech using Blink SDK with just the clean text
      const { url } = await blink.ai.generateSpeech({
        text: text, // Use clean text without accent prompts
        voice: voice
      });
      
      // Cache the URL
      this.aiAudioCache.set(cacheKey, url);
      
      return url;
    } catch (error) {
      console.warn('⚠️ AI voice generation failed, falling back to browser speech:', error.message || error);
      return null;
    }
  }



  // Play AI-generated audio
  async playAIAudio(audioUrl: string, volume: number = 0.7): Promise<void> {
    if (this.isSoundFxMuted) return;

    try {
      const audio = new Audio(audioUrl);
      audio.volume = volume * this.masterVolume;
      
      // Play the audio
      await audio.play();
    } catch (error) {
      console.error('❌ Failed to play AI audio:', error);
    }
  }

  // Play Paddy Losty's audio file when placing him
  async playPaddyLostyAudio(volume: number = 1.2): Promise<void> {
    if (this.isSoundFxMuted) return;

    try {
      const audio = new Audio('/audio/paddy-losty.mp3');
      audio.volume = volume * this.masterVolume;
      
      console.log('🗣️ Playing Paddy Losty: "I wouldn\'t be fond of drinking"');
      
      // Play the audio
      await audio.play();
    } catch (error) {
      console.error('❌ Failed to play Paddy Losty audio:', error);
    }
  }

  // Play character-specific audio with AI-generated speech
  async playCharacterAudio(characterType: string, volume: number = 0.7) {
    if (this.isSoundFxMuted) return;

    // For Paddy Losty, use AI-generated speech with exact phrase
    if (characterType === 'paddy_losty') {
      try {
        // Play a sound effect first
        this.playSound('tower_place', volume * 0.3);
        
        // Use the exact phrase we want - no accent conversion
        const exactPhrase = "I wouldn't be fond of drinking";
        
        // Generate and play AI speech with exact phrase
        const audioUrl = await this.generateAIVoice(exactPhrase, 'male');
        
        if (audioUrl) {
          // Delay the speech slightly so it doesn't overlap with the sound effect
          setTimeout(async () => {
            await this.playAIAudio(audioUrl, volume);
          }, 300);
        } else {
          // Fallback to browser speech synthesis with exact phrase
          setTimeout(() => {
            this.speakIrishPhrase(exactPhrase, characterType);
          }, 300);
        }
        
        return;
      } catch (error) {
        console.warn('⚠️ Error with Paddy Losty AI voice, using fallback:', error.message || error);
        // Fallback to browser speech synthesis with exact phrase
        this.playSound('tower_place', volume * 0.5);
        setTimeout(() => {
          const exactPhrase = "I wouldn't be fond of drinking";
          this.speakIrishPhrase(exactPhrase, characterType);
        }, 200);
        return;
      }
    }

    // For Maureen, use AI-generated speech
    if (characterType === 'maureen') {
      try {
        // Play a sound effect first
        this.playSound('tower_place', volume * 0.3);
        
        // Use rural Irish accent
        const ruralPhrase = this.convertToRuralIrish("I have the fry on for ye!");
        
        // Generate and play AI speech with rural Irish phrase
        const audioUrl = await this.generateAIVoice(ruralPhrase, 'female');
        
        if (audioUrl) {
          // Delay the speech slightly so it doesn't overlap with the sound effect
          setTimeout(async () => {
            await this.playAIAudio(audioUrl, volume);
          }, 300);
        } else {
          // Fallback to browser speech synthesis
          setTimeout(() => {
            this.speakIrishPhrase(ruralPhrase, characterType);
          }, 300);
        }
        
        return;
      } catch (error) {
        console.warn('⚠️ Error with Maureen AI voice, using fallback:', error.message || error);
        // Fallback to browser speech synthesis
        this.playSound('tower_place', volume * 0.5);
        setTimeout(() => {
          const ruralPhrase = this.convertToRuralIrish("I have the fry on for ye!");
          this.speakIrishPhrase(ruralPhrase, characterType);
        }, 200);
        return;
      }
    }

    // For other characters, use authentic rural Irish phrases
    const characterPhrases: { [key: string]: string[] } = {
      'seamus': [
        "Céad míle fáilte, a stór!",
        "Fair play to ye now!",
        "Ah sure, 'tis grand altogether!",
        "The music's startin' up fierce!",
        "Begorra, that's the way!",
        "Slán go fóill!"
      ],
      'brigid': [
        "Ah bless yer heart, love!",
        "Mind yerself now, pet!",
        "That's the way of it!",
        "Safe home to ye!",
        "God bless and keep ye!",
        "Ah sure, ye're grand!"
      ]
    };

    const phrases = characterPhrases[characterType] || ["Hello there!"];
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    
    // Play a sound effect first, then the voice
    this.playSound('tower_place', volume * 0.5);
    
    // Delay the speech slightly so it doesn't overlap with the sound effect
    setTimeout(() => {
      this.speakIrishPhrase(randomPhrase, characterType);
    }, 200);
  }

  // Play special attack voice lines
  async playSpecialAttackAudio(attackType: string, volume: number = 0.7) {
    if (this.isSoundFxMuted) return;

    if (attackType === 'peanuts') {
      try {
        // Play the uploaded Peanuts audio file directly
        const audio = new Audio('/audio/peanuts.mp3');
        audio.volume = volume * this.masterVolume;
        
        console.log('🗣️ Playing Peanuts special attack audio file');
        
        // Play the audio
        await audio.play();
        return;
      } catch (error) {
        console.warn('⚠️ Error playing Peanuts audio file, using fallback sound effect:', error.message || error);
        // Fallback to sound effect only
        this.playSound('special_attack', volume);
        return;
      }
    }

    if (attackType === 'shirt') {
      try {
        // Play the uploaded Shirt audio file directly
        const audio = new Audio('/audio/shirt.mp3');
        audio.volume = volume * this.masterVolume;
        
        console.log('🗣️ Playing Shirt special attack audio file');
        
        // Play the audio
        await audio.play();
        return;
      } catch (error) {
        console.warn('⚠️ Error playing Shirt audio file, using fallback sound effect:', error.message || error);
        // Fallback to sound effect only
        this.playSound('special_attack', volume);
        return;
      }
    }
  }

  // Play Fiddle De Dee background music
  startBackgroundMusic() {
    if (this.isMusicMuted || this.isBackgroundMusicPlaying) return;

    try {
      console.log('🎵 Starting Fiddle De Dee background music...');
      
      // Create audio element for the new soundtrack
      this.backgroundMusic = new Audio('/audio/fiddle-de-dee.mp3');
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.3 * this.masterVolume; // Moderate volume
      
      // Play the audio
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

  // Pause/resume background music
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

  // Legacy method for backward compatibility
  toggleMute() {
    const musicMuted = this.toggleMusicMute();
    this.setSoundFxMuted(musicMuted);
    return musicMuted;
  }

  // Legacy method for backward compatibility
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

  // Legacy method for backward compatibility
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

// Character-specific audio functions for placement sounds
export const playPaddyLostyAudio = () => {
  try {
    const audio = new Audio('/audio/paddy-losty.mp3');
    audio.volume = 1.0; // 50% louder than 0.7
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
    audio.play().catch(error => {
      console.error('Error playing Maureen audio:', error);
    });
  } catch (error) {
    console.error('Error creating Maureen audio:', error);
  }
};

export const playPrimeMuttonAudio = () => {
  try {
    const audio = new Audio('/audio/prime-mutton.mp3');
    audio.volume = 0.7;
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