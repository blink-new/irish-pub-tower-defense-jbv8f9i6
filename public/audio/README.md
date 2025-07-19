# Audio System - Irish Pub Tower Defense

## Built-in Audio System

This game now features a **fully integrated audio system** that works without requiring any external audio files!

### Features:

🎵 **Dynamic Sound Effects**
- Tower placement sounds
- Enemy hit/death sounds  
- Wave start fanfares
- Victory/defeat music
- Button click feedback
- Coin collection sounds

🗣️ **Character Voices (Text-to-Speech)**
- **Paddy Losty (Bartender)**: "I wouldn't be fond of drinking", "Sláinte to ya!", "Time for a pint!"
- **Maureen (Bouncer)**: "Maureen would have the fry on", "Come here to me!", "Ah, go on then!"
- **Seamus (Fiddler)**: "Céad míle fáilte!", "Fair play to ya!", "The music's starting!"
- **Brigid (Cook)**: "Bless your heart!", "Mind yourself now!", "Safe home!"

🎶 **Background Music**
- Ambient Celtic-inspired drone music
- Dynamic frequency changes for atmosphere
- Automatically starts/stops with sound toggle

### How It Works:

1. **Web Audio API**: Creates all sound effects using oscillators and gain nodes
2. **Speech Synthesis**: Uses browser's built-in text-to-speech with Irish/British accents when available
3. **No External Files**: Everything is generated programmatically - no downloads required!
4. **Smart Fallbacks**: Works across all modern browsers with graceful degradation

### Controls:

- 🔊/🔇 **Sound Toggle**: Mute/unmute all audio including background music
- **Character Voices**: Automatically play when placing towers
- **Sound Effects**: Triggered by game events (hits, deaths, waves, etc.)

### Technical Details:

- Uses `AudioContext` for precise sound generation
- Character-specific voice settings (pitch, rate, volume)
- Automatic voice selection (prefers Irish/British accents)
- Background music with randomized frequency variations
- All sounds respect the master volume and mute settings

**No setup required - just play and enjoy the full audio experience!** 🍀🎵