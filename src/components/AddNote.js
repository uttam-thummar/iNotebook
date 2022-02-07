import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

function AddNote(props) {
    const {addNote} = useContext(noteContext);
    const [NewNote, setNewNote] = useState({title: "", description: "", tag: ""});
    const addNewNote = (e) => {
        e.preventDefault();
        addNote(NewNote.title, NewNote.description, NewNote.tag);
        setNewNote({title: "", description: "", tag: ""});
        props.configToast("New Note Added.", "success");
    };
    const changingData = (e) => {
        setNewNote({...NewNote, [e.target.name]: e.target.value});
    };


    return (
        <>
            <div className="container my-4">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" value={NewNote.title} name='title' onChange={changingData}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name='description' value={NewNote.description} rows="3" onChange={changingData}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={NewNote.tag} onChange={changingData}/>
                    </div>
                    <button disabled={NewNote.title.length<5 || NewNote.description.length<5} type="button" className="btn btn-primary" onClick={addNewNote}>Add Note</button>
                    <Link to="/admin/notes" className='btn btn-light view-notes' style={{marginLeft: "30px"}}><span className='mdi mdi-eye'></span> View Notes</Link>
                </form>
            </div>
        </>
    )
}

export default AddNote
