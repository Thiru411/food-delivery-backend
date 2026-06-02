const express = require('express');
const { getUserController } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { updateUserController } = require('../controllers/userController');
const { updatePasswordController } = require('../controllers/userController');



const router = express.Router();

router.get('/getUser',authMiddleware ,getUserController  );        

router.put('/updateUser', authMiddleware, updateUserController); // Placeholder for update user controller);

router.post('/updatePassword' , authMiddleware, updatePasswordController);
module.exports = router;