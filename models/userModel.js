const mongoose = require("mongoose")

// Define schema for a user Document
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name here"]
    },
    email: {
        type: String, 
        required: [true,  "Please enter your email here"],
        unique: true
    },
    password: {
        type: String,
        required: [true,  "Please enter your password here"]
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
},
{
    timestamps: true
}
)

// Create a model based on the schema
const User = mongoose.model("User", userSchema)

module.exports = User