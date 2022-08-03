const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const fetchUser = require('../middleware/fetchUser');

//todo: ROUTE 1 - Create a User using: POST "/api/auth/register". No login required.
router.post('/register', [
    //! validation for name,email,password
    body('name', 'Enter a valid name.').isLength({ min: 3 }),
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password must be atleast 5 characters long.').isLength({ min: 5 }),
], async (req,res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, success: false, errors: errors.array() });
    }

    try {
        // check whether the user exist already
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({status: 400, success: false, message: "Sorry! Email already exists."});
        }

        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
        });

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({status: 200, success: true, message: "Account Registered Successfully.", authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({status: 500, success: false, message: "Something went wrong."})
    }
});


//todo: ROUTE 2 - Authenticate a User Using: POST "/api/auth/login". No login required.
router.post('/login', [
    //! validation for email,password
    body('email', 'Enter a valid email.').isEmail(),
    body('password', 'Password can not be blank.').notEmpty()
], async (req,res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({status: 400, success: false, errors: errors.array()});
    }

    const {email,password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(401).json({status: 401, success: false, message: "Please try to login with correct Credentials."});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(401).json({status: 401, success: false, message: "Please try to login with correct Credentials."});
        }

        const data = {
            user: {
                id: user.id
            }
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({status: 200, success: true, message: "Successfully Loggedin to your Notes.", authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({status: 500, success: false, message: "Something went wrong."})
    }
});

//todo: ROUTE 3 - Get loggedin User details Using: POST "/api/auth/get-user". Login required.
router.post('/get-user', fetchUser, async (req,res) => {
    try {
        let userId = req.user.id;
        let user = await User.findById(userId).select("-password");
        res.json({status: 200, success: true, user});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({status: 500, success: false, message: "Something went wrong."})
    }
});

module.exports = router;