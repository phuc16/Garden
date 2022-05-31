const device = require('../models/device.model');
const schedule = require('../models/schedule.model');
const service = require('./Service');
const axios = require('axios')

exports.getScheduleByDeviceId = (req, res, err) => {
    if (!req.query.startDay || !req.query.endDay) {
        res.status(400).send({
            message:
              err.message || "Miss date!"
          });
        return
    }

    if (new Date(req.query.startDay) > new Date(req.query.endDay)) {
        res.status(400).send({
            message:
              err.message || "Invalid date!"
          });
        return
    }

    device.findById(req.params.device_id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Device with id ${req.params.device_id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: `Error retrieving Device with id ${req.params.device_id}.`
                });
            }
        } 
        else {
            body = {
                id: req.params.device_id,
                startDay: req.query.startDay,
                endDay: req.query.endDay
            };

            schedule.getScheduleByDeviceId(body, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving device."
                    });
                else {
                    // for (let row of data.rows){
                    //     row['time_start'] = row['time_start'].toLocaleString('en-GB');
                    //     row['time_end'] = row['time_end'].toLocaleString('en-GB');
                    // }
                    res.send(data.rows);
                }
            });
        }
    });
}

exports.getScheduleById = (req, res) => {
    schedule.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found schedule with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: `Error retrieving schedule with id ${req.params.id}.`
                });
            }
        } 
        else {
            // for (let row of data.rows){
            //     row['time_start'] = row['time_start'].toLocaleString('en-GB');
            //     row['time_end'] = row['time_end'].toLocaleString('en-GB');
            // }
            res.send(data.rows);
        }
    }); 
}

exports.getAllSchedules = (req, res, err) => {
    if (!req.query.startDay || !req.query.endDay) {
        res.status(400).send({
            message:
              err.message || "Miss date!"
          });
        return
    }

    if (new Date(req.query.startDay) > new Date(req.query.endDay)) {
        res.status(400).send({
            message:
              err.message || "Invalid date!"
          });
        return
    }

    body = {
        startDay: req.query.startDay,
        endDay: req.query.endDay
    };

    schedule.getAll(body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving device."
            });
            else {
                for (let row of data.rows){
                    if (row.time_end.getYear() < 100) row.time_end = 'null'
                    // console.log(row.time_end.getYear())
                    // row['time_start'] = row['time_start'].toLocaleString('en-GB');
                    // row['time_end'] = row['time_end'].toLocaleString('en-GB');
                }
                res.send(data.rows);
            }
    });
}


exports.getAllScheduleUnfulfilled = (req, res, err) => {
    schedule.getAllScheduleUnfulfilled(res)
}


exports.insertSchedule = (req, res, err) => {
    if (!req.body.time_start) {
        res.status(400).send({
            message:
              err.message || "Miss date!"
          });
        return
    }

    if (req.body.time_end && new Date(req.body.time_start) > new Date(req.body.time_end)) {
        res.status(400).send({
            message:
              err.message || "Invalid date!"
          });
        return
    }
   

    
    if (!req.body.time_end){   
        // ?condition=300
        if (req.query.condition != undefined) {
            req.body.time_end = new Date()
            req.body.time_end.setTime((req.query.condition * req.query.increased * 1000));
            // console.log(req.body.time_end.toISOString().slice(0, 19).replace('T', ' '))
            // return
            req.body.time_end = req.body.time_end.toISOString().slice(0, 19).replace('T', ' ')
            console.log(req.body.time_end)
            // return
        }
        else req.body.time_end = 'NULL'
    }


    axios.get(`https://io.adafruit.com/api/v2/mp5navy/feeds/sync/data/last`
            , { headers : { "X-AIO-Key": "aio_rKEU43c1eB2HeL1fYuMm4JPjOket" } })
            .then(adafruitResponse => {
                axios.put(`https://io.adafruit.com/api/v2/mp5navy/feeds/sync/data/${adafruitResponse.data.id}`
                            , { "datum" : { "value" : "1" } }
                            , { headers : { "X-AIO-Key": "aio_rKEU43c1eB2HeL1fYuMm4JPjOket" } })
                    .catch(err => console.log(err))
            })
    service.insertIntoTable('schedules', req.body)
    res.send(req.body)
}

exports.updateSchedule = (req, res, err) => {
    if (!req.body.time_start) {
        res.status(400).send({
            message:
              err.message || "Miss date!"
          });
        return
    }

    if (!req.body.time_end){
        req.body.time_end = 'NULL'
    }

    if (req.body.time_end && new Date(req.body.time_start) > new Date(req.body.time_end)) {
        res.status(400).send({
            message:
              err.message || "Invalid date!"
          });
        return
    }

    service.updateById('schedules', req.body, req.params.id)
    res.send(req.body)
}

exports.deleteAll = (req, res) => {
    schedule.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some errors occurred while delete schedules."
            });
        else res.send({ message: `All schedules were deleted successfully!` });
    });
}

exports.deleteId = (req, res) => {
    schedule.deleteById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found schedule with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: `Could not delete schedule ${req.params.id}`
                });
            }
        }
        else res.send({ message: `Schedule ${req.params.id} was deleted successfully!` });
    });     
}