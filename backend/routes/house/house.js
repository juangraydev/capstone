const express = require("express");
let router = express.Router();

let houseController = require('../../controller/houseController');
let deviceController = require('../../controller/deviceController');

router
    .route("/list")
    .get( async (req, res) => {
        const house = await houseController.findByOwner(req.user.id);
        res.status(200).send({data: house});
    })

router
    .route("/")
    .post( async (req,res) => {
        // console.log(req);
        const device = await deviceController.findDevice(req.body.key);

        if(device[0].houseid == null){
            await houseController.insertHouse(req.body, req.user);
        }

        const house = await houseController.findByOwner(req.user.id);
        res.status(200).send({data: house});
    })
module.exports = router;