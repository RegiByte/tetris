import * as THREE from 'three'
import { Text } from '@react-three/drei'
import { BOARD_WIDTH, BOARD_HEIGHT, CELL_SIZE, BOARD_POSITION } from '../../constants/game'

function DebugGrid() {
  const cells = []
  
  // Create grid cells with indices
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const xPos = BOARD_POSITION[0] + x * CELL_SIZE
      const yPos = BOARD_POSITION[1] + y * CELL_SIZE
      const zPos = BOARD_POSITION[2] + 0.1 // One unit in front of the board

      cells.push(
        // Cell border
        <lineSegments key={`cell-${x}-${y}`} position={[xPos, yPos, zPos]}>
          <edgesGeometry args={[new THREE.BoxGeometry(CELL_SIZE, CELL_SIZE, 0.01)]} />
          <lineBasicMaterial color="#ffffff" opacity={0.3} transparent />
        </lineSegments>,
        
        // Cell coordinates text
        <Text
          key={`text-${x}-${y}`}
          position={[xPos, yPos, zPos]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {`${y},${x}`}
        </Text>
      )
    }
  }

  return <group>{cells}</group>
}

export default DebugGrid 