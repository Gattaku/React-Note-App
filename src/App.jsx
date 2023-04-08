import { useEffect, useState } from 'react'
import './App.css'
import Sidbar from './compornents/Sidbar'
import Main from './compornents/Main'
import  {  v4  as  uuidv4  }  from  'uuid' ; 

function App() {

  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [isActive, setIsActive] = useState("");

  useEffect(()=>{
    //ローカルストレージにノートを保存する
    localStorage.setItem("notes",JSON.stringify(notes))
  },[notes]);

  useEffect(()=>{
    if (notes.length === 0) return;
    setIsActive(notes[0].id)
  },[])


  const getActiveNote = () => {
    return notes.find((note) => note.id === isActive )
  }

  const onAddNote = () => {
    const newNote = {
      id:uuidv4(),
      title:"新しいノート",
      content:"",
      modDate: Date.now(),
    }
    const modNote = [...notes,newNote];
    setNotes(modNote);
    console.log(notes);
  }

  const onDeleteNote = (id) => {
    const modNote = notes.filter((note)=>note.id !==id);
    setNotes(modNote);
  }

  const onUpdateNote = (updatedNote) => {
    //修正された新しいノートを返す配列
    const updatedNotesArray = notes.map((note)=>{
      if(note.id === updatedNote.id){
        return updatedNote;
      } else {
        return note;
      }
    })
    setNotes(updatedNotesArray);
  }

  return (
    <div className='App'>
      <Sidbar 
      onAddNote={onAddNote} 
      notes={notes} 
      onDeleteNote={onDeleteNote} 
      isActive={isActive} 
      setIsActive={setIsActive}/>
      <Main 
      activeNote={getActiveNote()}
      onUpdateNote={onUpdateNote}/>
    </div>
  )
}

export default App
