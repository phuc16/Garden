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
            if (result.rows.length == 0) res.status(400).send(`Garden have id ${req.params.id} Not Found or dont have user`)
            else {
                console.log(`SELECT * FROM users WHERE ${(result.rows).map(element => {
                    return `id = ${element.id_user} `
                }).join(" OR ")}`)
                db.query(`SELECT * FROM users WHERE ${(result.rows).map(element => {
                    return `id = ${element.id_user} `
                }).join(" OR ")}` , (err,result) => {
                    if (err) res.send({"error" : err})
                    else res.send(result.rows)
                })
            }
        }
    })

}


exports.getGardenByUser = (req, res) => {
    db.query(`SELECT * FROM user_garden WHERE id_user = ${req.params.id}` , (err,result) => {
        if (err) res.send({"error" : err})
        else {
            if (result.rows.length == 0) res.status(400).send(`Garden have id ${req.params.id} Not Found or dont have user`)
            else {
                console.log(`SELECT * FROM users WHERE ${(result.rows).map(element => {
                    return `id = ${element.id_garden} `
                }).join(" OR ")}`)
                db.query(`SELECT * FROM users WHERE ${(result.rows).map(element => {
                    return `id = ${element.id_garden} `
                }).join(" OR ")}` , (err,result) => {
                    if (err) res.send({"error" : err})
                    else res.send(result.rows)
                })
            }
        }
    })

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
    
    try {
        insertIntoTable('users', req.body);
    } catch (e) {
        res.status(400).send(e)
        return
    }    
    if (req.body.id_garden) {
                let queryStr = `INSERT INTO user_garden (id_user,id_garden) VALUES ${
                    (req.body.id_garden).map(element => {
                    return `(SELECT id FROM users ORDER BY id DESC LIMIT 1, ${element})`
                })}`
                console.log(queryStr)
                db.query(queryStr, (err,result) => {
                    if (err) {
                        res.send(err)
                    }  
                    })

    }
}



exports.updateUserInfo = (req, res) => {

    updateById('users', req.body, req.params.id)
    
}

exports.deleteUser = (req, res) => {

    db.query(`DELETE FROM users WHERE id = ${req.params.id}` , (err,result) => {
        if (err) res.send( err )
        else res.send(result.rows)
    })
    
}




