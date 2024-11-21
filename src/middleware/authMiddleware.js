import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';

export default function authenticateToken(req, res, next) {
    if (req.originalUrl != '/auth/login') {
        const token = req.headers['authorization']?.split(' ')[1];
        // console.log(token);
        
        if (!token) return res.status(401).json({ message: 'Accès refusé' });
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: 'Token invalide' });
            req.user = user;
            next();
        });
    }
    else{
        next()
    }
    // return next()
}