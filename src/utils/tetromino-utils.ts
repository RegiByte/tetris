import { TetrominoState } from '../types/tetromino'
import { TETROMINOES } from '../constants/tetrominos'

interface PieceBounds {
  width: number
  height: number
  minX: number
  maxX: number
  minY: number
  maxY: number
}

// Wall kick offsets to try when a rotation fails
const WALL_KICK_OFFSETS: [number, number][] = [
  [0, 0],   // Try original position first
  [-1, 0],  // Try shifting left
  [1, 0],   // Try shifting right
  [0, 1],   // Try shifting up
  [-1, 1],  // Try shifting up-left
  [1, 1],   // Try shifting up-right
]

export function calculatePieceBounds(piece: TetrominoState): PieceBounds {
  const tetromino = TETROMINOES[piece.type]
  const currentShape = tetromino.shapes[piece.rotation / 90]
  
  let minX = currentShape[0].length
  let maxX = 0
  let minY = currentShape.length
  let maxY = 0

  // Find the actual bounds of the piece in its current rotation
  for (let y = 0; y < currentShape.length; y++) {
    for (let x = 0; x < currentShape[y].length; x++) {
      if (currentShape[y][x]) {
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x)
        minY = Math.min(minY, y)
        maxY = Math.max(maxY, y)
      }
    }
  }

  return {
    width: maxX - minX + 1,
    height: maxY - minY + 1,
    minX,
    maxX,
    minY,
    maxY
  }
}

export function isValidMove(
  piece: TetrominoState,
  dx: number,
  dy: number,
  boardWidth: number,
  boardHeight: number
): boolean {
  const tetromino = TETROMINOES[piece.type]
  const currentShape = tetromino.shapes[piece.rotation / 90]
  
  const newX = piece.position[0] + dx
  const newY = piece.position[1] + dy

  // Check each cell of the piece
  for (let y = 0; y < currentShape.length; y++) {
    for (let x = 0; x < currentShape[y].length; x++) {
      if (currentShape[y][x]) {
        const absoluteX = newX + x
        const absoluteY = newY + y

        // Check boundaries for this specific cell
        if (absoluteX < 0 || absoluteX >= boardWidth) return false
        if (absoluteY < 0 || absoluteY >= boardHeight) return false
      }
    }
  }

  return true
}

export function tryRotation(
  piece: TetrominoState,
  boardWidth: number,
  boardHeight: number
): { success: boolean; newPosition?: [number, number]; newRotation?: number } {
  const newRotation = (piece.rotation + 90) % 360

  // Try each wall kick offset
  for (const [kickX, kickY] of WALL_KICK_OFFSETS) {
    const testPiece: TetrominoState = {
      ...piece,
      rotation: newRotation,
      position: [piece.position[0] + kickX, piece.position[1] + kickY]
    }

    if (isValidMove(testPiece, 0, 0, boardWidth, boardHeight)) {
      return {
        success: true,
        newPosition: testPiece.position,
        newRotation: testPiece.rotation
      }
    }
  }

  return { success: false }
} 