const db = require("../models");

module.exports = function(app) {
    app.post("/api/customers", function(req, res) {
        db.Customer.create(req.body)
        .then(results => {
            console.log("customer successfully saved", results)
            res.json(results);
            }
        );
    });
};