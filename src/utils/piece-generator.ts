import { TetrominoState, TetrominoType } from '../types/tetromino'
import { TETROMINO_COLORS, TETROMINOES } from '../constants/tetrominos'
import { BOARD_WIDTH } from '../constants/game'

// All possible piece types
const PIECE_TYPES: TetrominoType[] = [
    'I',
    'O',
    // 'T',
    // 'S',
    // 'Z',
    // 'J',
    // 'L'
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

export class PieceGenerator {
  private currentBag: TetrominoType[] = []
  private nextBag: TetrominoType[] = []

  constructor() {
    // Initialize both bags
    this.currentBag = shuffleArray([...PIECE_TYPES])
    this.nextBag = shuffleArray([...PIECE_TYPES])
  }

  private getNextPieceType(): TetrominoType {
    if (this.currentBag.length === 0) {
      // Current bag is empty, switch to next bag
      this.currentBag = this.nextBag
      // Generate new next bag
      this.nextBag = shuffleArray([...PIECE_TYPES])
    }

    const nextPiece = this.currentBag.pop()
    if (!nextPiece) throw new Error('Piece bag is empty')
    return nextPiece
  }

  // Get initial position for a piece type
  private getInitialPosition(type: TetrominoType): [number, number] {
    const shape = TETROMINOES[type].shapes[0]
    const width = shape[0].length
    
    // Center the piece horizontally, place at the top
    return [Math.floor((BOARD_WIDTH - width) / 2), 18]
  }

  generatePiece(): TetrominoState {
    const type = this.getNextPieceType()
    return {
      type,
      position: this.getInitialPosition(type),
      rotation: 0,
      color: TETROMINO_COLORS[type]
    }
  }

  // Preview the next few pieces without removing them from the bag
  previewPieces(count: number): TetrominoType[] {
    const preview: TetrominoType[] = []
    const combinedBag = [...this.currentBag, ...this.nextBag]
    
    for (let i = 0; i < count; i++) {
      const index = this.currentBag.length - 1 - i
      if (index >= 0) {
        preview.push(this.currentBag[index])
      } else {
        const nextBagIndex = this.nextBag.length - 1 - (i - this.currentBag.length)
        if (nextBagIndex >= 0) {
          preview.push(this.nextBag[nextBagIndex])
        }
      }
    }

    return preview
  }
} 