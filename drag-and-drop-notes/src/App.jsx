import { useState } from 'react'
import Notes from './components/Notes'


function App() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      text: "We are making a drag and drop notes application"
    },
    {
      id: 2,
      text: "We are making a drag and drop notes website"
    }
  ])


  return (
    <Notes notes= {notes} setNotes={setNotes}/>
  )
}

export default App
