exports.predictTemperature = (req, res) => {
    var spawn = require('child_process').spawn;

    // E.g : http://localhost:3000/name?firstname=van&lastname=nghia
    var process = spawn('python', [
        './app/controllers/temperature_prediction/main.py'
    ]);
    process.stdout.on('data', function(data) {
        // console.log(data.toString());
  
        res.send({a:1});
    });
}


