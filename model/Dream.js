const mongoose = require("mongoose");


const dreamSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: [3000, "You exceeded the number of characters"]
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: false,
    },
},
{
    timestamps: true
})

const Dream = mongoose.model("Dream", dreamSchema);

module.exports = Dream;