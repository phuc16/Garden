const db = require('../../config/db');

exports.getScheduleByDeviceId = (body, result) =>{
    let query = `SELECT * FROM schedules WHERE id_device = ${body.id} AND time_start >= '${body.startDay}' AND time_end <= '${body.endDay}'`;

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

        if (res.rowCount) {
            console.log("found schedule: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

exports.getAll = (body, result) =>{
    let query = `SELECT * FROM schedules WHERE time_start >= '${body.startDay}' AND time_end <= '${body.endDay}'`;

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