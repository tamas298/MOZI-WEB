const mongoose = require("mongoose")
const Schema = mongoose.Schema

const felhasználóSchema = new Schema({
    vezetéknév: {type: String, required: true},
    keresztnév: {type: String, required: true},
    fizetés_módja: {type: String, required: true},
    bankszámlaszám: {type: String, required: true},
    email: {type: String, required: true},
    születésnap: {type: String, required: true},
    jelszó: {type: String, required: true},
    telefonszám: {type: Number, required: true},
    értékelés: {type: Number, required: true},
}, { timestamps: true})

module.exports = mongoose.model("felhasználó", felhasználóSchema, "felhasználók")