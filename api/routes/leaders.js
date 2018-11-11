const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Leader = require('../models/leader')

const handerError = (error, res) => {
    console.log(error)
    res.status(500).json({ 
        data: null,
        meta: {
            message: 'Something going wrong',
            status: 'ERROR',
            error,
        }
    })
}

const defaultMeta = {
    message: '',
    status: 'OK'
}

const notFoundMeta = {
    message: 'Not Found',
    status: 'ERROR',
}

const handleResponse = (response, data, resultCode = 200) => {
    console.log(data)
    if (data) {
        response.status(resultCode).json({
            data,
            meta: defaultMeta
        })
    } else {
        response.status(404).json({
            data: null,
            meta: notFoundMeta
        })
    }
}

router.get('/', (req, res, next) => {
    Leader.find()
        .then(leaders => handleResponse(res, leaders))
        .catch(error => handerError(error, res))
})

router.get('/:leaderId', (req, res, next) => {
    const id = req.params.leaderId;
    
    Leader.findById(id)
        .then(leader => handleResponse(res, leader))
        .catch(error => handerError(error, res))
    
})

router.post('/', (req, res, next) => {
    const { authorName, comment, leaderName, leaderImage } = req.body 
    const leader = new Leader({
        _id: mongoose.Types.ObjectId(),
        leaderName,
        authorName,
        comment,
        leaderImage,
    })

    leader.save()
        .then(result => handleResponse(res, result, 201))
        .catch(error => handerError(error, res))

})

router.delete('/:leaderId', (req, res) => {
    const { leaderId } = req.params
    Leader.remove({ _id: leaderId })
        .then(result => handleResponse(res, result))
        .catch(error => handerError(error, res))

})



module.exports = router