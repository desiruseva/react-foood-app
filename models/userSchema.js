const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    kcal: {
       type: Number,
        required: true,
        unique: true
    },
    protein: {
       type: Number,
        required: true
    },
    fat: {
        type: Number,
        required: true
    },
    carbs: {
       type: Number,
        required: true
    },

});

const foods = new mongoose.model("foods",userSchema);


module.exports = foods;