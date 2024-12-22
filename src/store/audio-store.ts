import { create } from 'zustand'
import { Howl } from 'howler'

interface AudioStore {
  // State
  bgm: Howl | null
  isMuted: boolean
  volume: number
  // Actions
  initializeAudio: () => void
  playBGM: () => void
  pauseBGM: () => void
  stopBGM: () => void
  setVolume: (volume: number) => void
  toggleMute: () => void
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  // Initial state
  bgm: null,
  isMuted: false,
  volume: 0.5,

  // Actions
  initializeAudio: () => {
    const bgm = new Howl({
      src: ['/sounds/background.wav'],
      loop: true,
      volume: get().volume,
      autoplay: false,
      preload: true,
      html5: true, // Better for streaming music
    })

    set({ bgm })
  },

  playBGM: () => {
    const { bgm, isMuted } = get()
    if (!bgm || isMuted) return

    // Howler handles the play promise internally
    bgm.play()
  },

  pauseBGM: () => {
    const { bgm } = get()
    if (!bgm) return

    bgm.pause()
  },

  stopBGM: () => {
    const { bgm } = get()
    if (!bgm) return

    bgm.stop()
  },

  setVolume: (volume: number) => {
    const { bgm } = get()
    const normalizedVolume = Math.max(0, Math.min(1, volume))
    
    if (bgm) {
      bgm.volume(normalizedVolume)
    }
    
    set({ volume: normalizedVolume })
  },

  toggleMute: () => {
    const { bgm, isMuted } = get()
    if (!bgm) return

    if (isMuted) {
      bgm.mute(false)
      bgm.volume(get().volume)
    } else {
      bgm.mute(true)
    }

    set({ isMuted: !isMuted })
  }
})) 