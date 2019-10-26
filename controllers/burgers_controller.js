const db = require("../models");

module.exports = function(app) {
    app.get("/", function(req, res) {

        db.Burger.findAll({
            include: [
              {
                model: db.Customer
              }
            ]
          })
        .then(results => {
            let hbsObject = {
                burgers: results
            };
            console.log("burger get results", results);
            console.log('hbsObject', hbsObject);
            res.render("index", hbsObject);
        });
    });

    app.post("/api/burgers", function(req, res) {
        db.Burger.create(req.body)
        .then(results => {
            res.json({ id: results.insertId });
            }
        );
    });

    app.put("/api/burgers/:id", function(req, res) {
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

    app.delete("/api/burgers/:id", function(req, res) {
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
};