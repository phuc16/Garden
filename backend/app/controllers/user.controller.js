const db = require('../../config/db');
const { insertIntoTable, updateById } = require('./insertService')

exports.getAllUser = (req, res) => {
    db.query("SELECT * FROM users" , (err,result) => {
        if (err) res.send({"error" : err})
        else res.send(result.rows)
    })
}


exports.getUserByGarden = (req, res) => {
    db.query(`SELECT * FROM user_garden WHERE id_garden = ${req.params.id}` , (err,result) => {
        if (err) res.send({"error" : err})
        else {
            if (result.rows.length == 0) res.status(400).send(`Garden have id : ${req.params.id} Not Found or dont have user`)
            else {
                console.log(result.rows)
            }
        }
    })

    // db.query("SELECT * FROM users" , (err,result) => {
    //     if (err) res.send({"error" : err})
    //     else res.send(result.rows)
    // })
}


exports.getUserById = (req, res) => {
    db.query(`SELECT * FROM users WHERE id = ${req.params.id}` , (err,result) => {
        if (err) res.send({"error" : err})
        else {
            let response = {...result.rows[0]}
            delete response.password
            console.log(result.rows)
            res.send(response)
        }
    })
}


exports.insertUser = (req, res) => {
    insertIntoTable('users', req.body);
    res.send(req.body)
}



exports.updateUserInfo = (req, res) => {

    updateById('users', req.body, req.params.id)
    
}

exports.deleteUser = (req, res) => {

    db.query(`DELETE FROM users WHERE id = ${req.params.id}` , (err,result) => {
        if (err) res.send({"error" : err})
        else res.send(result.rows)
    })
    
}




