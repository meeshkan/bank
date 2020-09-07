// https://github.com/vercel/next.js/blob/master/examples/api-routes-apollo-server-and-client-auth/lib/auth-cookies.js

import { serialize, parse } from 'cookie';

const TOKEN_NAME = 'token';
const EIGHT_HOURS_IN_SECONDS = 60 * 60 * 8;
export const MAX_AGE = EIGHT_HOURS_IN_SECONDS;

export const setTokenCookie = (response, token) => {
    const cookie = serialize(TOKEN_NAME, token, {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    });

    response.setHeader('Set-Cookie', cookie);
};

export const removeTokenCookie = response => {
    const cookie = serialize(TOKEN_NAME, '', {
        maxAge: -1,
        path: '/',
    });

    response.setHeader('Set-Cookie', cookie);
};

export const parseCookies = request => {
    if (request.cookies) {
        return request.cookies;
    }

    const cookie = request.headers?.cookie;
    return parse(cookie || '');
};

export const getTokenCookie = request => {
    const cookies = parseCookies(request);
    return cookies[TOKEN_NAME];
};
