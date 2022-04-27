const garden = require('../models/Garden');

class dataController {
    getGarden(req, res){
        console.log(req.params.id)
        res.send({message: "Garden id: ${req.params.id}"});
    }
}

module.exports = new dataController();