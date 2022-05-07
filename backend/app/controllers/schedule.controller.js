const device = require('../models/device.model');
const schedule = require('../models/schedule.model')

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
                startDate: req.query.startDay,
                endDate: req.query.endDay
            };

            schedule.getScheduleByDeviceId(body, (err, data) => {
                if (err)
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving device."
                    });
                else res.send(data);
            });
        }
    });
}

exports.getScheduleById = (req, res) => {
    device.findById(req.params.id, (err, data) => {
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
        else res.send(data);
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
        startDate: req.query.startDay,
        endDate: req.query.endDay
    };

    schedule.getAll(body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving device."
            });
        else res.send(data);
    });
}

exports.insertSchedule = (req, res) => {
    service.insertIntoTable('schedules', req.body)
    res.send(req.body)
}

exports.updateSchedule = (req, res) => {
    service.updateById('schedules', res.body, req.params.id)
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