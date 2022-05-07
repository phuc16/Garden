const device = require('../models/device.model');
const schedule = require('../models/schedule.model')

exports.getSchedule = (req, res, err) => {
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

            schedule.getSchedule(body, (err, data) => {
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
