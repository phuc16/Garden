const gardenRouter = require('./garden')

function route(app) {
    app.use('/garden', gardenRouter)
}

module.exports = route;