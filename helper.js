const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message || 'An unexpected error occurred'
    });

    res.status(400).json({
        success: false,
        message: 'Bad Request',
        error: err.message || 'Invalid request data'
    });
    
     res.status(404).json({
        success: false,
        message: 'Not Found',
        error: err.message || 'The requested resource was not found'
    });

     res.status(401).json({
        success: false,
        message: 'Unauthorized',
        error: err.message || 'Authentication is required to access this resource'
    });

     res.status(403).json({
        success: false,
        message: 'Forbidden',
        error: err.message || 'You do not have permission to access this resource'
    });
};  

module.exports = { errorHandler };  


