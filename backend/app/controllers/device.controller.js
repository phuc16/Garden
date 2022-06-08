const service = require('./Service');
const device = require('../models/device.model');
const axios = require('axios')

exports.getAllDevices = (req, res) => {
    device.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some errors occurred while retrieving device."
            });
        else res.send(data.rows);
    });
}


exports.controlDevice = (req, res) => {
    device.getAll((err, data) => {
        if (err)
            res.status(500).send({
            message:
                err.message || "Some errors occurred while retrieving device."
            });
        else res.send(data.rows);
        
    });
}


exports.getDeviceById = (req, res) => {
    device.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found device with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: `Error retrieving device with id ${req.params.id}.`
                });
            }
        } 
        else res.send(data.rows);
    }); 
}

exports.insertDevice = (req, res) => {
    service.insertIntoTable('devices', req.body)
    res.send(req.body)
}

exports.updateDevice = (req, res) => {
    // service.updateById('devices', req.body, req.params.id) // code of Phuc
    device.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found device with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: `Error retrieving device with id ${req.params.id}.`
                });
            }
        } 
        else {
            let feed_key = data.rows[0].category.toLowerCase()
            
            if (req.body.status != undefined) {
                axios.post(`https://io.adafruit.com/api/v2/mp5navy/feeds/${feed_key}/data`
                , { "datum" : { "value" : `${req.body.status}` } }
                , { headers : { "X-AIO-Key": "aio_mNvl15oDY0UkoCTem5kA4Cc4aoVH" } })
                    .catch(err => console.log(err))
            }
        }
    });
    
    service.update('devices', req.body, req.params.id)
    res.send(req.body)
}


exports.deleteAll = (req, res) => {
    device.deleteAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some errors occurred while delete devices."
            });
        else res.send({ message: `All devices were deleted successfully!` });
    });
}

exports.deleteId = (req, res) => {
    device.deleteById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found device with id ${req.params.id}.`
                });
            } 
            else {
                res.status(500).send({
                    message: `Could not delete device ${req.params.id}`
                });
            }
        }
        else res.send({ message: `Device ${req.params.id} was deleted successfully!` });
    });     
}