import {TOKEN_TIME,TOKEN_TIME_VALUE} from './constant'

// 登陆时设置时间
export function setTokenTime() {
    localStorage.setItem(TOKEN_TIME, Date.now());
}

// 获取token时间
export function getTokenTime() {
    return localStorage.getItem(TOKEN_TIME);
}

// 判断token是否过期
export function isTokenExpired() {
    let tokenTime = getTokenTime();
    let currentTime = Date.now();
    return currentTime - tokenTime > TOKEN_TIME_VALUE;
}