const mongoose = require("mongoose");

const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: [3, "First name must be more than 3 characters."],
        maxlength: [99, "You exceeded the number of character"]
    },
    lastName: {
        type: String,
        required: true,
        minlength: [3, "Last name must be more than 3 characters."],
        maxlength: [99, "You exceeded the number of character"]
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Your password must have at least 6 characters."]
    },
    myDreams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Dream"
    }],


},
{
    timestamps: true
})

userSchema.methods.verifyPassword = function(password){
    console.log("Plain Text" + password);
    console.log("Ecrypted Password" + this.password);
    return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;