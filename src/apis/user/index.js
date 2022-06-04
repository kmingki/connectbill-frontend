
import {instance} from '../utils' 

const login = async (data) =>{
    try {
        const res = await instance.post('/api/auth/login', data, {headers: { "Content-Type": `application/json`}});
        return res.data;

    } catch (error) {
        console.log(error);
        window.alert(error.response.data);
    }
}

const logout = async () =>{
    try {
        const token = localStorage.getItem('token');
        await instance.post('/api/auth/logout', {
            headers: { 
                "Content-Type": `application/json`,
                Authorization : "Token" + token,
            }});
        

    } catch (error) {
        console.log(error);
        window.alert(error.response.data);
    }
}

const loadMyInfo = async () => {
    try {
        const token = localStorage.getItem('token');
        const result = await instance.get('/api/mypage/getMyInfo', {
            headers: { 
                "Content-Type": `application/json`,
                Authorization : "Token " + token,
            }});
        
        return result.data;
    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}

const getProfileInfo = async () => {
    try {
        const token = localStorage.getItem('token');
        const result = await instance.get('/api/mypage', {
            headers: { 
                "Content-Type": `application/json`,
                Authorization : "Token " + token,
            }});
        
        return result.data;
    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}

export const postDeleteMessage = async (data) => { //디자이너가 메세지를 확인했을때 {commission_id: id, msg: message}
    const token = localStorage.getItem('token');
    try {
        const res = await instance.post(`/api/mypage/delete_message`, data,
        {headers: { 
            "Content-Type": `application/json`,
            Authorization : "Token " + token
        }});

        return res.data;
        
    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}
// export const postAllProject = async (data) => {

//     const token = localStorage.getItem('token');
//     try {
//         const res = await instance.post('/api/portfolio/projects/create_project', data, 
//         {headers: { "Content-Type": 'multipart/form-data',
//         Authorization : "Token " + token}}); //json???
//         return res.data;

//     } catch (error) {
//         console.error(error);
//         //alert(error.response.data);
//     }
// }


/*
const loadMyInfo = async () =>{
    try {
        const token = localStorage.getItem('token');
        await instance.get('api/mypage', {
            headers: { 
                "Content-Type": `application/json`,
                Authorization : "Token" + token,
            }});
            
    } catch (error) {
        console.log(error);
        window.alert(error.response.data);
    }
}
*/

export {login, logout, loadMyInfo, getProfileInfo};