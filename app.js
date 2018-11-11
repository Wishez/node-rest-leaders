
const express = require('express')
const app = express()
const morgan = require('morgan')

const leadersRoutes = require('./api/routes/leaders')
const ordersRoutes = require('./api/routes/orders')

app.use(morgan('dev'));

// Routes
app.use('/api/leaders', leadersRoutes)
app.use('/api/orders', ordersRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message,
        }
    })
})

module.exports = app