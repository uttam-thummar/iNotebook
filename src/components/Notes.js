import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastActionCreators } from '../redux/actionCreators';

function Notes() {
    const dispatch = useDispatch();
    const {setToastConfiguration} = bindActionCreators(toastActionCreators, dispatch);

    const { Notes, fetchNotes, editNote } = useContext(noteContext);
    let history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('authToken')){
            fetchNotes();
        }else{
            history.push('/login');
        }
        //eslint-disable-next-line
    }, []);

    const refOpen = useRef(null);
    const refClose = useRef(null);
    const [UpdatingNote, setUpdatingNote] = useState({id: "", e_title: "", e_description: "", e_tag: ""})

    const openUpdateModal = (currentNote) => {
        refOpen.current.click();
        setUpdatingNote({
            id: currentNote._id,
            e_title: currentNote.title,
            e_description: currentNote.description,
            e_tag: currentNote.tag
        })
    };
    const changingData = (e) => {
        setUpdatingNote({...UpdatingNote, [e.target.name]: e.target.value});
    };
    const updateNote = (e) => {
        editNote(UpdatingNote.id, UpdatingNote.e_title, UpdatingNote.e_description, UpdatingNote.e_tag);
        refClose.current.click();
        setToastConfiguration("Note Updated Successfully", "success")
    }

    return (
        <>
            <button ref={refOpen} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#editNoteModal">
            </button>

            <div className="modal fade" id="editNoteModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="editNoteModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="e_title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="e_title" name='e_title' value={UpdatingNote.e_title} onChange={changingData}/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_description" className="form-label">Description</label>
                                    <textarea className="form-control" id="e_description" name='e_description' value={UpdatingNote.e_description} rows="3" onChange={changingData}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="e_tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="e_tag" name='e_tag' value={UpdatingNote.e_tag} onChange={changingData} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={UpdatingNote.e_title.length<5 || UpdatingNote.e_description.length<5} type="button" className="btn btn-primary" onClick={updateNote}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" row my-4">
                <h2>Your Notes</h2>
                {Notes.map((note) => {
                    return <NoteItem key={note._id} openUpdateModal={openUpdateModal} note={note} />;
                })}
                <div className='col-md-3'>
                    <Link to="/admin/add-note" className='add-one'>
                        <div className="card my-3" style={{border: "dotted", height: "80%"}}>
                            <div className="card-body">
                                <div className='d-flex justify-content-center h-100'>
                                    <button className='btn btn-info'>
                                        <span className='mdi mdi-plus'> Add One</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Notes
