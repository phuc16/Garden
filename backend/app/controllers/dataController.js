const db = require('../../config/db');
const { insertIntoTable } = require('./insertService')

exports.getDataInfo = (req, res) => {
    if (!req.query.startDay || !req.query.endDay) {
        // res.send("Miss Day")
        res.send(req.query)
        res.status(400)
        return
    }

    db.query(`SELECT * FROM datas WHERE time > '${req.query.startDay}' AND time < '${req.query.endDay}'`, (err,result) => {
        console.log(result.rows);  
        res.send(result.rows)
    })
}


exports.getDatabyGarden = (req, res) => {
    db.query(`SELECT * FROM datas WHERE id_garden = ${req.params.id}` , (err,result) => {
        console.log(result.rows);  
        res.send(result.rows)
    })
}



exports.getAlldata = (req, res) => {
    db.query("SELECT * FROM datas" , (err,result) => {
        console.log(result.rows);  
        res.send(result.rows)
    })
}


exports.insertData = (req, res) => {

    insertIntoTable('datas', req.body)
    res.send(req.body)
    // db.query("INSERT INTO datas(id,category,value,id_garden,time) VALUES (1,'Temp',100.2,1,'2001-08-20') ", (err,result) => {
    //     if (err) console.log(err)
    //                     else {
    //                         console.log(result);  
    //                         res.send(req.body)
    //                     }
    // })
}