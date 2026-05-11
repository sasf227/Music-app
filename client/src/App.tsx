import './App.css'
import axios from 'axios'
import { useState, useEffect } from 'react'



function App() {
  const [array, setArray] = useState([]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:8070/api");
    setArray(response.data.blogPost);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const playButton = document.getElementById('playMetronome');
  const stopButton = document.getElementById('stopMetronome');
  const bpmSlider = document.getElementById('bpmSlider');
  const bpmEl = document.getElementById('bpm');
  const beatTxt = document.getElementById('beatsText');
  const beatBTN = document.querySelectorAll('button.beatsBTN');
  const audio = new Audio("/metronome_normal.mp3")
  let audioBuffer;
  let i =1;
  let beat_count = 4
  let metronome;
  let bpm = 140;
  let isplaying = false;

  return (
    <>
      <div className='min-h-screen w-full bg-gray-100 flex items-center justify-center flex-col gap-10'>

        <h1 className='text-5xl font-bold text-gray-800'>Backend with Express and Node</h1>
        <button className='text-5xl font-bold text-blue-600'>Play</button>

        <ul className='rounded-2xl shadow-lg p-5 bg-white space-y-3'>
          {
            array.map((blog, index) => (
              <li key={index} 
              className='bg-sky-100 p-4 rounded-2xl transition-transform transform hover:scale-105'>

                <p className='text-xl font-semibold text-gray-800'>{blog.title}</p>
                <p className='text-sm text-gray-600'>{blog.content}</p>
              </li>
            ))
          }
        </ul>
      </div>
      
    </>
  )
}

export default App
