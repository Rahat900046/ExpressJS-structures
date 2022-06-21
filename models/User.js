//Name, Email, Password and Profile

const {
    Schema,
    model
} = require('mongoose')

const Profile=require('./Profile')

const userSchema = newSchema({
    username: {
        type: String,
        trim: true,
        maxlenght: 15,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: Profile
    }
}, {
    timestamps: true
})

const User = model('User', userSchema)
module.exports = User