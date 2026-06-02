const moongoose = require('mongoose');

const userSchema = new moongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required' ]
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],        
        unique: true
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ]  
    },
    phone: {
        type: String,
        required: [ true, 'Phone number is required' ]  
    },
    address: {
        type: Array,
    },
    usertype: {
        type: String,
        required: [ true, 'User type is required' ],
        default: 'Client',
        enum: ['Admin', 'Client'],
    },
    profile: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'   },     
}, { timestamps: true });

const User = moongoose.model('User', userSchema);

module.exports = User;  