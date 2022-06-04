import {instance} from '../utils' 

//react quill에 이미지 삽입하기 위해 서버에 보내는 코드
export const postProject = async (data) => {

    const token = localStorage.getItem('token');
    try {
        const res = await instance.post('/api/portfolio/projects/image_handler', data, {headers: { "Content-Type": 'multipart/form-data',
        Authorization : "Token " + token}}); //json???
        return res.data;

    } catch (error) {
        console.error(error);
        //alert(error.response.data);
    }
}

//작성완료한 프로젝트 정보를 서버에 보내는 코드
export const postAllProject = async (data) => {

    const token = localStorage.getItem('token');
    try {
        const res = await instance.post('/api/portfolio/projects/create_project', data, {headers: { "Content-Type": 'multipart/form-data',
        Authorization : "Token " + token}}); //json???
        return res.data;

    } catch (error) {
        console.error(error);
        //alert(error.response.data);
    }
}

//서버에 있는 정보를 프론트로 가져오기 위한 코드
export const getProject = async (data) => {

    try { //둘 중에 뭐 사용해야 하는지
        const result = await instance.get(`/api/portfolio/projects/project_view_detail/${data}`);
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}


