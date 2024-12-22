import { useEffect, useCallback, useRef } from 'react'
import { TetrominoState } from '../types/tetromino'
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/game'
import { isValidMove, tryRotation } from '../utils/tetromino-utils'

interface UseGameControlsProps {
  piece: TetrominoState
  setPiece: (piece: TetrominoState) => void
  dropSpeed?: number // Time in ms between automatic drops
  onPieceLanded?: () => void
  canPlacePiece?: (piece: TetrominoState) => boolean
  isPaused?: boolean
}

export function useGameControls({ 
  piece, 
  setPiece, 
  dropSpeed = 1000, // Default to 1 second
  onPieceLanded,
  canPlacePiece,
  isPaused = false
}: UseGameControlsProps) {
  // Use ref to keep track of the interval
  const dropInterval = useRef<number | null>(null)
  
  const checkCollision = useCallback((dx: number, dy: number): boolean => {
    // First check board boundaries
    if (!isValidMove(piece, dx, dy, BOARD_WIDTH, BOARD_HEIGHT)) {
      return true
    }

    // Then check collision with placed pieces if the function is provided
    if (canPlacePiece) {
      const testPiece = {
        ...piece,
        position: [piece.position[0] + dx, piece.position[1] + dy]
      }
      return !canPlacePiece(testPiece)
    }

    return false
  }, [piece, canPlacePiece])

  const movePiece = useCallback((dx: number, dy: number) => {
    if (checkCollision(dx, dy)) {
      // If moving down and collision detected, the piece has landed
      if (dy < 0 && onPieceLanded) {
        onPieceLanded()
      }
      return false
    }

    setPiece({
      ...piece,
      position: [piece.position[0] + dx, piece.position[1] + dy],
    })
    
    return true
  }, [piece, setPiece, checkCollision, onPieceLanded])

  const rotatePiece = useCallback(() => {
    const result = tryRotation(piece, BOARD_WIDTH, BOARD_HEIGHT)
    
    if (result.success && result.newPosition && result.newRotation !== undefined) {
      // Check collision with placed pieces
      if (canPlacePiece) {
        const testPiece = {
          ...piece,
          position: result.newPosition,
          rotation: result.newRotation
        }
        if (!canPlacePiece(testPiece)) {
          return false
        }
      }

      setPiece({
        ...piece,
        position: result.newPosition,
        rotation: result.newRotation
      })
      return true
    }
    
    return false
  }, [piece, setPiece, canPlacePiece])

  // Handle automatic dropping
  const startDropping = useCallback(() => {
    if (dropInterval.current || isPaused) return

    dropInterval.current = window.setInterval(() => {
      movePiece(0, -1)
    }, dropSpeed)
  }, [movePiece, dropSpeed, isPaused])

  const stopDropping = useCallback(() => {
    if (dropInterval.current) {
      clearInterval(dropInterval.current)
      dropInterval.current = null
    }
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (isPaused) return

    switch (event.code) {
      case 'ArrowLeft':
        movePiece(-1, 0)
        break
      case 'ArrowRight':
        movePiece(1, 0)
        break
      case 'ArrowDown':
        movePiece(0, -1)
        break
      case 'ArrowUp':
      case 'Space':
        rotatePiece()
        break
      default:
        break
    }
  }, [movePiece, rotatePiece, isPaused])

  // Start dropping when component mounts or pause state changes
  useEffect(() => {
    if (isPaused) {
      stopDropping()
    } else {
      startDropping()
    }
    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      stopDropping()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, startDropping, stopDropping, isPaused])

  return {
    movePiece,
    rotatePiece,
    startDropping,
    stopDropping
  }
} 