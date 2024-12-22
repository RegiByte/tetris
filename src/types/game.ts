export interface Cell {
  position: [number, number, number] // [x, y, z]
  isActive: boolean
  color?: string
}

export interface BoardCell {
  filled: boolean
  color: string | null
}

export interface GameBoard {
  cells: BoardCell[][]
  width: number
  height: number
}

export interface GameState {
  board: GameBoard
  score: number
  level: number
  isGameOver: boolean
  isPaused: boolean
} 