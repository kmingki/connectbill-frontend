import axios from 'axios';

export const instance = axios.create({
    baseURL: "https://connectbill.herokuapp.com",
    withCredentials: true,
});