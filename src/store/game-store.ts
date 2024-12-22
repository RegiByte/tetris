import { create } from 'zustand'
import { TetrominoState } from '../types/tetromino'
import { GameState, GameBoard } from '../types/game'
import { BOARD_WIDTH, BOARD_HEIGHT } from '../constants/game'
import { TETROMINOES } from '../constants/tetrominos'
import { usePieceStore } from './piece-store'

function createEmptyBoard(): GameBoard {
  const cells = Array(BOARD_HEIGHT).fill(null).map(() =>
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

function createEmptyRow() {
  return Array(BOARD_WIDTH).fill(null).map(() => ({
    filled: false,
    color: null
  }))
}

interface GameStore extends GameState {
  // State
  hasStarted: boolean
  // Actions
  placePiece: (piece: TetrominoState) => void
  canPlacePiece: (piece: TetrominoState) => boolean
  clearLines: () => void
  togglePause: () => void
  setGameOver: () => void
  resetGame: () => void
  startGame: () => void
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial state
  board: createEmptyBoard(),
  score: 0,
  level: 1,
  isGameOver: false,
  isPaused: false,
  hasStarted: false,

  // Actions
  startGame: () => {
    set({
      hasStarted: true,
      isPaused: false,
      isGameOver: false
    })
  },

  placePiece: (piece: TetrominoState) => {
    const tetromino = TETROMINOES[piece.type]
    const shape = tetromino.shapes[piece.rotation / 90]

    set(state => {
      const newBoard = {
        ...state.board,
        cells: state.board.cells.map(row => [...row])
      }

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
        ...state,
        board: newBoard
      }
    })
  },

  canPlacePiece: (piece: TetrominoState): boolean => {
    const state = get()
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
          if (state.board.cells[boardY][boardX].filled) {
            return false
          }
        }
      }
    }

    return true
  },

  clearLines: () => {
    set(state => {
      let cells = state.board.cells.map(row => 
        row.map(cell => ({ ...cell }))
      )
      
      let linesCleared = 0

      cells = cells.filter(row => {
        if (row.every(cell => cell.filled)) {
          linesCleared++
          return false
        }
        return true
      })

      // Add new rows to the top of the board
      for (let i = 0; i < linesCleared; i++) {
        cells.push(createEmptyRow())
      }

      // If no lines were cleared, return unchanged state
      if (linesCleared === 0) return state

      // Calculate score based on number of lines cleared
      const scoreMultiplier = [0, 40, 100, 300, 1200][linesCleared] || 0
      const additionalScore = scoreMultiplier * state.level

      return {
        ...state,
        board: {
          ...state.board,
          cells
        },
        score: state.score + additionalScore,
        level: Math.floor((state.score + additionalScore) / 1000) + 1
      }
    })
  },

  togglePause: () => {
    set(state => ({
      ...state,
      isPaused: !state.isPaused
    }))
  },

  setGameOver: () => {
    set(state => ({
      ...state,
      isGameOver: true,
      isPaused: true
    }))
  },

  resetGame: () => {
    usePieceStore.getState().resetPieceGenerator()
    set({
      board: createEmptyBoard(),
      score: 0,
      level: 1,
      isGameOver: false,
      isPaused: false,
      hasStarted: true
    })
  }
})) 