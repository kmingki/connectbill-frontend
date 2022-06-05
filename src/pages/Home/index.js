import React, { useEffect, useState } from 'react';
import MainMenu from '../../components/MainMenu';
import Banner from '../../components/Banner';
import Footer from '../../components/Footer';
import { Card, Avatar, Rate, List } from 'antd';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import { getRequestsMain} from '../../apis/request';
import { useNavigate } from 'react-router-dom';
import { SERVER_BASE_URL } from '../../utils/constants.js';

const HomePage = () => {
    const [portfolios, setPortfolios] = useState([]);
    const [requests , setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        const loadRequests = async () => {
            const result = await getRequestsMain();
            console.log(result);
            setPortfolios(result.designer);
            setRequests(result.reviews);
            
        };

        loadRequests();
        console.log(portfolios);
        console.log(requests);
    }, []);

    const onClickPortfolio = (id) => {
        navigate(`/portfolio/${id}`);
    };
    
    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <Banner/>
            <div className={'designer-container'} style={{width: '100%', marginTop:'70px', fontSize:'20px',fontWeight:'500', fontFamily: 'Noto Sans KR, sans-serif'}}> 
                <div style={{display: 'flex', justifyContent: "space-between"}}>
                <div>디자이너의 포트폴리오를 둘러보세요</div>
                <button onClick={()=>navigate('/sda')}style={{cursor: 'pointer',border: 0, outline:0,width:'70px',fontSize:'12px', backgroundColor:'#F5D5CB',appearance: "none", borderRadius:'5px', }}>더보기+</button>    
                </div>
                <div className='portfolio-container'>
                <ul style={{display:'flex', flexWrap: "wrap", listStyle:"none", paddingLeft: '0px'}}>
                {portfolios.map((portfolio, index)=>{
                    return (
                        <li>
                        <div key={index} popol-id={portfolio.id} onClick={()=>onClickPortfolio(portfolio.id)}>
                            <Card
                            style={{width: '300px', margin:'15px'}}
                            hoverable
                            cover={<img width={'300px'} height ={'300px'} style={{objectFit: 'cover'}} alt="example" src={`${SERVER_BASE_URL}${portfolio.profile_image}`} />}>
                            <Card.Meta 
                            title={<div style={{position: 'relative', top:'2px'}}>{portfolio.username} 님</div>}
                            description={<Rate defaultValue={portfolio.average_stars} disabled/>}
                            />
                            </Card>
                        </div>
                        </li>
                    );
                })}
                </ul>
                </div>
            </div>

            <div className={'client-container'} style={{width:'100%', marginTop:'50px', fontSize:'20px', fontWeight:'500',fontFamily: 'Noto Sans KR, sans-serif'}}> 
                <div style={{display: 'flex',justifyContent: "space-between"}}>
                    <div>고객 후기를 둘러보세요</div>
                    <button onClick={()=>navigate('/reviews')}style={{cursor: 'pointer',border: 0, outline:0,width:'70px',fontSize:'12px', backgroundColor:'#F5D5CB',appearance: "none", borderRadius:'5px', }}>더보기+</button> 
                </div>
                <ul style={{display:'flex', flexWrap: "wrap", listStyle:"none", paddingLeft: '0px'}}>
                
                    {requests.map((request)=>
                    <li>
                    <Card
                    style={{width: '300px',margin:'15px'}}
                    hoverable
                    cover={<img width={'300px'} height ={'300px'} style={{objectFit: 'cover'}}alt="example" src={`${SERVER_BASE_URL}${request.small_image}`} />}
                    >
                    <Card.Meta 
                    aavatar={<Avatar src={`${SERVER_BASE_URL}${request.userProfileImage}`} />} 
                    title={<div style={{position: 'relative', top:'2px'}}>{request.username}({request.companyName})</div>}
                    description={<><Rate defaultValue={request.score} disabled/></>} /> 
                </Card>
                </li>
                        )}
                </ul>
                
            </div>
        </div>
        <Footer />
        </>
    );
}

export default HomePage;
/*
”small_image” : ,//
”profile_image”: ,//
”title” : ,//
”company_name” : ,
”username” : ,//
”avarage_score” : 
*/

                