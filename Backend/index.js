const express = require("express");
const server = express();
const port = process.env.PORT || 3030;
const db_name = process.env.MONGO_DB || "library";
const connnectDB = require("./connection/connect");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// Import routes
const bookRoutes = require('./router/bookRoutes');
const membershipRoutes = require('./router/membershipRoutes');
const transactionRoutes = require('./router/transactionRoutes');
const userRoutes = require('./router/userRoute');

// Connect to database
connnectDB(db_name);

// Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// CORS configuration
server.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Routes
server.use('/books', bookRoutes);
server.use('/membership', membershipRoutes);
server.use('/transactions', transactionRoutes);
server.use('/user', userRoutes);

// Error handling middleware
server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
