import { useState, useCallback, useEffect } from 'react'
import { OrbitControls } from '@react-three/drei'
import GameBoard from './GameBoard'
import Tetromino from './Tetromino'
import DebugGrid from './DebugGrid'
import ScoreDisplay from './ScoreDisplay'
import { BOARD_POSITION, BOARD_HEIGHT, BOARD_WIDTH } from '../../constants/game'
import { useGameControls } from '../../hooks/use-game-controls'
import { useGameStore } from '../../store/game-store'
import { usePieceStore } from '../../store/piece-store'

// Game settings
const INITIAL_DROP_SPEED = 1000 // 1 second
const FAST_DROP_SPEED = 100 // 0.1 seconds

interface GameSceneProps {
  showDebugGrid: boolean
}

function GameScene({ showDebugGrid }: GameSceneProps) {
  const [dropSpeed, setDropSpeed] = useState(INITIAL_DROP_SPEED)
  
  // Use Zustand stores
  const { 
    board,
    isPaused,
    hasStarted,
    placePiece,
    canPlacePiece,
    clearLines,
    setGameOver,
    score,
    level
  } = useGameStore()

  const {
    currentPiece,
    nextPieces,
    generateNextPiece,
    resetPieceGenerator
  } = usePieceStore()

  const checkGameOver = useCallback((piece: TetrominoState): boolean => {
    return !canPlacePiece(piece)
  }, [canPlacePiece])

  const onPieceLanded = useCallback(() => {
    placePiece(currentPiece)
    clearLines()
    
    // Check if the next piece can be placed
    if (checkGameOver(nextPieces[0])) {
      setGameOver()
      return
    }
    
    generateNextPiece()
  }, [currentPiece, placePiece, clearLines, checkGameOver, setGameOver, generateNextPiece, nextPieces])

  // Initialize game controls
  const { startDropping, stopDropping } = useGameControls({
    piece: currentPiece,
    setPiece: (piece) => usePieceStore.setState({ currentPiece: piece }),
    dropSpeed,
    onPieceLanded,
    canPlacePiece,
    isPaused: isPaused || !hasStarted // Pause if game hasn't started
  })

  // Calculate the center of the board for camera target
  const boardCenter: [number, number, number] = [
    BOARD_POSITION[0] + BOARD_WIDTH / 2,
    BOARD_POSITION[1] + BOARD_HEIGHT / 2,
    BOARD_POSITION[2]
  ]

  // Reset piece generator when starting or resetting the game
  useEffect(() => {
    if (hasStarted) {
      resetPieceGenerator()
    }
  }, [hasStarted, resetPieceGenerator])

  return (
    <>
      {/* Ambient light for general scene illumination */}
      <ambientLight intensity={0.5} />
      {/* Directional light for shadows and depth */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      {/* Score Display */}
      <ScoreDisplay score={score} level={level} />
      {/* Game board */}
      <GameBoard board={board} />
      {/* Only render game elements if the game has started */}
      {hasStarted && (
        <>
          {/* Active Tetromino */}
          <Tetromino state={currentPiece} />
          {/* Next piece preview */}
          {nextPieces.map((piece, index) => (
            <group key={index} position={[BOARD_POSITION[0] + BOARD_WIDTH + 6, BOARD_HEIGHT - 2 - index * 3, 0]}>
              <Tetromino state={{...piece, position: [0, 0]}} />
            </group>
          ))}
        </>
      )}
      {showDebugGrid && <DebugGrid />}
      {/* Controls for camera manipulation during development */}
      <OrbitControls target={boardCenter} />
    </>
  )
}

export default GameScene 