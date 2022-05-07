const gardenRouter = require('./garden.router')
const scheduleRouter = require('./schedule.router')
const dataRouter = require('./data.router.js')

function route(app) {
    app.use('/garden', gardenRouter)
    app.use('/schedule', scheduleRouter)
    app.use('/data', dataRouter)
}

module.exports = route;