interface GameOverOverlayProps {
  score: number
  onRestart: () => void
}

function GameOverOverlay({ score, onRestart }: GameOverOverlayProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: '2rem',
      borderRadius: '10px',
      textAlign: 'center',
      color: 'white',
      zIndex: 1000,
      fontFamily: '"Press Start 2P", monospace',
    }}>
      <h2 style={{ marginBottom: '1rem' }}>Game Over!</h2>
      <p style={{ marginBottom: '1rem' }}>Score: {score}</p>
      <button
        onClick={onRestart}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: '"Press Start 2P", monospace',
        }}
      >
        Play Again
      </button>
    </div>
  )
}

export default GameOverOverlay 