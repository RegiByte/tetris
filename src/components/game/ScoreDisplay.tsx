import { Text } from '@react-three/drei'
import { BOARD_POSITION, BOARD_HEIGHT, BOARD_WIDTH } from '../../constants/game'

interface ScoreDisplayProps {
  score: number
  level: number
}

function ScoreDisplay({ score, level }: ScoreDisplayProps) {
  return (
    <group position={[BOARD_POSITION[0] - 8, BOARD_HEIGHT - 2, 0]}>
      {/* Title */}
      <Text
        position={[-.5, 2, 0]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="/fonts/PressStart2P-Regular.ttf"
      >
        TETRIS
      </Text>

      {/* Score */}
      <Text
        position={[0, 0, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="/fonts/PressStart2P-Regular.ttf"
      >
        SCORE
      </Text>
      <Text
        position={[0, -1, 0]}
        fontSize={1}
        color="#00ff00"
        anchorX="left"
        anchorY="middle"
        font="/fonts/PressStart2P-Regular.ttf"
      >
        {score.toString().padStart(6, '0')}
      </Text>

      {/* Level */}
      <Text
        position={[0, -3, 0]}
        fontSize={0.8}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="/fonts/PressStart2P-Regular.ttf"
      >
        LEVEL
      </Text>
      <Text
        position={[0, -4, 0]}
        fontSize={1}
        color="#ffff00"
        anchorX="left"
        anchorY="middle"
        font="/fonts/PressStart2P-Regular.ttf"
      >
        {level.toString().padStart(2, '0')}
      </Text>
    </group>
  )
}

export default ScoreDisplay 