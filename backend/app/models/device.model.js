const db = require('../../config/db');

exports.findById = (id, result) => {
    db.query(`SELECT * FROM devices WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.rowCount) {
            // console.log("found device: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

exports.getAll = (result) => {
    db.query('SELECT * FROM devices', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("devices: ", res);
        result(null, res);
    });
}

exports.deleteById = (id, result) => {
    db.query(`DELETE FROM devices WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rowCount == 0) {
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    });
}

exports.deleteAll = (result) => {
    db.query(`DELETE FROM devices`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
}