import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import { Card, Avatar, Dropdown, Button, Menu, List, Space, Rate } from 'antd';
import {  HeartTwoTone, DownOutlined, MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import axios from 'axios';
import { Link } from "react-router-dom";
import { SERVER_BASE_URL } from '../../utils/constants.js';
import defaultProfileImage from '../../assets/user_default_image.png';

const menu = (
    <Menu>
      <Menu.Item>
          식당/카페
      </Menu.Item>
      <Menu.Item>
          식품/건강
      </Menu.Item>
      <Menu.Item>
          뷰티/패션
      </Menu.Item>
      <Menu.Item>
          교육/육아
      </Menu.Item>
      <Menu.Item>
          반려동물
      </Menu.Item>
      <Menu.Item>
          병원
      </Menu.Item>
    </Menu>
  );
  const menu_style = (
    <Menu>
      <Menu.Item>
          외부 디자인
      </Menu.Item>
      <Menu.Item>
          내부 디자인
      </Menu.Item>
    </Menu>
  );
  const menu_date = (
    <Menu>
      <Menu.Item>
          최신순
      </Menu.Item>
      <Menu.Item>
          인기순
      </Menu.Item>
    </Menu>
  );


const dummy=[{
    'designer_username': 'name',
    'designer_profile_image':'',
    'small_image':'',
    'client_username':'username', 
    'client_profile_image':'',
    'client_company_name':'soongsil',
    'brief_title':'title',
    'score': 3, 
    'brief_description':'brief description',
    'id': 5
}];
const ClientReviewPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(()=>{
        
        axios.get(`${SERVER_BASE_URL}/api/review/review_view/`)
        .then((res) => {
            console.log(res.data);
            setReviews(res.data);
        })
        .catch((error) => {
            console.error(error.response);
        });
        
        //setReviews(dummy);

    }, []);
    
    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
            <div className={'mainTitle'} style={{fontSize: '32px', fontWeight: 'bold', padding:'50px 0'}}>
                실제 고객 후기를 만나보세요!
            </div>

            <div style={{margin: '10px 0', width:'100%', position: 'relative'}}>
                <div>
                <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon={<DownOutlined />} style={{marginRight: '10px'}}>업종</Button>
                </Dropdown>
                <Dropdown overlay={menu_style} placement="bottomLeft">
                    <Button icon={<DownOutlined />} >스타일</Button>
                </Dropdown>
                </div>
                <div style={{position: 'absolute', right:'0', top: '0'}}>
                <Dropdown overlay={menu_date} placement="bottomLeft">
                    <Button icon={<DownOutlined />} >최신순</Button>
                </Dropdown>
                </div>
            </div>

            <List
                itemLayout="vertical"
                size="large"
                dataSource={reviews}
              
                renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[
                    ]}
                    extra={
                    <img
                        width={272}
                        alt="logo"
                        src={`${SERVER_BASE_URL}${item.small_image}`}
                    />
                    }
                >
                    <List.Item.Meta
                    title={<Link to={`/review/${item.id}`}>{item.brief_title}</Link>}
                    description={<><Rate disabled defaultValue={item.score} /><div style={{marginTop:'10px'}}>{item.brief_description}</div></>}
                    />
                    <div style={{marginBottom:'10px'}}>
                        {item.client_profile_image?  
                        <Avatar src={`${SERVER_BASE_URL}${item.client_profile_image}`} style={{marginRight:'10px'}}/>:
                         <Avatar src={defaultProfileImage} style={{marginRight:'10px'}}/>}
                       {item.designer_username} 님의 작품
                    </div>
                    <div>
                        {
                            item.designer_profile_image ? 
                            <Avatar src={`${SERVER_BASE_URL}${item.designer_profile_image}`} style={{marginRight:'10px'}}/> :
                            <Avatar src={defaultProfileImage} style={{marginRight:'10px'}}/>
                        }
                        {item.client_username}({item.client_company_name}) 님의 의뢰
                    </div>
                    
                </List.Item>
                )}
            />
        </div>
        
        </>
    );
}

export default ClientReviewPage;