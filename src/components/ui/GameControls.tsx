interface GameControlsProps {
  onPause: () => void
  onToggleDebug: () => void
}

function GameControls({ onPause, onToggleDebug }: GameControlsProps) {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      display: 'flex',
      gap: '10px'
    }}>
      <button
        onClick={onPause}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4a4a4a',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: '"Press Start 2P", monospace',
        }}
      >
        Pause
      </button>
      <button
        onClick={onToggleDebug}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#4a4a4a',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: '"Press Start 2P", monospace',
        }}
      >
        Toggle Grid
      </button>
    </div>
  )
}

export default GameControls 