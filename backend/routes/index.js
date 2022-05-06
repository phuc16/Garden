const gardenRouter = require('./garden.router')
const deviceRouter = require('./device.router')
const dataRouter = require('./data.router.js')

function route(app) {
    app.use('/garden', gardenRouter)
    app.use('/device', deviceRouter)
    app.use('/data', dataRouter)
}

module.exports = route;