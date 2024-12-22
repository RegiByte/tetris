import { create } from 'zustand'
import { TetrominoState, TetrominoType } from '../types/tetromino'
import { TETROMINO_COLORS, TETROMINOES } from '../constants/tetrominos'
import { BOARD_WIDTH } from '../constants/game'

// All possible piece types
const PIECE_TYPES: TetrominoType[] = [
  'I',
  'O',
  'T',
  'S',
  'Z',
  'J',
  'L'
]

// Shuffle an array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

interface PieceStore {
  // State
  currentPiece: TetrominoState
  nextPieces: TetrominoState[]
  // Actions
  generateNextPiece: () => void
  resetPieceGenerator: () => void
}

function getInitialPosition(type: TetrominoType): [number, number] {
  const shape = TETROMINOES[type].shapes[0]
  const width = shape[0].length
  
  // Center the piece horizontally, place at the top
  return [Math.floor((BOARD_WIDTH - width) / 2), 18]
}

function generatePiece(currentBag: TetrominoType[], nextBag: TetrominoType[]): {
  piece: TetrominoState
  newCurrentBag: TetrominoType[]
  newNextBag: TetrominoType[]
} {
  let type: TetrominoType
  let newCurrentBag = [...currentBag]
  let newNextBag = [...nextBag]

  if (newCurrentBag.length === 0) {
    newCurrentBag = newNextBag
    newNextBag = shuffleArray([...PIECE_TYPES])
  }

  type = newCurrentBag.pop()!

  return {
    piece: {
      type,
      position: getInitialPosition(type),
      rotation: 0,
      color: TETROMINO_COLORS[type]
    },
    newCurrentBag,
    newNextBag
  }
}

export const usePieceStore = create<PieceStore>((set, get) => {
  // Initialize bags
  let currentBag = shuffleArray([...PIECE_TYPES])
  let nextBag = shuffleArray([...PIECE_TYPES])

  // Generate initial pieces
  const firstPiece = generatePiece(currentBag, nextBag)
  currentBag = firstPiece.newCurrentBag
  nextBag = firstPiece.newNextBag

  const secondPiece = generatePiece(currentBag, nextBag)
  currentBag = secondPiece.newCurrentBag
  nextBag = secondPiece.newNextBag

  return {
    // Initial state
    currentPiece: firstPiece.piece,
    nextPieces: [secondPiece.piece],

    // Actions
    generateNextPiece: () => {
      set(state => {
        const nextPiece = state.nextPieces[0]
        const result = generatePiece(currentBag, nextBag)
        currentBag = result.newCurrentBag
        nextBag = result.newNextBag

        return {
          currentPiece: nextPiece,
          nextPieces: [result.piece]
        }
      })
    },

    resetPieceGenerator: () => {
      // Reset bags
      currentBag = shuffleArray([...PIECE_TYPES])
      nextBag = shuffleArray([...PIECE_TYPES])

      // Generate new initial pieces
      const firstPiece = generatePiece(currentBag, nextBag)
      currentBag = firstPiece.newCurrentBag
      nextBag = firstPiece.newNextBag

      const secondPiece = generatePiece(currentBag, nextBag)
      currentBag = secondPiece.newCurrentBag
      nextBag = secondPiece.newNextBag

      set({
        currentPiece: firstPiece.piece,
        nextPieces: [secondPiece.piece]
      })
    }
  }
}) 