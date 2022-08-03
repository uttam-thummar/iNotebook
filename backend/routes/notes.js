const express = require('express');
const Note = require('../models/Note');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');

//todo: ROUTE 1 - Fetch all Notes Using: GET "/api/notes/fetch-all-notes". Login required.
router.get('/fetch-all-notes', fetchUser, async (req,res) => {
    try {
        const notes = await Note.find({user: req.user.id});
        res.json({status: 200, success: true, notes});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({status: 500, success: false, message: "Something went wrong."})
    }
});

//todo: ROUTE 2 - Add Note Using: POST "/api/notes/add-note". Login required.
router.post('/add-note', fetchUser, [
    //! validation for title,description
    body('title', 'Enter a valid title.').isLength({ min: 3 }),
    body('description', 'Describe your note in more detail.').isLength({ min: 5 }),
], async (req,res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({status: 400, success: false, errors: errors.array()});
    }

    try {
        const {title,description,tag} = req.body;
        const note = new Note({
            user: req.user.id,title,description,tag
        });
        const savedNote = await note.save();
        res.json({status: 200, success: true, message: "Note has been Added.", savedNote});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({status: 500, success: false, message: "Something went wrong."})
    }
});

//todo: ROUTE 3 - Update Note Using: PUT "/api/notes/update-note". Login required.
router.put('/update-note/:id', fetchUser, async (req,res) => {
    try {
        const {title,description,tag} = req.body;
        //- create a newNote Object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        //? Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        //- Note not found
        if(!note){
            return res.status(404).json({status: 404, success: false, message: "Not Found."})
        }
        //- Allow updation only if User owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({status: 401, success: false, message: "Access Denied."});
        }
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({status: 200, success: true, message: "Not has been Updated.", note});

    } catch (error) {
        console.error(error.message);
        res.status(500).json({status: 500, success: false, message: "Something went wrong."})
    }
});

//todo: ROUTE 4 - Delete Note Using: DELETE "/api/notes/delete-note". Login required.
router.delete('/delete-note/:id', fetchUser, async (req,res) => {
    try {
        //? Find the note to be deleted and delete it
        let note = await Note.findById(req.params.id);
        //- Note not found
        if(!note){
            return res.status(404).json({status: 404, success: false, message: "Not Found."});
        }
        //- Allow deletion only if User owns this Note
        if(note.user.toString() !== req.user.id){
            return res.status(401).json({status: 401, success: false, message: "Access Denied."});
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({status: 200, success: true, message: "Note has been deleted.", note});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({status: 500, success: false, message: "Something went wrong."});
    }
});

module.exports = router;