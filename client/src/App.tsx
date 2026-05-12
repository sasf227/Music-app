import { useEffect, useRef, useState } from "react"

export default function Metronome() {
  const [bpm, setBpm] = useState<number>(120)
  const [playing, setPlaying] = useState<boolean>(false)
  const [beat, setBeat] = useState<number>(0)

  const intervalRef = useRef<number | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    if (playing) {
      startMetronome()
    } else {
      stopMetronome()
    }

    return () => stopMetronome()
  }, [playing, bpm])

  const playClick = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }

    const ctx = audioContextRef.current

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.frequency.value = beat === 0 ? 1000 : 700

    gainNode.gain.setValueAtTime(1, ctx.currentTime)

    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      ctx.currentTime + 0.05
    )

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.05)
  }

  const startMetronome = () => {
    const interval = (60 / bpm) * 1000

    intervalRef.current = window.setInterval(() => {
      setBeat(prev => (prev + 1) % 4)

      playClick()
    }, interval)
  }

  const stopMetronome = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current)
    }
  }

  return (
    <div className="bg-zinc-800 p-8 rounded-3xl shadow-2xl w-87.5">
      <h1 className="text-3xl font-bold text-center mb-8">
        Metronome
      </h1>

      <div className="flex justify-center gap-3 mb-8">
        {[0, 1, 2, 3].map(index => (
          <div
            key={index}
            className={`w-6 h-6 rounded-full transition-all duration-75 ${
              beat === index
                ? "bg-green-400 scale-125"
                : "bg-zinc-600"
            }`}
          />
        ))}
      </div>

      <div className="text-center mb-6">
        <div className="text-5xl font-bold">
          {bpm}
        </div>

        <div className="text-zinc-400">
          BPM
        </div>
      </div>

      <input
        type="range"
        min="40"
        max="240"
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
        className="w-full mb-8"
      />

      <button
        onClick={() => setPlaying(!playing)}
        className={`w-full py-3 rounded-xl font-semibold text-lg transition ${
          playing
            ? "bg-red-500 hover:bg-red-600"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {playing ? "Stop" : "Start"}
      </button>
    </div>
  )
}