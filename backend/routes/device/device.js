const express = require("express");
const jwt = require('jsonwebtoken')
let router = express.Router();
// const db = require('../../util/connection')
// const { saltRounds } = require('../util/constant')
const bcrypt = require('bcrypt')
const connection = require('../../util/connection')

router
    .route("/list")
    .get((req, res) => {
        console.log(req);
        // connection.query(`
        //     SELECT *
        //     FROM devices
        //     JOIN houses
        //     ON devices.houseid = houses.id
        //     JOIN user_house
        //     ON houses.id = user_house.houseid
        //     WHERE user_house.userid = ${}
        // `)
        res.send("login get")
    })

// router
//     .route("/register")
//     .post( async(req, res) => {
//         res.send("register")
//     })
//     .get((req, res) => {
//         res.send("register")
//     })

module.exports = router;