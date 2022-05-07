const db = require('../../config/db');
const { insertIntoTable } = require('./insertService')


// GET /search?idGarden=&startDay=&endDay=
exports.getDataInfo = (req, res) => {
    if (!req.query.startDay || !req.query.endDay) {
        res.status(400).send({
            message:
              err.message || "Miss date!"
          });
        return
    }

    if (new Date(req.query.startDay) > new Date(req.query.endDay)) {
        res.status(400).send({
            message:
              err.message || "Invalid date!"
          });
        return
    }

    db.query(`SELECT * FROM datas WHERE id_garden = ${req.query.idGarden}
              AND time > '${req.query.startDay}' AND time < '${req.query.endDay}'`, (err,result) => {
                  if (err) res.send({"error" : err})
                  else res.send(result.rows)
    })
}


exports.getAlldata = (req, res) => {
    db.query("SELECT * FROM datas" , (err,result) => {
        if (err) res.send({"error" : err})
        else res.send(result.rows)
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