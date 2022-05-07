const gardenRouter = require('./garden.router')
const scheduleRouter = require('./schedule.router')
const dataRouter = require('./data.router.js')
const userRouter = require('./user.router.js')
const deviceRouter = require('./device.router')

function route(app) {
    app.use('/garden', gardenRouter)
    app.use('/schedule', scheduleRouter)
    app.use('/data', dataRouter)
    app.use('/user', userRouter)
    app.use('/device', deviceRouter)
}

module.exports = route;