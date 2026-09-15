import { use, useState } from "react"

export const useTicTacToe = () => {
    const [started, setStarted] = useState(false)
    const [board,setBoard] = useState()
    const [statusMessage, setStatusMessage] = useState("Player X's Turn")
    const [size, setSize] = useState()
    const [rows,setRows] = useState([])
    const [cols,setCols] = useState([])
    const [diag, setDiag] = useState(0)
    const [antiDiag, setAntiDiag] = useState(0)
    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [moveCount, setMoveCount] = useState(0)

    const [isGameOver, setIsGameOver] = useState(false)
    
    const initializeBoard = (gridSize) => {
        const n = Number(gridSize)

        if(!n || n < 3 || n > 10){
            alert("Please enter grid size between 3 and 10")
            return
        }

        setStarted(true)
        setRows(new Array(n).fill(0))
        setCols(new Array(n).fill(0))
        setDiag(0)
        setSize(n)
        setAntiDiag(0)
        setCurrentPlayer(1)
        setMoveCount(0)
        setBoard(Array.from({length: n}, () => new Array(n).fill(null)))
    }

    const onMakeMove = (row,col) => {
        if(isGameOver || board[row][col] !== null) return

        const value = currentPlayer === 1 ? 1 : -1

        const newRows = [...rows]
        const newCols = [...cols]

        newRows[row] += value;
        newCols[col] += value;
        const newDiag = row === col ? diag + value : diag
        const newAntiDiag = row - col === size - 1 ? antiDiag + value : antiDiag

        const newBoard = board.map(r => [...r])
        newBoard[row][col] = currentPlayer

        const won = Math.abs(newRows[row] === size) || Math.abs(newCols[col] === size || Math.abs(newDiag) === size || Math.abs(newAntiDiag) === size)
        
        const newMoveCount = moveCount + 1

        setBoard(newBoard)
        setRows(newRows)
        setCols(newCols)
        setDiag(newDiag)
        setAntiDiag(newAntiDiag)

        setMoveCount(newMoveCount)

        if(won){
            setIsGameOver(true)
            setStatusMessage(`Player ${currentPlayer === 1 ? "X" : "O"} Wins!`)
            return
        }

        if(newMoveCount === size * size){
            setStatusMessage("It's a draw")
            setIsGameOver(true)
            return
        }

        const nextPlayer = currentPlayer === 1 ? 2 : 1
        setCurrentPlayer(nextPlayer)
        setStatusMessage(`Player ${nextPlayer === 1 ? "X" : "O"}'s Turn`)
    }

    const resetGame = () => {
        setStarted(false)
        setBoard(undefined)
        setIsGameOver(false)
    }

    return {initializeBoard, started, statusMessage, board,resetGame, onMakeMove }
}