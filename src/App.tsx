import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useState, useCallback, useRef } from 'react'
import GameBoard from './components/game/GameBoard'
import Tetromino from './components/game/Tetromino'
import DebugGrid from './components/game/DebugGrid'
import { BOARD_POSITION, BOARD_HEIGHT, BOARD_WIDTH } from './constants/game'
import { TetrominoState } from './types/tetromino'
import { useGameControls } from './hooks/use-game-controls'
import { useGameStore } from './store/game-store'
import { PieceGenerator } from './utils/piece-generator'

// Game settings
const INITIAL_DROP_SPEED = 1000 // 1 second
const FAST_DROP_SPEED = 100 // 0.1 seconds

function Scene({ showDebugGrid }: { showDebugGrid: boolean }) {
  // Create a ref for the piece generator to persist between renders
  const pieceGeneratorRef = useRef<PieceGenerator | null>(null)
  if (!pieceGeneratorRef.current) {
    pieceGeneratorRef.current = new PieceGenerator()
  }

  const [currentPiece, setCurrentPiece] = useState<TetrominoState>(() => 
    pieceGeneratorRef.current!.generatePiece()
  )
  const [nextPieces, setNextPieces] = useState<TetrominoState[]>(() => [
    pieceGeneratorRef.current!.generatePiece()
  ])

  const [dropSpeed, setDropSpeed] = useState(INITIAL_DROP_SPEED)
  
  // Use Zustand store
  const { 
    board,
    isPaused,
    placePiece,
    canPlacePiece,
    clearLines,
    setGameOver
  } = useGameStore()

  const checkGameOver = useCallback((piece: TetrominoState): boolean => {
    return !canPlacePiece(piece)
  }, [canPlacePiece])

  const generateNextPiece = useCallback(() => {
    const generator = pieceGeneratorRef.current!
    const newPiece = nextPieces[0]
    const newNextPiece = generator.generatePiece()
    
    // Check if the new piece can be placed
    if (checkGameOver(newPiece)) {
      setGameOver()
      return
    }
    
    setCurrentPiece(newPiece)
    setNextPieces([newNextPiece])
  }, [nextPieces, checkGameOver, setGameOver])

  const onPieceLanded = useCallback(() => {
    placePiece(currentPiece)
    clearLines()
    generateNextPiece()
  }, [currentPiece, placePiece, clearLines, generateNextPiece])

  // Initialize game controls
  const { startDropping, stopDropping } = useGameControls({
    piece: currentPiece,
    setPiece: setCurrentPiece,
    dropSpeed,
    onPieceLanded,
    canPlacePiece,
    isPaused
  })

  // Calculate the center of the board for camera target
  const boardCenter: [number, number, number] = [
    BOARD_POSITION[0] + BOARD_WIDTH / 2,
    BOARD_POSITION[1] + BOARD_HEIGHT / 2,
    BOARD_POSITION[2]
  ]

  return (
    <>
      {/* Ambient light for general scene illumination */}
      <ambientLight intensity={0.5} />
      {/* Directional light for shadows and depth */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* Game board */}
      <GameBoard board={board} />
      {/* Active Tetromino */}
      <Tetromino state={currentPiece} />
      {/* Next piece preview */}
      {nextPieces.map((piece, index) => (
        <group key={index} position={[BOARD_POSITION[0] + BOARD_WIDTH + 6, BOARD_HEIGHT - 2 - index * 3, 0]}>
          <Tetromino state={{...piece, position: [0, 0]}} />
        </group>
      ))}
      {showDebugGrid && <DebugGrid />}
      {/* Controls for camera manipulation during development */}
      <OrbitControls target={boardCenter} />
    </>
  )
}

function App() {
  const [showDebugGrid, setShowDebugGrid] = useState(false)
  const { togglePause, resetGame, isGameOver, score } = useGameStore()
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ 
          position: [0, BOARD_HEIGHT / 2, 23],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
        shadows
      >
        <Scene showDebugGrid={showDebugGrid}/>
      </Canvas>
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        zIndex: 1000,
        display: 'flex',
        gap: '10px'
      }}>
        <button
          onClick={togglePause}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4a4a4a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Pause
        </button>
        <button
          onClick={() => setShowDebugGrid(prev => !prev)}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#4a4a4a',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Toggle Grid
        </button>
      </div>
      {/* Game Over overlay */}
      {isGameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '2rem',
          borderRadius: '10px',
          textAlign: 'center',
          color: 'white',
          zIndex: 1000
        }}>
          <h2 style={{ marginBottom: '1rem' }}>Game Over!</h2>
          <p style={{ marginBottom: '1rem' }}>Score: {score}</p>
          <button
            onClick={resetGame}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

export default App
