const express = require("express");
const jwt = require('jsonwebtoken')
let router = express.Router();
// const db = require('../../util/connection')
// const { saltRounds } = require('../util/constant')
const bcrypt = require('bcrypt')
const connection = require('../../util/connection')

router
    .route("/")
    .get((req, res) => {
        let houseData = 
        connection.query(`
            SELECT houses.id, houses.name, COUNT(rooms.id) as 'roomcount'
            FROM user_house
            JOIN houses ON houses.id = user_house.houseid
            LEFT JOIN rooms ON rooms.houseid = houses.id
            WHERE user_house.userid = 16
            GROUP BY houses.id
        `, function (err, result) {
            if (err) throw err
            
            console.log(`result ${result}`);
            houseData = result;
            res.status(200).send({data:result})
        })
    })

module.exports = router;