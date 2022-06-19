const fs = require("fs");
const { parse } = require("csv-parse");
const axios = require('axios');

exports.predictTemperature = (req, res) => {
    const fs = require('fs');
    let input = fs.readFileSync('./app/controllers/temperature_prediction/input_file.json');
    let data = JSON.parse(input);

    if (!req.query.timeGap) {
        req.query.timeGap = 15
    }

    data = {
        ...data,
        start: req.query.startTime,
        stop: req.query.endTime,
        time_gap: Number(req.query.timeGap)
    }

    let dataInput = JSON.stringify(data);
    fs.writeFileSync('./app/controllers/temperature_prediction/input_file.json', dataInput);

    const { spawn } = require("child_process");
    const predict = spawn('python', [
        './app/controllers/temperature_prediction/main.py',
        './app/controllers/temperature_prediction/input_file.json',
        './app/controllers/temperature_prediction/result.csv'
    ]);

    var result = []

    predict.stdout.on("data", data => {
        fs.createReadStream("./app/controllers/temperature_prediction/result.csv")
            .pipe(parse({ delimiter: ",", from_line: 2 }))
            .on("data", function (row) {
                result.push({ date: row[0], tempPredict: row[4] })
                console.log
            })

            .on("end", function () {
                console.log("finished");
            })

            .on("error", function (error) {
                console.log(error.message);
            });
    });

    predict.stderr.on("data", data => {
        console.log(`stderr: ${data}`);
    });

    predict.on('error', (error) => {
        console.log(`error: ${error.message}`);
    });

    predict.on("close", code => {
        let filterResult = result.filter((temp) => {
            return temp.tempPredict >= 20
        })

        filterResult.forEach((data) => {
            axios.post('https://universe-smart-garden.herokuapp.com/schedule/?condition=24&increased=-1', {
                "id_device" : req.body.id_device,
                "time_start" : data.date,
                "status" : 0
            })
            .then(res => {
                console.log(res)
            })
        })
        res.send({ result: result })
        console.log(`child process exited with code ${code}`);
    });
}