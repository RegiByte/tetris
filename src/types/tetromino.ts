export type TetrominoType = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L'

export interface TetrominoState {
  type: TetrominoType
  position: [number, number] // [x, y] on the game board
  rotation: number // 0, 90, 180, or 270 degrees
  color: string
}

export type TetrominoShape = boolean[][]

export interface Tetromino {
  type: TetrominoType
  shapes: TetrominoShape[] // Array of rotations
  color: string
} 