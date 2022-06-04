import React, { useState, useEffect} from 'react';
import MainMenu from '../../components/MainMenu';
import { List, Avatar, Dropdown, Button, Menu } from 'antd';
import {  HeartTwoTone, DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { Link } from 'react-router-dom';
import { getPortfolios } from '../../apis/portfolio';
import PortfolioCard from 'components/PortfolioCard';

const dummy = [{
    profile_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    username:"김커넥",
    skills:"실내 인테리어",
    description: "실내인테리어 김커넥 입니다.",
    projects: [{title:"감성카페 실내인테리어 프로젝트",average_stars:3 },{title:"감성카페 실내인테리어 프로젝트",average_stars:3 },{title:"감성카페 실내인테리어 프로젝트",average_stars:3 }]
},
{
    profile_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    username:"김커넥",
    skills:"실내 인테리어",
    description: "실내인테리어 김커넥 입니다.",
    projects: [{title:"감성카페 실내인테리어 프로젝트",average_stars:3 },{title:"감성카페 실내인테리어 프로젝트",average_stars:3 },{title:"감성카페 실내인테리어 프로젝트",average_stars:3 }]
},
{
    profile_image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp=CAU",
    username:"김커넥",
    skills:"실내 인테리어",
    description: "실내인테리어 김커넥 입니다.",
    projects: [{title:"감성카페 실내인테리어 프로젝트",average_stars:3 },{title:"감성카페 실내인테리어 프로젝트",average_stars:3 },{title:"감성카페 실내인테리어 프로젝트",average_stars:3 }]
}
]
const menu = (
    <Menu>
      <Menu.Item>
          식당/카페
      </Menu.Item>
      <Menu.Item>
          식품/건강
      </Menu.Item>
      <Menu.Item>
          병원
      </Menu.Item>
    </Menu>
  );


const DesignerPage = () => {
    const [ portfolios, setPortfolios ] = useState([]);


    useEffect(() => {

        
        const getPortfoliosList = async () => {
            const result = await getPortfolios();
            console.log('portfolio list');
            console.log(result);
            setPortfolios(result);
        }
        
        getPortfoliosList();
        /*
        setPortfolios([...portfolios,
            {
            "username":"김커넥",
            "profile_image":'url',
            "skills":"Front end Developer",
            "description":"description.....description.....description.....description.....description.....description.....description.....description.....description.....description.....description.....description.....description.....description.....description.....",
            "projects": [{'title':'title','average_stars': 3},{'title':'title','average_stars': 3}]
           }
        ]);
        */
    }, []);



    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <div className={'mainTitle'} style={{fontSize: '32px', padding:'50px 0',fontWeight:'500', fontFamily: 'Noto Sans KR, sans-serif'}}>
                어떤 디자이너를 찾고 계신가요?
            </div>

            <div style={{margin: '40px 0', width:'100%', position: 'relative'}}>
                <div>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon={<DownOutlined />} style={{marginRight: '10px'}}>업종</Button>
                </Dropdown>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon={<DownOutlined />} >스타일</Button>
                </Dropdown>
                </div>
                
                <div style={{position: 'absolute', right:'0', top: '0'}}>
                <Link to="/portfolio/new"> 
                        <Button style={{color:'black', marginRight:'15px'}}> 포트폴리오 등록하기 </Button>
                </Link>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon={<DownOutlined />} >최신순</Button>
                </Dropdown>
                </div>
            </div>
            
            {portfolios.map((portfolio,index)=>
            (<PortfolioCard key={index} portfolio={portfolio}/>))}
        </div>
        
        </>
    );
}

export default DesignerPage;
