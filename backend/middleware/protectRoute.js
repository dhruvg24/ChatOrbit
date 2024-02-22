import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
const protectRoute = async (req, res, next) => {
  try {
    // we can get token from cookies directly
    const token = req.cookies.jwt;
    if(!token){
        return res.status(401).json({error:"Unauthorized - No token provided"})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if(!decoded){
        return res.status(401).json({error: "Unauthorized - Invalid token"})
    }

    const user = await User.findById(decoded.userId).select("-password")
    // no need of password
    // since during signing we used userId

    if(!user){
        return res.status(404).json({error: "User not found"})
    }

    // now after these checks we will get our user as needed in getting the userId in message
    req.user = user;

    next();

  } catch (error) {
    console.log("Error in protectRoute middleware: ", error.message);
    res.status(500).json({error: "Internal server error"})
  }
};

export default protectRoute;
