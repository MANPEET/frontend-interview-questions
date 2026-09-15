import { useState } from 'react'
import './App.css'
import { useTicTacToe } from './hooks/useTicTacToe'

function App() {
  const [gridSize, setGridSize] = useState(3)
  const {initializeBoard, started, statusMessage, board, onMakeMove, resetGame} = useTicTacToe()

  
  return (
    <div className='min-h-screen flex items-center justify-center'>

      <div className='text-center'>
        <h1 className='text-3xl font-bold '>Tic-Tac-Toe</h1>
        <div className={`${started && "hidden"} mt-2`}>
          <label className='text-sm text-[#71717a] block '>Grid Size (N x N)</label>
          <input 
            type='number'
            min={3}
            max={10}
            value={gridSize}
            onChange={(e) => setGridSize(Number(e.target.value))}
            className='w-20 border border-[#ababad] px-4 py-2 outline-none rounded-md text-center my-5'
            />

          <div>
            <button className='bg-black text-white border rounded-lg w-50 py-2 cursor-pointer hover:transition-color hover:bg-black/80' onClick={() => initializeBoard(gridSize)}>
              Start Game
            </button>
          </div>
        </div>

        <div className={`${!started && "hidden "}`}>
            <div className='flex gap-5 my-6 items-center'>
              <h1 className='text-xl'> {statusMessage} </h1>
              <button className='bg-black text-white border rounded-lg w-35 py-2 cursor-pointer hover:transition-color hover:bg-black/80' onClick={() => resetGame()}>
                Reset Game
              </button>
            </div>

            <div className='text-center '>
              <div className="grid  gap-6" style={{gridTemplateColumns: `repeat(${gridSize}, 64px)`}}>
                {board?.flat(1).map((val, i) => {
                  const row = Math.floor(i / gridSize)
                  const col = i % gridSize;
                  return <Cell key={i} value={val} onClick={() => onMakeMove(row, col)}/>
                })}
              </div>
            </div>
        </div>
      </div>
    
    </div>
  )
}

const Cell = ({value, onClick}) => {
  return (
    <div className='aspect-square w-full h-full bg-gray-200 border rounded-md flex items-center justify-center text-2xl select-none cursor-pointer' onClick={onClick}>
      {value === 1 ? "X" : value === 2 ? "O" : ""}
    </div>
  )
}

export default App
