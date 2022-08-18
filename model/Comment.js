const mongoose = require("mongoose");


const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        maxlength: [300, "You exceeded the number of characters"]
    },
    dream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dream",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    firstName: {
        type: String,
        ref: "User"
    },
    lastName: {
        type: String,
        ref: "User"
    }
},
{
    timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;