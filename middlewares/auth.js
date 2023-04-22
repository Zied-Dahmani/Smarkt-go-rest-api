import jwt from "jsonwebtoken";
import User from "../models/user.js";

// check json web token exists & is verified
const requireAuth = (req, res, next) => {
    //TODO: CHANGE FROM COOKIE TO HEADER WHEN MOVING TO FLUTTER
    //const token = req.cookies.jwt;
    const token = req.headers['jwt']
    if (token) {
        jwt.verify(token, 'jwt', async (err, decodedToken) => {
            if (err) {
                console.log(err)
                res.status(400).send({"message": err.message});
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                req.user = user;
                next();
            }
        });
    } else {
        res.status(400).send({"message": "not authorized"});
    }
};

export const validateJWT = async (token = "") => {
    try {
        const {id: uid} = jwt.verify(token, 'jwt');
        const user = await User.findById(uid);
        return [true, uid, user.username,user.grade];
    } catch (error) {
        return [false, null];
    }
};

export {requireAuth};