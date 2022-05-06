exports.insertIntoTable = (tableName, data) => {
    db.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name   = ($1)`, [tableName], (err,result) => {
                if (err) {
                    console.log(err)
                    return 
                }
                let columns = ""
                let datas = ""
                for (let x of result.rows) {
                    console.log(x.column_name)
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
            })
}