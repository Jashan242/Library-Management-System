const jwt = require('jsonwebtoken');
const User=require('../models/user')
exports.verifyToken = async (req, res, next) => {
    try {
        const cookieToken = req.cookies.token ?? "";
        const headerToken = req.headers.authorization?.split(" ")[1] ?? "";
        const token = cookieToken || headerToken;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized access",
                error: true,
                status: "failed",
            });
        } else {
            // Verify the token
            const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(tokenDecode);

            if (tokenDecode.id) {
                
                req.user = {
                    id: tokenDecode.id,
                    email: tokenDecode.email,
                    role: tokenDecode.role,
                };
                console.log("auth:", req.user);
                return next(); 
            } else {
                return res.status(401).json({
                    message: "Unauthorized access, invalid token",
                    error: true,
                    status: "failed",
                });
            }
        }
    } catch (err) {

        console.log(err);
        return res.status(401).json({
            message: "Authentication failed",
            error: true,
            status: "failed",
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin rights required.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// module.exports = { verifyToken, isAdmin };