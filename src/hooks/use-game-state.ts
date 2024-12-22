import { useState, useCallback } from 'react'
import { GameState, GameBoard, BoardCell } from '../types/game'
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/game'
import { TetrominoState } from '../types/tetromino'
import { TETROMINOES } from '../constants/tetrominos'

export function createEmptyBoard(): GameBoard {
  const cells: BoardCell[][] = Array(BOARD_HEIGHT).fill(null).map(() =>
    Array(BOARD_WIDTH).fill(null).map(() => ({
      filled: false,
      color: null
    }))
  )

  return {
    cells,
    width: BOARD_WIDTH,
    height: BOARD_HEIGHT
  }
}

function createEmptyRow(): BoardCell[] {
  return Array(BOARD_WIDTH).fill(null).map(() => ({
    filled: false,
    color: null
  }))
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    score: 0,
    level: 1,
    isGameOver: false,
    isPaused: false
  })

  // Add toggle pause function
  const togglePause = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isPaused: !prev.isPaused
    }))
  }, [])

  // Place a piece permanently on the board
  const placePiece = useCallback((piece: TetrominoState) => {
    const tetromino = TETROMINOES[piece.type]
    const shape = tetromino.shapes[piece.rotation / 90]

    setGameState(prev => {
      const newBoard = {
        ...prev.board,
        cells: prev.board.cells.map(row => [...row])
      }

      // Place each cell of the piece on the board
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x]) {
            const boardY = piece.position[1] + y
            const boardX = piece.position[0] + x

            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              newBoard.cells[boardY][boardX] = {
                filled: true,
                color: piece.color
              }
            }
          }
        }
      }

      return {
        ...prev,
        board: newBoard
      }
    })
  }, [])

  // Check if a piece can be placed at the given position
  const canPlacePiece = useCallback((piece: TetrominoState): boolean => {
    const tetromino = TETROMINOES[piece.type]
    const shape = tetromino.shapes[piece.rotation / 90]

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const boardY = piece.position[1] + y
          const boardX = piece.position[0] + x

          // Check board boundaries
          if (boardY < 0 || boardY >= BOARD_HEIGHT || boardX < 0 || boardX >= BOARD_WIDTH) {
            return false
          }

          // Check collision with placed pieces
          if (gameState.board.cells[boardY][boardX].filled) {
            return false
          }
        }
      }
    }

    return true
  }, [gameState.board.cells])

  // Clear completed lines and make pieces fall
  const clearLines = useCallback(() => {
    setGameState(prev => {
      // Deep copy the current board cells
      let cells = prev.board.cells.map(row => 
        row.map(cell => ({ ...cell }))
      );
      
      let linesCleared = 0;

      cells = cells.filter(row => {
        if (row.every(cell => cell.filled)) {
          linesCleared++;
          return false;
        }
        return true;
      })

      // add new rows to the top of the board
      for (let i = 0; i < linesCleared; i++) {
        cells.push(createEmptyRow());
      }

      // If no lines were cleared, return unchanged state
      if (linesCleared === 0) return prev;

      // Calculate score based on number of lines cleared
      const scoreMultiplier = [0, 40, 100, 300, 1200][linesCleared] || 0;
      const additionalScore = scoreMultiplier * prev.level;

      return {
        ...prev,
        board: {
          ...prev.board,
          cells
        },
        score: prev.score + additionalScore,
        level: Math.floor((prev.score + additionalScore) / 1000) + 1
      };
    });
  }, []);

  const setGameOver = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      isGameOver: true,
      isPaused: true // Pause the game when it's over
    }))
  }, [])

  return {
    gameState,
    setGameState,
    placePiece,
    canPlacePiece,
    clearLines,
    togglePause,
    setGameOver
  }
} 