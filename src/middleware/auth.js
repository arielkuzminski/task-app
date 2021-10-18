import jwt from 'jsonwebtoken';
import { User } from "./../models/user.js";


const auth = async (req, res, next) => {
    try {
        const bearerToken = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(bearerToken, 'thisismynewcourse');
        const user = await User.findOne({ _id: decoded._id, "tokens.token": bearerToken });
        if (!user) {
            throw new Error();
        }
        req.token = bearerToken;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Wrong authentication' });
    };
};

export { auth };