import axios from 'axios';

export const instance = axios.create({
    baseURL: "https://connectbillssu2022.herokuapp.com",
    withCredentials: true,
});