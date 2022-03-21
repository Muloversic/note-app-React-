import React from "react"
   /**
     * Challenge: Try to figure out a way to display only the 
     * first line of note.body as the note summary in the
     * sidebar.
     * 
     * Hint 1: note.body has "invisible" newline characters
     * in the text every time there's a new line shown. E.g.
     * the text in Note 1 is:
     * "# Note summary\n\nBeginning of the note"
     * 
     * Hint 2: See if you can split the string into an array
     * using the "\n" newline character as the divider
     */
export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => {
    const title = note.title    
    let noteTitle = `Note ${index + 1}`
    if(title){
        noteTitle = title.includes('') ? noteTitle : title
    }
       return (
            <div key={note.id}>
                <div
                    
                    className={`title ${
                        note.id === props.currentNote.id ? "selected-note" : ""
                    }`}
                    onClick={() => props.setCurrentNoteId(note.id)}
                >
                    <h4 className="text-snippet">{noteTitle}</h4>
                </div>
            </div>
        )
    })

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    )
}
