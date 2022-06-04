/** @jsxImportSource @emotion/react */
import React, {useEffect, useState} from 'react';
import { Container,Title, ContentContainer, RequestContainer, Content,LeftContent, 
    DescriptionContainer, UserInfo, BudgetWrapper,PanoramaWrapper } from './style';
import Avatar from 'components/Avatar';
import MainMenu from 'components/MainMenu';
import {Button, Badge, Modal, Input} from 'antd';
import { HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import { getRequest, patchApplyDesigner } from '../../apis/request';
import { useParams } from 'react-router-dom';
import { useInput } from '../../utils/useInput.js';
import { SERVER_BASE_URL } from '../../utils/constants.js';

const dummy = {
    'id' : 2,
    'title': '제목',//
    'current_status': 0, //2는 진행중 3은 종료 //
    'finish_date':5,//
    'deadline': '2022-06-25',//
    'budget':1000,//
    'description':'description',//
    'commission_image':'', //
    'client_username':'client user name',//
    'client_company_name':'client company name',//
    'client_profile_image':'client profile image', //
};


const RequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(false);
    const [isClient, setIsClient] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [message, onChangeMessage] = useInput('');

    useEffect(()=>{
        const isClient = localStorage.getItem('isClient');
        setIsClient(isClient);
    }, []);

    useEffect(()=> {
        
        const loadRequest = async () => {
            const data = await getRequest(id); //
            console.log('request data');
            console.log(data);
            setRequest(data);
        };

        loadRequest();
       //setRequest(dummy);
    }, []);

    const handleOk = () => {
        const patchDesigner = async () => {
            await patchApplyDesigner({commission_id: id, msg: message});
        }
        // 
        patchDesigner();
        alert('정상적으로 지원되었습니다!');
        setIsModalVisible(false);
    }
    return (
        <>
        <MainMenu />
        <Container>
        
        <Title>
        {
            (request?.commission?.current_status === 0 || request?.commission?.current_status === 1 ) && 
            <Badge
            status="success"
            text={'모집중'}
            />
        }
        {
            request?.commission?.current_status === 2 && 
            <Badge
            status="processing"
            text={'진행중'}
            />
        }
        {
            request?.commission?.current_status === 3 && 
            <Badge
            status="default"
            text={'프로젝트 완료'}
            />
        }
        <h1>{request?.commission?.title}</h1>
        <div>현재 {request.request_count}명의 디자이너 지원중!</div>
        </Title>
        <ContentContainer>
            
            <RequestContainer>
            <Content>
                {
                    request?.commission?.commission_image && 
                    <PanoramaWrapper>
                        <a-scene class="aframebox" embedded>
                        <a-sky src={`${SERVER_BASE_URL}${request?.commission?.commission_image}`}
                        rotation="0 -130 0" >
                        </a-sky>
                        </a-scene>
                    </PanoramaWrapper>
                }
            
            </Content>
            
            <Content>
                {
                    request?.commission?.description
                }
            </Content>
            </RequestContainer>

            <LeftContent>
            <UserInfo>
                
                <div style={{margin: "10px auto", fontSize: '15px', display:'flex', flexDirection: 'column',
                justifyContent:'center', alignItems:'center'}}>
                <Avatar src={`${SERVER_BASE_URL}${request?.commission?.client_profile_image}`}></Avatar>
                <div>{request?.commission?.client_username}</div>
                <div>{request?.commission?.client_company_name}</div>
                </div>

                <div style={{display:'flex', alignItems:'center'}}>
                    <div style={{fontSize: '15px'}}>최대 예산</div>
                    <BudgetWrapper>{request?.commission?.budget}만원</BudgetWrapper>
                </div>
            </UserInfo>
            <DescriptionContainer>
                <Content>
                    <h3>프로젝트 작업 마감 일자</h3>
                    <div>{request?.commission?.deadline}</div>
                </Content>
                <Content>
                    <h3>작업 기한</h3>
                    <div>마감일로 부터 {request?.commission?.finish_date} 개월</div>
                    
                </Content>
                {isClient ==='false' && (request?.commission?.current_status === 0 || request?.commission?.current_status === 1) &&
                <Button onClick={()=>setIsModalVisible(true)} style={{marginTop:'10px', marginBottom:'10px'}}>지원하기</Button>}
            </DescriptionContainer>
            
            </LeftContent>
        </ContentContainer>
        
        </Container>
        <Modal title="Basic Modal" visible={isModalVisible} okText={"메세지 보내기"} onOk={handleOk} 
        onCancel={()=>setIsModalVisible(false)}>
        <Input placeholder="메세지를 입력해주세요!" value={message} onChange={onChangeMessage}/>
      </Modal>
        </>
    );
}

export default RequestDetail;