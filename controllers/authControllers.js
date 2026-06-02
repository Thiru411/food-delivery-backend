const User = require("../models/userModel");
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const registerController = async(req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Basic validation
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ 
                success: false,
                message: 'Please provide all required fields' });
        }


        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ 
                success: false,
                message: 'User already exists' });
        }

        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User({ name, email, password: hashedPassword, phone, address });  
        newUser.save();          
        res.status(201).send({ 
            success: true,
            message: 'User registered successfully',
             newUser, // In a real application, you would not return the password or sensitive information
        });     
        // Hash the password and save the user to the database here (omitted for brevity)       
    } catch (error) {
       console.log(error)
       res.status(500).send({
        success: false,
        message: 'Internal Server Error',
        error
     });
    }   
};



// Login controller (to be implemented)

const loginController = async(req, res) => {
    try {

        const { email, password } = req.body;


        if( !email || !password ) { 
            return res.status(500).json({ 
                success: false,
                message: 'Please provide email and password' 
            });
        } 

        const user = await User.findOne({ email }); // In a real application, you would find the user by email and then compare the hashed password

        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        // In a real application, you would compare the hashed password here (omitted for brevity)
        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid email or password' 
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        user.password = undefined; // Hide the password in the response
        res.status(200).send({ 
            success: true,
            message: 'Login successful',
            token,
            user,
            
         });
    } catch (error) {
        console.error('Error in loginController:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }   
};      


 module.exports = { registerController, loginController };
