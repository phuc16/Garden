const db = require('../models/db.model.js');

exports.getSchedule = async (req, res) => {
    startDate = req.query.startDate;
    endDate = req.query.endDate;
    device = await db.products.findOne({Device: req.params.id});
    var schedule = device.Schedule;
    var schedules = []
    for (let i = 0; i < schedule.length; i++) {
        if (!((new Date(startDate) > new Date(schedule[i].timeEnd)) || (new Date(endDate) < new Date(schedule[i].timeStart)))){
            schedules.push(schedule[i])
        }
    }
    res.json(schedules)
}