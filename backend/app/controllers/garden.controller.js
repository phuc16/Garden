const db = require('../../config/db');
const { insertIntoTable, updateById } = require('./Service')
const axios = require('axios')

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
    axios.put('https://io.adafruit.com/api/v2/mp5navy/feeds/sync/data/0F17Z6X3EZE3TKB5EH0CEM3KTV', 
    {
        "datum" : { "value" : "0" }
    },
    { headers : {
        "X-AIO-Key": "aio_rKEU43c1eB2HeL1fYuMm4JPjOket"

    }}
    )
    .then(res => console.log(res.data))
    // insertIntoTable('gardens', req.body);
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




