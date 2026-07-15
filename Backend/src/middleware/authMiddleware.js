const jwt = require("jsonwebtoken");

async function authMiddleware(req, res, next) {

    try {

        // Get token from browser cookies
        const token = req.cookies.token;   

        // If token is missing(expired)
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized. Please login."
            });
        }

       

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  

        // Store decoded user information
        req.user = decoded;

        // Move to the next middleware/controller
        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

}

module.exports = authMiddleware;