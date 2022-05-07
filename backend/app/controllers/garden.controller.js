const db = require('../../config/db');
const { insertIntoTable, updateById } = require('./insertService')

exports.getGardenStatistic = (req, res) => {
    
}

exports.getAllGarden = (req, res) => {
    db.query("SELECT * FROM gardens" , (err,result) => {
        if (err) res.send({"error" : err})
        else res.send(result.rows)
    })
}


exports.getGardenById = (req, res) => {
    db.query(`SELECT * FROM gardens WHERE id = ${req.params.id}` , (err,result) => {
        if (err) res.send({"error" : err})
        else res.send(result.rows)
    })
}


exports.insertGarden = (req, res) => {
    insertIntoTable('gardens', req.body);
    res.send(req.body)
}



exports.updateGarden = (req, res) => {

    updateById('gardens', req.body, req.params.id)
    
}

exports.deleteGarden = (req, res) => {

    db.query(`DELETE FROM gardens WHERE id = ${req.params.id}` , (err,result) => {
        if (err) res.send({"error" : err})
        else res.send(result.rows)
    })
    
}




