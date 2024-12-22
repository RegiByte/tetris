import { useEffect } from 'react'
import { useAudioStore } from '../../store/audio-store'
import { useGameStore } from '../../store/game-store'

function AudioManager() {
  const { hasStarted, isPaused, isGameOver } = useGameStore()
  const { 
    initializeAudio,
    playBGM,
    pauseBGM,
    stopBGM
  } = useAudioStore()

  // Initialize audio on mount
  useEffect(() => {
    initializeAudio()
    // Cleanup on unmount
    return () => {
      stopBGM()
    }
  }, [initializeAudio, stopBGM])

  // Handle game state changes
  useEffect(() => {
    if (hasStarted && !isPaused && !isGameOver) {
      playBGM()
    } else {
      // Just pause instead of stopping, so we can resume from the same position
      pauseBGM()
    }

    if (isGameOver) {
      stopBGM()
    }   
  }, [hasStarted, isPaused, isGameOver, playBGM, pauseBGM, stopBGM])

  // This component doesn't render anything
  return null
}

export default AudioManager 