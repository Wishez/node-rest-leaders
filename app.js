
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

const leadersRoutes = require('./api/routes/leaders')

mongoose.connect(`mongodb://shiningfinger:${process.env.MONGO_ATLAS_PW}@node-rest-leaders-shard-00-00-pqfcq.mongodb.net:27017,node-rest-leaders-shard-00-01-pqfcq.mongodb.net:27017,node-rest-leaders-shard-00-02-pqfcq.mongodb.net:27017/test?ssl=true&replicaSet=node-rest-leaders-shard-0&authSource=admin&retryWrites=true`, {
    useNewUrlParser: true,
})
mongoose.Promise = global.Promise

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next()
})

// Routes
app.use('/api/leaders', leadersRoutes)

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
