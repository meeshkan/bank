// https://github.com/vercel/next.js/blob/master/examples/api-routes-apollo-server-and-client-auth/lib/auth.js

import { generateToken, verifyToken } from './token';
import { MAX_AGE, setTokenCookie, getTokenCookie } from './cookies';

export async function setLoginSession(response, session) {
    const createdAt = Date.now();
    const object = { ...session, createdAt, maxAge: MAX_AGE };
    const token = await generateToken(object);

    setTokenCookie(response, token);
}

export async function getLoginSession(request) {
    const token = getTokenCookie(request);

    if (!token) {
        return;
    }

    const session = await verifyToken(token);
    const expiresAt = session.createdAt + session.maxAge * 1000;

    if (Date.now() < expiresAt) {
        return session;
    }
}