import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        // using userId we are signing
        expiresIn: '15d'
    })
    // token is created, now set in cookie
    res.cookie("jwt", token , {
        maxAge: 15*24*60*60*1000,
        // in msec
        httpOnly: true,
        //preventing the Cross side scripting attacks (XSS)
        sameSite: "strict",
        // preventing cross side request forgery attacks (CSRF)
        secure: process.env.NODE_ENV!=="development"
    })
}

export default generateTokenAndSetCookie;