const db = require('../../config/db');

exports.getSchedule = (body, result) =>{
    let query = `SELECT * FROM schedules WHERE id_device = ${body.id} AND time > '${body.startDay}' AND time < '${body.endDay}`;

    db.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("schedules: ", res);
        result(null, res);
    });
}