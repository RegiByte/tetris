import { Tetromino, TetrominoType } from '../types/tetromino'

// Colors from the classic NES Tetris game with a modern twist
export const TETROMINO_COLORS: Record<TetrominoType, string> = {
  I: '#00f0f0', // Cyan
  O: '#f0f000', // Yellow
  T: '#a000f0', // Purple
  S: '#00f000', // Green
  Z: '#f00000', // Red
  J: '#0000f0', // Blue
  L: '#f0a000'  // Orange
}

// Define all possible rotations for each piece
export const TETROMINOES: Record<TetrominoType, Tetromino> = {
  I: {
    type: 'I',
    color: TETROMINO_COLORS.I,
    shapes: [
      [
        [false, false, false, false],
        [true, true, true, true],
        [false, false, false, false],
        [false, false, false, false]
      ],
      [
        [false, false, true, false],
        [false, false, true, false],
        [false, false, true, false],
        [false, false, true, false]
      ],
      [
        [false, false, false, false],
        [false, false, false, false],
        [true, true, true, true],
        [false, false, false, false]
      ],
      [
        [false, true, false, false],
        [false, true, false, false],
        [false, true, false, false],
        [false, true, false, false]
      ]
    ]
  },
  O: {
    type: 'O',
    color: TETROMINO_COLORS.O,
    shapes: [
      [
        [true, true],
        [true, true]
      ]
    ]
  },
  T: {
    type: 'T',
    color: TETROMINO_COLORS.T,
    shapes: [
      [
        [false, true, false],
        [true, true, true],
        [false, false, false]
      ],
      [
        [false, true, false],
        [false, true, true],
        [false, true, false]
      ],
      [
        [false, false, false],
        [true, true, true],
        [false, true, false]
      ],
      [
        [false, true, false],
        [true, true, false],
        [false, true, false]
      ]
    ]
  },
  S: {
    type: 'S',
    color: TETROMINO_COLORS.S,
    shapes: [
      [
        [false, true, true],
        [true, true, false],
        [false, false, false]
      ],
      [
        [false, true, false],
        [false, true, true],
        [false, false, true]
      ],
      [
        [false, false, false],
        [false, true, true],
        [true, true, false]
      ],
      [
        [true, false, false],
        [true, true, false],
        [false, true, false]
      ]
    ]
  },
  Z: {
    type: 'Z',
    color: TETROMINO_COLORS.Z,
    shapes: [
      [
        [true, true, false],
        [false, true, true],
        [false, false, false]
      ],
      [
        [false, false, true],
        [false, true, true],
        [false, true, false]
      ],
      [
        [false, false, false],
        [true, true, false],
        [false, true, true]
      ],
      [
        [false, true, false],
        [true, true, false],
        [true, false, false]
      ]
    ]
  },
  J: {
    type: 'J',
    color: TETROMINO_COLORS.J,
    shapes: [
      [
        [true, false, false],
        [true, true, true],
        [false, false, false]
      ],
      [
        [false, true, true],
        [false, true, false],
        [false, true, false]
      ],
      [
        [false, false, false],
        [true, true, true],
        [false, false, true]
      ],
      [
        [false, true, false],
        [false, true, false],
        [true, true, false]
      ]
    ]
  },
  L: {
    type: 'L',
    color: TETROMINO_COLORS.L,
    shapes: [
      [
        [false, false, true],
        [true, true, true],
        [false, false, false]
      ],
      [
        [false, true, false],
        [false, true, false],
        [false, true, true]
      ],
      [
        [false, false, false],
        [true, true, true],
        [true, false, false]
      ],
      [
        [true, true, false],
        [false, true, false],
        [false, true, false]
      ]
    ]
  }
} 