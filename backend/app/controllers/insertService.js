const db = require('../../config/db');


exports.insertIntoTable = (tableName, data) => {
    db.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name   = ($1)`, [tableName], (err, result) => {
            if (err) {
                console.log(err)
                return 
            }
            let columns = ""
            let datas = ""
            for (let x of result.rows) {
                if (x.column_name === 'id') continue;
                console.log(x.column_name)

                // đoạn này khác múi giờ nên t phải +1 day lên
                if (x.column_name.includes('time')){
                    day = new Date(data[x.column_name])
                    day.setDate(day.getDate() + 1);
                    data[x.column_name] = day.toISOString()
                    console.log(data[x.column_name])
                }
                //

                if (typeof data[x.column_name] === 'string')                     
                    datas += ",'" + data[x.column_name] + "'"
                else datas += "," + (data[x.column_name])
                columns += "," + x.column_name
            }
            console.log(columns.slice(1))
            console.log(datas.slice(1))
            let queryString = `INSERT INTO ${tableName}(${columns.slice(1)}) VALUES (${datas.slice(1)})`
            console.log(queryString)
            db.query(queryString, (err,result) => {
                if (err) console.log(err)
                else {
                    console.log(result);  
                }
            })
        }
    );
}

// exports.insertIntoTable = (tableName, data) => {
//     db.query(`
//             SELECT column_name 
//             FROM information_schema.columns 
//             WHERE table_name   = ($1)`, [tableName], (err,result) => {
//                 if (err) {
//                     console.log(err)
//                     return 
//                 }
//                 let columns = ""
//                 let datas = ""
//                 for (let x of result.rows) {
//                     console.log(x.column_name)
//                     if (typeof data[x.column_name] === 'string')                     
//                         datas += ",'" + data[x.column_name] + "'"
//                     else datas += "," + (data[x.column_name])
//                     columns += "," + x.column_name
//                 }
//                 console.log(columns.slice(1))
//                 console.log(datas.slice(1))
//                 let queryString = `INSERT INTO ${tableName}(${columns.slice(1)}) VALUES (${datas.slice(1)})`
//                 console.log(queryString)
//                 db.query(queryString, (err,result) => {
//                         if (err) console.log(err)
//                         else {
//                             console.log(result);  
//                         }
//                     })
//             })
// }

// exports.updateById = (tableName, data, id) => {

//     db.query(`SELECT * FROM gardens WHERE id = ${id}`, (err,result) => {
//         if (err) console.log("1 " , err)
//         else {
//             if (result.rows.length == 0) {
//                 insertIntoTable('gardens', req.body)
//             }
//             else {        
//                 db.query(`
//                 SELECT column_name 
//                 FROM information_schema.columns 
//                 WHERE table_name   = ($1)`, [tableName], (err,result) => {
//                     if (err) {
//                         console.log(err)
//                         return 
//                     }
//                     let updateString = ""
//                     for (let x of result.rows) {

//                         console.log(x.column_name)
                        
//                         updateString += `, ${x.column_name} = ${(typeof data[x.column_name] === 'string') ? `'${data[x.column_name]}'`
//                         : data[x.column_name]}` 
                                        
//                     }
//                     let queryString = `UPDATE ${tableName} SET${updateString.slice(1)} WHERE id = ${id}`
//                     console.log(queryString)
//                     db.query(queryString, (err,result) => {
//                             if (err) console.log(err)
//                             else {
//                                 console.log(result);  
//                             }
//                         })
//                 })                
//             }
//         }
//     })

// }

exports.updateById = (tableName, data, id) => {
    db.query(`SELECT * FROM gardens WHERE id = ${id}`, (err,result) => {
        if (err) console.log("1 " , err)
        else {
            if (result.rows.length == 0) {
                insertIntoTable('gardens', req.body)
            }
            else {        
                db.query(`
                SELECT column_name 
                FROM information_schema.columns 
                WHERE table_name   = ($1)`, [tableName], (err,result) => {
                    if (err) {
                        console.log(err)
                        return 
                    }
                    let updateString = ""
                    console.log(result)
                    for (let x of result.rows) {
                        if (x.column_name === 'id') continue;
                        console.log(x.column_name)

                        // đoạn này khác múi giờ nên t phải +1 day lên
                        if (x.column_name.includes('time')){
                            day = new Date(data[x.column_name])
                            day.setDate(day.getDate() + 1);
                            data[x.column_name] = day.toISOString()
                            console.log(data[x.column_name])
                        }
                        //
                        
                        updateString += `, ${x.column_name} = ${(typeof data[x.column_name] === 'string') ? `'${data[x.column_name]}'`
                        : data[x.column_name]}` 
                                        
                    }
                    let queryString = `UPDATE ${tableName} SET${updateString.slice(1)} WHERE id = ${id}`
                    console.log(queryString)
                    db.query(queryString, (err,result) => {
                            if (err) console.log(err)
                            else {
                                console.log(result);  
                            }
                        })
                })                
            }
        }
    })

}

