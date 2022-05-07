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


exports.insertGarden = (req, res) => {
    insertIntoTable('gardens', req.body);
    res.send(req.body)
}



exports.updateGarden = (req, res) => {

    updateById('gardens', req.body, req.params.id)

    // db.query(`SELECT * FROM gardens WHERE id = ${req.params.id}`, (err,result) => {
    //     if (err) console.log("1 " , err)
    //     else {
    //         if (result.rows.length == 0) {
    //             insertIntoTable('gardens', req.body)
    //         }
    //         else {
    //             console.log(`UPDATE gardens SET ${req.body} WHERE id = ${req.params.id}`)
    //             db.query(`UPDATE gardens SET ${req.body} WHERE id = ${req.params.id}`, (err,result) => {
    //                 if (err) console.log("2 " ,err)
    //                 else res.send(result.rows)
    //             })
    //         }
    //     }
    // })
    
}




