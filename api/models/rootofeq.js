const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const rootofEQSchema = new mongoose.Schema({
    title: { type: String, required: true },
    fx: { type: String, required: true },
    latex: { type: String, required: true }
}, { collection: 'randomfx' })

rootofEQSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, title: this.title, fx: this.fx, latex: this.latex }, process.env.JWTPRIVATEKEY, { expiresIn: '3m' })
    return token
}

module.exports = mongoose.model('rootofEQSchema', rootofEQSchema)