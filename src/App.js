import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import { data } from "./data"
import Split from "react-split"
import {nanoid} from "nanoid"

export default function App() {
    const savedNote = localStorage.getItem('notes')
    const [notes, setNotes] = React.useState(() => JSON.parse(savedNote) || [])
    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes))
       
    }, [notes])

   
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            body: "# Type your markdown note's title here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNoteId(newNote.id)
    }
    
    function updateNote(text) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            console.log(text)
            if(oldNote.id === currentNoteId){
                setEditedNoteToTop(oldNote, text)   
                return { ...oldNote , body: text }
            } else {
                return oldNote
            }
        }))
    }
    
    function setEditedNoteToTop(oldNote, text){
        setNotes(prevNotes => {
        const editedNote = prevNotes.filter(note => note.id !== oldNote.id)
            oldNote.body = text
            return [oldNote, ...editedNote]
        })
    }

    function findCurrentNote(isDeleted) {
        if(isDeleted) return notes[0]
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

      function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(prevNotes => {
            const notesArray = prevNotes.filter(note => note.id !== noteId)
                return notesArray
            })

        setCurrentNoteId(notes[0].id)
    }

    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
