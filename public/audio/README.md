# Audio System - Irish Pub Tower Defense

## Background Music

🎵 **Fiddle De Dee by Silverman Sound Studios**
- High-quality Celtic fiddle music for authentic Irish atmosphere
- Loops continuously during gameplay
- Volume automatically adjusts with master volume settings
- Graceful fallback to generated Celtic ambient music if file fails to load

## Built-in Sound Effects

🎵 **Dynamic Sound Effects**
- Tower placement sounds
- Enemy hit/death sounds  
- Wave start fanfares
- Victory/defeat music
- Button click feedback
- Coin collection sounds

🗣️ **Character Voices (Audio Files)**
- **Paddy Losty (Bartender)**: "I wouldn't be fond of drinking" voice clip
- **Maureen (Bouncer)**: Authentic Irish voice recordings
- **Creamer (Prime Mutton)**: Character-specific voice lines
- **John B Keane (Leprechaun)**: Traditional Irish storyteller voice

### How It Works:

1. **Background Music**: Plays the "Fiddle De Dee" audio file on loop
2. **Web Audio API**: Creates all sound effects using oscillators and gain nodes
3. **Character Voices**: Uses recorded audio files for authentic Irish voices
4. **Smart Fallbacks**: Works across all modern browsers with graceful degradation

### Controls:

- 🔊/🔇 **Sound Toggle**: Mute/unmute all audio including background music
- **Character Voices**: Automatically play when placing towers
- **Sound Effects**: Triggered by game events (hits, deaths, waves, etc.)

### Technical Details:

- Background music: `/audio/fiddle-de-dee.mp3` (Silverman Sound Studios)
- Character voices: Individual MP3 files for each character
- Uses `AudioContext` for precise sound effect generation
- Automatic volume control and mute functionality
- Looping background music with pause/resume support

**Enjoy the authentic Irish pub atmosphere with traditional Celtic music!** 🍀🎵