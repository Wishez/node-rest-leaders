const mongoose = require('mongoose')

const leaderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorName: { type: String, required: true },
    leaderName: { type: String, required: true },
    leaderImage: { type: String, required: true },
    comment: { type: String, required: true },
    isShown: { type: Boolean, default: true },
})

module.exports = mongoose.model('Leader', leaderSchema)
