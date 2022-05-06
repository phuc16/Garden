const gardenRouter = require('./garden.router')
const deviceRouter = require('./device.router')

function route(app) {
    app.use('/garden', gardenRouter)
    app.use('/device', deviceRouter)
}

module.exports = route;