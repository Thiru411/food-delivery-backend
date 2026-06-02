const testUserController = (req, res) => {

    try {
          res.status(200).send({ 
            sucess: true,
            message: 'Test user route is working!' 
        });
    } catch (error) {
        console.error('Error in testController:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }   
 }
 
module.exports = { testUserController };