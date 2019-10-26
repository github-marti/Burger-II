const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", function(req, res) {
    db.Burger.findAll()
    .then(results => {
        let hbsObject = {
            burgers: results
        };
        console.log('hbsObject', hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    db.Burger.create(req.body.burger)
    .then(
        db.Customer.create(req.body.customer)
        .then(
        results => {
        res.json({ id: results.insertId });
        })
    );
});

router.put("/api/burgers/:id", function(req, res) {
    db.Burger.update(
        req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(results => {
        if (results.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete("/api/burgers/:id", function(req, res) {
    db.Burger.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => {
        console.log(result);
        res.end();
    })
})

module.exports = router;