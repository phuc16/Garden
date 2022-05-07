const db = require('../../config/db');

exports.getScheduleByDeviceId = (body, result) =>{
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

exports.findById = (id, result) => {
    db.query(`SELECT * FROM schedules WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found schedule: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

exports.getAll = (body, result) =>{
    let query = `SELECT * FROM schedules WHERE time > '${body.startDay}' AND time < '${body.endDay}`;

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

exports.deleteById = (id, result) => {
    db.query(`DELETE FROM schedules WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
}

exports.deleteAll = (result) => {
    db.query(`DELETE FROM schedules`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
}