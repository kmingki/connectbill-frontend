
import {instance} from '../utils' 

const postRequest = async (data) => {

    const token = localStorage.getItem('token');
    try {
        const res = await instance.post('/api/client_commission/create_commission', data, {headers: { "Content-Type": 'multipart/form-data',
        Authorization : "Token " + token}}); //json???
        return res.data;

    } catch (error) {
        console.error(error);
        //alert(error.response.data);
    }
}

const getRequest = async (data) => {
    try {
        const res = await instance.get(`/api/client_commission/${data}/commission_view_detail` );
        console.log(`/api/client_commission/${data}/commission_view_detail`)
        return res.data;

    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}
const getRequests = async () =>{
    try {
        const res = await instance.get('/api/client_commission/commission_view');
        return res.data;

    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}


const getRequestsMain = async () =>{
    try {
        const res = await instance.get('');
        return res.data;

    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}

const patchSelectDesigner = async (data) => {
    const token = localStorage.getItem('token');
    try {
        const res = await instance.post('/api/mypage/designer_selected_for_commission', data, //{designer_id :designerId, commission_id : itemId}
        {headers: { Authorization : "Token " + token}});
        return res.data;
    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}

const patchApplyDesigner = async (data) => { //디자이너가 의뢰서를 지원할때 {commission_id: id, msg: message}
    const token = localStorage.getItem('token');
    try {
        const res = await instance.post(`/api/client_commission/${data.commission_id}/commission_select_for_designer`, {message: data.msg}, //{designer_id: designerId, request_id: id}
        {headers: { Authorization : "Token " + token}});
        return res.data;
        
    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}

const patchEndCommission = async (id) => { //디자이너가 의뢰서를 지원할때 {commission_id: id, msg: message}

    const token = localStorage.getItem('token');
    try {
        
        console.log(id)
        const res = await instance.post(`/api/client_commission/${id}/end_commission`);
        
        return res.data;
        
    } catch (error) {
        console.log(error);
        alert(error.response.data);
    }
}

export { postRequest, getRequest, getRequests, getRequestsMain, patchSelectDesigner, patchApplyDesigner, patchEndCommission };