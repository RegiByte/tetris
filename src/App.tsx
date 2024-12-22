import { Canvas } from '@react-three/fiber'
import { useState } from 'react'
import { BOARD_HEIGHT } from './constants/game'
import { useGameStore } from './store/game-store'
import GameScene from './components/game/GameScene'
import StartScreen from './components/ui/StartScreen'
import GameControls from './components/ui/GameControls'
import GameOverOverlay from './components/ui/GameOverOverlay'
import AudioManager from './components/audio/AudioManager'
import VolumeControl from './components/ui/VolumeControl'

function App() {
  const [showDebugGrid, setShowDebugGrid] = useState(false)
  const { 
    togglePause, 
    resetGame, 
    startGame,
    isGameOver, 
    hasStarted,
    score 
  } = useGameStore()
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <AudioManager />
      <VolumeControl />

      <Canvas
        camera={{ 
          position: [0, BOARD_HEIGHT / 2, 25],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        shadows
      >
        <GameScene showDebugGrid={showDebugGrid} />
      </Canvas>

      {!hasStarted && <StartScreen onStart={startGame} />}
      
      {hasStarted && (
        <GameControls 
          onPause={togglePause}
          onToggleDebug={() => setShowDebugGrid(prev => !prev)}
        />
      )}

      {isGameOver && (
        <GameOverOverlay 
          score={score}
          onRestart={resetGame}
        />
      )}
    </div>
  )
}

export default App
