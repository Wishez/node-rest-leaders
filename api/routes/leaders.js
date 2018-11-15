const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()

const Leader = require('../models/leader')

const leadersApiUrl = 'http://localhost:4000/api/leaders'

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

router.get('/', (req, res) => {
    Leader.find()
        .then(leaders => {
            const data = leaders.reduce((accummulatedLeaders, leader) =>  {
                let leadersType = ''
                if(leader.isShown) {
                    leadersType = 'leaders'
                } else {
                    leadersType = 'notShownLeaders'
                }
                accummulatedLeaders[leadersType].push(leader)
                return accummulatedLeaders
            }, 
            {
                leaders: [],
                notShownLeaders: []
            })
            return handleResponse(
                res, 
                Object.assign({
                    quantity: data.leaders.length,
                }, data))
        }).catch(error => handerError(error, res))
})

router.get('/:leaderId', (req, res, next) => {
    const id = req.params.leaderId;
    
    Leader.findById(id)
        .then(leader => handleResponse(res, leader))
        .catch(error => handerError(error, res))
    
})

router.post('/', (req, res) => {
    const { authorName, comment, leaderName, leaderImage } = req.body 
    const leaderId = mongoose.Types.ObjectId()
    const leader = new Leader({
        _id: leaderId,
        leaderName,
        authorName,
        comment,
        leaderImage,
    })

    leader.save()
        .then(result => handleResponse(res, {
            message: 'You created a leader!',
            request: {
                type: 'GET',
                url: `${leadersApiUrl}/${leaderId}`
            }
        }, 201))
        .catch(error => handerError(error, res))
})

router.delete('/:leaderId', (req, res) => {
    const { leaderId } = req.params
    Leader.remove({ _id: leaderId })
        .then(result => handleResponse(res, {
            message: 'You deleted a leader.',
            request: {
                type: 'POST',
                url: leadersApiUrl,
                body: {
                    leaderName: "String",
                    authorName: "String",
                    leaderImage: "String",
                    comment: "String",
                    isShown: true,
                },
            }
        }))
        .catch(error => handerError(error, res))
})

router.patch('/:leaderId', (req, res, next) => {
    const updatedFields = {}
    const payload = req.body
    for (const fieldName of Object.keys(req.body)) {
        updatedFields[fieldName] = payload[fieldName]
    }
    
    const { leaderId } = req.params
    Leader.update({ _id: leaderId }, { $set: updatedFields })
        .then(() => handleResponse(res, {
            message: 'You updated the product',
            request: {
                type: 'GET',
                url: `http://localhost:4000/api/leaders/${leaderId}`,
            },
        }))
        .catch(error => handerError(error, res))
})



module.exports = router
