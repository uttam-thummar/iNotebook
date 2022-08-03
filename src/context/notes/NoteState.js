import NoteContext from './noteContext';
import { useState } from "react";

const NoteState = (props) => {
    const host = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_LIVE

    const [Notes, setNotes] = useState([]);

    // todo: Fetch all Notes
    const fetchNotes = async () => {
        //^ API Call
        const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            }
        });
        const result = await response.json();
        setNotes(result.notes);
    }

    // todo: Add a Note
    const addNote = async (title, description, tag) => {
        //^ API Call
        const response = await fetch(`${host}/api/notes/add-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
            body: JSON.stringify({title, description, tag})
        });
        const result = await response.json();
        setNotes(Notes.concat(result.savedNote));
    }

    // todo: Edit a Note
    const editNote = async (id, title, description, tag) => {
        //^ API Call
        const response = await fetch(`${host}/api/notes/update-note/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            },
            body: JSON.stringify({title, description, tag})
        });
        const result = await response.json();

        let newNotes = JSON.parse(JSON.stringify(Notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    // todo: Delete a Note
    const deleteNote = async (id) => {
        //^ API Call
        const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('authToken')
            }
        });
        const result = await response.json();
        setNotes(Notes.filter((note) => {
            return id !== note._id;
        }));
    }

    return (
        <NoteContext.Provider value={{Notes, fetchNotes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;