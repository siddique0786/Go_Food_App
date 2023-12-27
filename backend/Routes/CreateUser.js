const express = require("express");
const router = express.Router();

const User = require("../models/User");
const { body, validationResult } = require('express-validator');

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const jwtSecret = "MynameisMdChandHussainSiddique0334#786"
//for new user
router.post("/creatuser", [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    //password must be at least 5 char long
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password,salt)


        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })

        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })


// for login

router.post("/loginuser", [
    body('email').isEmail(),
    //password must be at least 5 char long
    body('password', 'Incorrect Password').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;

        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Please Try loggin with correct email" });
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Please Try loggin with correct Password" });
            };

            const data = {
                user:{
                    id:userData.id
                }
            };

            const authToken = jwt.sign(data,jwtSecret);
            return res.json({ success: true,authToken:authToken });

        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    });

module.exports = router;






// router.post("/loginuser", [
//     body('email').isEmail(),
//     //password must be at least 5 char long
//     body('password', 'Incorrect Password').isLength({ min: 5 })],


//     async (req, res) => {

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }


//         let email = req.body.email;
//         try {
//             let userData = await User.findOne({ email });
//             if (!userData){
//                 return res.status(400).json({ errors: "Please Try loggin with correct credentials" });
//             }
//             if(!req.body.password === userData.password){
//                 return res.status(400).json({ errors: "Please Try loggin with correct credentials" });
//             }
//             return res.json({ success: true })
//         } catch (error) {
//             console.log(error)
//             res.json({ success: false })
//         }
//     })