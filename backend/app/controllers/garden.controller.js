const db = require('../models/db.model.js');

exports.getGardenStatistic = (req, res) => {
    db.findById(req.params.id, (err, gardens) => {
        if (!err) {
            res.json(gardens.Data);
        }
        else{
            res.status(404).json("message: 'Fail!'")
        }
    });
}