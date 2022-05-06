const db = require('../../config/db');

exports.getGardenStatistic = (req, res) => {
    db.query("SELECT * FROM account garden" , (err,result) => {
        console.log(result);  
        res.send(result + "")
    })
}