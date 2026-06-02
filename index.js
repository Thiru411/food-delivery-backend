const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// dot env configuration
dotenv.config();

// Connect to the database
connectDB();   


// Create an Express application 
const app = express();


// Middleware
app.use(cors());  
app.use(morgan('dev'));
app.use(express.json()); // Parse JSON bodies 



app.use('/api/v1/test', require('./routes/testRoutes')); // Use test routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes')); 
// Use user routes

// Routes
// Define a simple route to test the server
app.get('/', (req, res) => {
    return res.status(200).json({ message: 'Hello World!' });
 // res.send('Hello World!');
});

// Port number can be set via environment variable or defaults to 8080
const PORT = process.env.PORT || 8080 ;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.bgBlack.green);
});       