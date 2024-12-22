import { useGameStore } from '../../store/game-store'

interface StartScreenProps {
  onStart: () => void
}

function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        color: 'white',
        fontFamily: '"Press Start 2P", monospace',
        zIndex: 1000,
      }}
    >
      <h1
        style={{
          fontSize: '4rem',
          color: '#00f0f0',
          textShadow: '0 0 10px #00f0f0, 0 0 20px #00f0f0, 0 0 30px #00f0f0',
          marginBottom: '2rem',
        }}
      >
        TETRIS
      </h1>
      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center',
          fontSize: '1.2rem',
          marginBottom: '2rem',
        }}
      >
        <p>Controls:</p>
        <p>← → : Move</p>
        <p>↑ : Rotate</p>
        <p>↓ : Soft Drop</p>
      </div>

      <button
        onClick={onStart}
        style={{
          padding: '1rem 2rem',
          fontSize: '1.5rem',
          backgroundColor: 'transparent',
          color: '#f0f000',
          border: '2px solid #f0f000',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: '"Press Start 2P", monospace',
          transition: 'all 0.3s ease',
          animation: 'pulse 2s infinite',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#f0f000'
          e.currentTarget.style.color = 'black'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = 'transparent'
          e.currentTarget.style.color = '#f0f000'
        }}
      >
        START GAME
      </button>

      <style>
        {`
          @keyframes pulse {
            0% {
              transform: scale(1);
              textShadow: 0 0 10px #f0f000;
            }
            50% {
              transform: scale(1.05);
              textShadow: 0 0 20px #f0f000;
            }
            100% {
              transform: scale(1);
              textShadow: 0 0 10px #f0f000;
            }
          }

          @font-face {
            font-family: 'Press Start 2P';
            src: url('/fonts/PressStart2P-Regular.ttf') format('truetype');
          }
        `}
      </style>
    </div>
  )
}

export default StartScreen 