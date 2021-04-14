const express = require("express");
let router = express.Router();
const bcrypt = require('bcrypt')
let usersController = require('../../controller/userController');
const { genToken } = require('./../../util/token');

router
    .route("/login")
    .post(async (req, res) => {

        console.log(req);
        
        const users = await usersController.findByEmail(req.body.email);
        // console.log(users);
        try {
            console.log(req.body);
            bcrypt.compare(req.body.password, users.password, function(err, result) {
                // result == true
                console.log(result);
                if (result){
                    let userToken = genToken(users.id);
                    res.status(200).json({token: userToken, displayname: users.name, email: users.email});
                }else {
                    res.status(401).send();
                }
            });
        } catch (error) {
            
        }
        
    })

router
    .route("/register")
    .post( async(req, res) => {

        const {name, email, password} = req.body;

        // console.log({name, email, password});
        const hashedPassword = await new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, function(err, hash) {
              if (err) reject(err)
              resolve(hash)
            });
        })
        
        const result = await usersController.createUser({name, email, password: hashedPassword, type: 1});
        
        let userToken = genToken(result[0].insertId);
        res.status(200).send({TOKEN: userToken, displayname: name, email: email});
        // if(result){
        //     return res.status(200).send({TOKEN: userToken, displayname: name, email: email});
        // }else{
        //     return res.status(200).send('failed nasda bogoa');
        // }
    })

module.exports = router;