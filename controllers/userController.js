const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.userId }); 
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }
         user.password = undefined; // Hide the password in the response
        res.status(200).send({ 
            success: true,  
            message: 'User retrieved successfully',
            user 
         });
        
    } catch (error) {
        console.error('Error in getUserController:', error);
         res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
         });
    }   
 }



 /// Update user controller (to be implemented)

const updateUserController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.userId }); 
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }
    const { name, email, phone, address } = req.body;

    // Update user fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();

    res.status(200).send({ 
        success: true,  
        message: 'User updated successfully',
        // user 
     });    

        // Implementation for updating user details will go here
    } catch (error) {
        console.error('Error in updateUserController:', error);
         res.status(500).send({
            success: false,
            message: 'Internal Server Error',
            error
         });   

        }  
     };

     /// Update Password controller (to be implemented)

     const updatePasswordController = async (req, res) => {
        try {
          const userId = req.userId; // Assuming the user ID is attached to the request by the auth middleware
          console.log('User ID from auth middleware:', userId);
            const user = await userModel.findById({ _id: userId }); 
            if (!user) {
                return res.status(404).json({ 
                    success: false,
                    message: 'User not found' 
                });
            }
                console.log('User found:', user);
             const { oldPassword, newPassword } = req.body;

                if (!oldPassword || !newPassword) { 
                    return res.status(400).json({ 
                        success: false,
                        message: 'Please provide both old and new passwords' 
                    });
                }

                const isMatch = await bcrypt.compare(oldPassword, user.password);       
                if (!isMatch) {
                    return res.status(400).json({ 
                        success: false,
                        message: 'Old password is incorrect' 
                    });
                }       
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(newPassword, salt);
                user.password = hashedPassword;
                await user.save();  


            
            res.status(200).send({ 
                success: true,  
                message: 'Password updated successfully',
             });        
            
        } catch (error) {
            console.error('Error in updatePasswordController:', error);
             res.status(500).send({
                success: false,
                message: 'Internal Server Error',
                error
             });   
        }
     }

module.exports = { getUserController, updateUserController , updatePasswordController };