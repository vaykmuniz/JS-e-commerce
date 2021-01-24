import { setCookie } from "./cookies";
import { setLocalStorage } from './localStorage';

export const setAuthenticaetion = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);
};