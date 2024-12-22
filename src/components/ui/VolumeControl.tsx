import { useAudioStore } from '../../store/audio-store'

function VolumeControl() {
  const { volume, isMuted, setVolume, toggleMute } = useAudioStore()

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontFamily: '"Press Start 2P", monospace',
    }}>
      <button
        onClick={toggleMute}
        style={{
          padding: '10px',
          fontSize: '16px',
          backgroundColor: '#4a4a4a',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: '"Press Start 2P", monospace',
          minWidth: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {isMuted ? '🔇' : '🔊'}
      </button>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        style={{
          width: '100px',
          accentColor: '#4a4a4a'
        }}
      />
    </div>
  )
}

export default VolumeControl 