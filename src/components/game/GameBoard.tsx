import { useMemo } from 'react'
import { Cell, GameBoard as GameBoardType } from '../../types/game'
import {
  BOARD_WIDTH,
  BOARD_HEIGHT,
  CELL_SIZE,
  BOARD_POSITION,
  CELL_COLOR,
  BOARD_COLOR,
} from '../../constants/game'

interface GameBoardProps {
  board: GameBoardType
}

function GameBoard({ board }: GameBoardProps) {
  const cells = useMemo(() => {
    const cells: Cell[][] = []
    
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      cells[y] = []
      for (let x = 0; x < BOARD_WIDTH; x++) {
        cells[y][x] = {
          position: [
            BOARD_POSITION[0] + x * CELL_SIZE,
            BOARD_POSITION[1] + y * CELL_SIZE,
            BOARD_POSITION[2],
          ],
          isActive: board.cells[y][x].filled,
          color: board.cells[y][x].color || CELL_COLOR,
        }
      }
    }
    
    return cells
  }, [board.cells])

  return (
    <group>
      {/* Board background */}
      <mesh position={[BOARD_POSITION[0] + (BOARD_WIDTH * CELL_SIZE) / 2 - CELL_SIZE / 2, 
                      BOARD_POSITION[1] + (BOARD_HEIGHT * CELL_SIZE) / 2 - CELL_SIZE / 2, 
                      BOARD_POSITION[2] - 0.1]}>
        <planeGeometry args={[BOARD_WIDTH * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE]} />
        <meshStandardMaterial color={BOARD_COLOR} />
      </mesh>

      {/* Grid cells */}
      {cells.flat().map((cell, index) => (
        <mesh key={index} position={cell.position}>
          <boxGeometry args={[CELL_SIZE * 0.95, CELL_SIZE * 0.95, CELL_SIZE * 0.1]} />
          <meshStandardMaterial color={cell.color} />
        </mesh>
      ))}
    </group>
  )
}

export default GameBoard 