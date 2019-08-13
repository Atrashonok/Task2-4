const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

var userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'Full name can not be empty'
    },
    email: {
        type: String,
        required: 'Email can not be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password  can not be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    saltSecret: String
})

//Custom validation for email
userSchema.path('email'). validate((val) => {
    emailRegex  = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/
    return emailRegex.test(val)
}, 'Invalid e-mail.')

//Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash
            this.saltSecret = salt
            next()
        })
    })
})

mongoose.model('User', userSchema)
