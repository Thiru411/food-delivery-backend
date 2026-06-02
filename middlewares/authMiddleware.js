 const Jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        Jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
            if (error) {
                return res.status(401).send({ 
                    success: false,
                    message: 'Invalid token, authorization denied' 
                });
            } else {
                req.userId = decoded.userId;// Attach user ID to request body for downstream use
                next();
            }
        });  // Assuming the token is sent as "Bearer <token>"
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        return res.status(401).send({ 
            success: false,
            message: 'Invalid token, authorization denied' 
        });
    }
};

module.exports = { authMiddleware };