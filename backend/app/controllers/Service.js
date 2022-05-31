const db = require('../../config/db');
const device = require('../models/device.model')


exports.insertIntoTable = (tableName, data) => {
    db.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name   = ($1)`, [tableName], (err, result) => {
            if (err) {
                console.log(err)
                throw err 
            }
            let columns = ""
            let datas = ""
            for (let x of result.rows) {
                if (x.column_name === 'id') continue;
                console.log(x.column_name)

                // if (x.column_name.includes('time')){
                //     day = new Date(data[x.column_name])
                //     day.setDate(day.getDate() + 1);
                //     data[x.column_name] = day.toISOString()
                //     console.log(data[x.column_name])
                // }
                
                if (data[x.column_name] === 'NULL'){
                    datas += "," + (data[x.column_name])
                }

                else if (typeof data[x.column_name] === 'string')                     
                    datas += ",'" + data[x.column_name] + "'"
                else datas += "," + (data[x.column_name])
                columns += "," + x.column_name
            }
            console.log(columns.slice(1))
            console.log(datas.slice(1))
            let queryString = `INSERT INTO ${tableName}(${columns.slice(1)}) VALUES (${datas.slice(1)})`
            console.log(queryString)
            db.query(queryString, (err,result) => {
                if (err) throw err 
                else {
                    console.log(result);  
                }
            })
        }
    );
}

exports.update = (tableName, data, id) => {
    let changeOfRecord = ''
    let keys = Object.keys(data)
    for (let x of keys) {
        changeOfRecord += `, ${x} = ${(typeof data[x] === 'string') ? `'${data[x]}'`
        : data[x]}` 
    }
    let updateQuery = `UPDATE ${tableName} SET${changeOfRecord.slice(1)} WHERE id = ${id}`
    console.log(updateQuery)
    db.query(updateQuery, (err,result) => {
        if (err) console.log(err)
        else {
            console.log(result);  
        }
    })
}


exports.updateById = (tableName, data, id) => {
     
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

            // if (x.column_name.includes('time')){
            //     day = new Date(data[x.column_name])
            //     day.setDate(day.getDate() + 1);
            //     data[x.column_name] = day.toISOString()
            //     console.log(data[x.column_name])
            // }
            
            updateString += `, ${x.column_name} = ${data[x.column_name] === 'NULL' ? 'NULL' : (typeof data[x.column_name] === 'string') ? `'${data[x.column_name]}'`
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


exports.responseSchedule = (schedule, response) => {
    let myArray = []
    let len = schedule.length
    for (let i = 0; i < len ; i++){
        device.findById(schedule[i].id_device, (err, data) => {
            let responseData = {
                id : schedule[i].id
            }
            let typeDevice = data.rows[0].category
            var condition = ``
            let command = ``
            if (typeDevice == 'PUMP' || typeDevice == 'MIST' ) command += `${typeDevice}:1/${typeDevice}:0`
            else if (typeDevice == 'LAMP') command += 'LAMP:150/LAMP:0'
            if (schedule[i].time_end && schedule[i].time_end.getYear() < 100) {
                if (typeDevice == 'PUMP') condition += `/MOIST`
                else if (typeDevice == 'MIST') condition += `/HUMID`
                else if (typeDevice == 'LAMP') condition += `/LIGHT`
                let timeForCheck = new Date(schedule[i].time_end.getTime() - schedule[i].time_end.getTimezoneOffset()*60*1000)
                // console.log(timeForCheck)
                if (timeForCheck.getTime() >= 0) condition += `>${timeForCheck.getTime()/1000}`
                else condition += `<${-timeForCheck.getTime()/1000}`
            }
            // console.log(condition)
            // return
            //`${typeDevice}:1/${typeDevice}:0/FOR/${(schedule[i].time_end - schedule[i].time_start)/1000}`
            responseData['command'] = command + condition
            responseData.time = `${schedule[i].time_start.getDay()}:${schedule[i].time_start.getMonth()+1}:${schedule[i].time_start.getYear()+1900}:` 
                                + schedule[i].time_start.toLocaleTimeString()
            responseData.status = schedule[i].status
            // console.log(responseData)
            myArray.push(responseData)
            // response.send(myArray)
            // response.send(responseData)
            // console.log(myArray)
            if (i == len - 1) response.send(myArray)
        })
    }

    
}

