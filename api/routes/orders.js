const express = require('express')
const router = express.Router()

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        isGotten: true,
    })
})

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        isDeleted: true,
    })
})

router.post('/:orderId', (req, res, next) => {
    res.status(201).json({
        isCreated: true,
    })
})

module.exports = router