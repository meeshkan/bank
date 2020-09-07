import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'NOT_SECURE_TOKEN';

export const generateToken = data => jwt.sign(data, TOKEN_SECRET);
export const verifyToken = token => jwt.verify(token, TOKEN_SECRET);
