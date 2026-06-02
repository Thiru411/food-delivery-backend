const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
     await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`.bgBlack.white);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

module.exports = connectDB; 