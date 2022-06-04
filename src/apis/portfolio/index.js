
import {instance} from '../utils' 

const getPortfolios = async () => {

    try {
        const result = await instance.get('/api/portfolio/portfolio_view');//
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}


const getPortfolio = async (data) => {

    try {
        const result = await instance.get(`/api/portfolio/${data}/portfolio_view_detail`);
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}


const postPortfolio = async () => {

    const token = localStorage.getItem('token');
    try {
        const result = await instance.get('/api/portfolio/create_portfolio', {
            headers: { 
                "Content-Type": `application/json`,
                Authorization : "Token" + token,
            }});
        return result.data;
    } catch (error) {
        console.error(error);
        window.alert(error.response.data);
    }
}





export { getPortfolios, getPortfolio, postPortfolio };