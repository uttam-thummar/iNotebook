import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import noteContext from '../context/notes/noteContext';
import { toastActionCreators } from '../redux/actionCreators';

function NoteItem(props) {
    const { note, openUpdateModal } = props;
    const { deleteNote } = useContext(noteContext);

    const dispatch = useDispatch();
    const {setToastConfiguration} = bindActionCreators(toastActionCreators, dispatch);

    return (
        <>
            <div className='col-md-3'>
                <div className="card my-3">
                    <div className="card-body">
                        <h5 className="card-title">{note.title}</h5>
                        <p className="card-text">{note.description}</p>
                        <div className='d-flex justify-content-between'>
                            <i className='mdi mdi-notebook-edit text-primary' onClick={() => { openUpdateModal(note) }}></i>
                            <i className='mdi mdi-delete-empty text-danger' onClick={() => {
                                if (window.confirm("Are you sure you want to delete?")) {
                                    deleteNote(note._id);
                                    setToastConfiguration("Note Deleted Successfully.", "success")
                                }
                            }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem
