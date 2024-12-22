import { CELL_SIZE, BOARD_POSITION } from '../../constants/game'
import { TetrominoState } from '../../types/tetromino'
import { TETROMINOES } from '../../constants/tetrominos'

interface TetrominoProps {
  state: TetrominoState
}

function Tetromino({ state }: TetrominoProps) {
  const tetromino = TETROMINOES[state.type]
  const currentShape = tetromino.shapes[state.rotation / 90]

  return (
    <group
      position={[
        BOARD_POSITION[0] + state.position[0] * CELL_SIZE,
        BOARD_POSITION[1] + state.position[1] * CELL_SIZE,
        BOARD_POSITION[2]
      ]}
    >
      {currentShape.map((row, y) =>
        row.map((isActive, x) => {
          if (!isActive) return null
          return (
            <mesh
              key={`${x}-${y}`}
              position={[x * CELL_SIZE, y * CELL_SIZE, 0]}
            >
              <boxGeometry args={[CELL_SIZE * 0.95, CELL_SIZE * 0.95, CELL_SIZE * 0.1]} />
              <meshStandardMaterial color={state.color} />
            </mesh>
          )
        })
      )}
    </group>
  )
}

export default Tetromino 