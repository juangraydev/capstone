const express = require("express");
let router = express.Router();

let houseController = require('../../controller/houseController');

router
    .route("/list")
    .get( async (req, res) => {
        const house = await houseController.findByOwner(req.user.id);
        res.status(200).send({data: house});
    })

module.exports = router;