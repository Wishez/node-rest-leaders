const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET request to /leaders'
    })
})

router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling POST request to /leaders'
    })
})

router.get('/:leaderId', (req, res, next) => {
    const id = req.params.leaderId;
    
    let message = ''
    if (id === '42') {
        message = 'You discovered main answer. It is 42!'
    } else {
        message = `You passed an ID`
    }

    res.status(200).json({
        message,
        id, 
    })
})

router.post('/:leaderId', (req, res, next) => {
    const id = req.params.leaderId;

    res.status(201).json({
        message: `Leader created with id: ${id}!`
    })
})

module.exports = router