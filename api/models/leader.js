const mongoose = require('mongoose')

const leaderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorName: String,
    leaderName: String,
    leaderImage: String,
    comment: String,
})

module.exports = mongoose.model('Leader', leaderSchema)