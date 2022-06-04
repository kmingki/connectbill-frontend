/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import { container,UserInfoForm, SubTitle, userInfoContent, editButtonWrapper, MessageWrapper} from './style';
import Avatar from '../../components/Avatar';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { List, Rate, Button, Tabs, Table, Card } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { useNavigate, useLocation, useParams} from 'react-router-dom';
import userImg from '../../assets/user.png';
import { MailOutlined, PhoneOutlined, HomeOutlined } from '@ant-design/icons';
import { getProfileInfo } from '../../apis/user';
import { Link } from 'react-router-dom';
import { getProject } from 'apis/project';
import { postDeleteMessage } from 'apis/user';
import { SERVER_BASE_URL } from '../../utils/constants.js';

const columns = [
    {
      title: '취득 기간',
      dataIndex: 'acquired_date',
      key: 'acquired_date',
    },
    {
      title: '자격증',
      dataIndex: 'certificate_name',
      key: 'certificate_name',
    },
    {
        title: '기간(개월)',
        dataIndex: 'time',
        key: 'time',
      },
  ];

  const work_columns = [
    {
      title: '근무 기간',
      dataIndex: 'working_period',
      key: 'working_period',
    },
    {//job_position
      title: '회사명',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {//job_position
        title: '직무',
        dataIndex: 'description',
        key: 'description',
      },
  ];


const DesignerProfile = () => {
    const [ messages, setMessages ] = useState([]);
    const [ activeTab, setActiveTab ] = useState("portfolio");
    const [ tableLoading, setTableLoading ] = useState(true);
    const [ userInfo, setUserInfo ] = useState({}); 
    const { id } = useParams();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const navigate = useNavigate();

    useEffect(()=> {
        const loadProfileInfo = async () => {
            const result = await getProfileInfo();
            setUserInfo(result);
            setMessages(result.messages);
            console.log('result');
            console.log(result);
        }
        loadProfileInfo();

    }, []);
    const onClickEditButton = () => {
        navigate('#editprofile');
    };

    const onChangeTab = (key) => { 
        setActiveTab(key);
    }
    
    //프로젝트 클릭하면 이동하는 코드
    const onClickProject = (id) => {
        navigate(`/project/${id}`);
    }

    const onClickDelete= (msgId) => {
        const deleteMessage = async () => {
            await postDeleteMessage({msg_id :msgId});
        }
        deleteMessage();
        // navigate(`/designer/mypage`);
        alert('알림 메세지가 삭제되었습니다!');
        window.location.reload()
    }

    return (
        <>
        <MainMenu />
        <div css={container}>

        <div style={{display:'flex', justifyContent: 'space-evenly', alignItems: 'center'}}>
        <UserInfoForm>
            {userInfo?.user?.profile_image &&
            <Avatar
            src={`${SERVER_BASE_URL}${userInfo?.user?.profile_image}`} />
            }
            <div css={userInfoContent}>
            <h2>{userInfo?.user?.username}님</h2> 
            <Rate disabled defaultValue={userInfo?.user?.average_stars} />
            
            <div><MailOutlined style={{marginRight:'5px'}}/>{userInfo?.user?.email}</div>
            <div><PhoneOutlined style={{marginRight:'5px'}}/>{userInfo?.user?.phone}</div>
            <div>{userInfo?.user?.skills} 전문</div>
            
            <div>{userInfo?.user?.description}</div>
            <Button onClick={onClickEditButton} css={editButtonWrapper}>프로필 수정</Button>
            </div>
            
        </UserInfoForm> 
        
        <div style={{width: '40%', height:'300px', border:'2px solid rgb(251, 240, 213)',
        borderRadius:'10px', backgroundColor:'rgb(251, 240, 213)', textAlign:"center"}}>
            <br></br>
            <span style={{fontSize:'17px', fontWeight:'500', color:'orange'}}>도착한 알림</span>
            <div style={{height: '200px', overflowY:'scroll'}}>
            {
                messages?.map((msg)=>
                    <MessageWrapper onClick={()=>onClickDelete(msg.id)}>
                        {msg.message}  {msg.time}
                    </MessageWrapper>)
            }
            </div>
        </div>
        </div>

        <Tabs defaultActiveKey="1" onChange={onChangeTab}>
            <Tabs.TabPane tab="포트폴리오" key="portfolio">
            
            <div style={{marginBottom: '50px'}}>
            <SubTitle>Description</SubTitle>
            <div>{userInfo?.portfolio?.description}</div>
            </div>

            <SubTitle>자격증</SubTitle>
            {
            <div style={{margin: '30px 0'}}>
            <Table  columns={columns} dataSource={userInfo?.certificates} pagination={false}/>
            </div>}

            <SubTitle>경력 사항</SubTitle>
            {
            <div style={{margin: '30px 0'}}>
            <Table  columns={work_columns} dataSource={userInfo?.educationandcareers} pagination={false}/>
            </div>}

            <SubTitle>프로젝트</SubTitle>
            <Link to="/CreateProject2">
                <Button style={{position:'absolute', marginLeft:'960px', marginTop:'-40px'}}>외부 프로젝트 추가</Button>
            </Link>
            <ul style={{display:'flex', flexWrap: 'wrap', listStyle:"none", paddingLeft: '0px'}}>
            {
                userInfo?.projects&& 
                userInfo.projects.map(project=>
                    <li style={{margin: '20px'}}>
                <Card
                    hoverable
                    style={{
                      width: 240,
                      
                    }}
                    cover={<img width='240px' height='240px' alt="example" src={`${SERVER_BASE_URL}${project.small_image}`} />}
                    //프로젝트 관련 추가한 코드
                    onClick={()=>onClickProject(project.id)}
                  >
                    <Card.Meta title={project.title} 
                    description={<>
                    <div>{project.participation_date}</div>
                    <div>{project.client}</div>
                    <div><Rate disabled defaultValue={project.score} /></div></>} />
                  </Card></li>)
            }
            </ul>
            </Tabs.TabPane>
            <Tabs.TabPane tab="진행중인 의뢰" key="part_in_commission">
                <List
                itemLayout="vertical"
                size="large"
                dataSource={userInfo.part_in_commission}
                renderItem={item => (
                    <List.Item
                    key={item.title}
                    actions={[
                        <div>{item.budget} 만원</div>,
                        <div>작업기간  {item.updated}개월</div>,
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
                    title={item.title/*<Link to={`/portfolio/${item.id}`}>{item.title}</Link>*/}
                />
                <div>{item.client_username}</div> 
                <div>{item.client_company_name}</div>
                <div>{item.client_phone}</div>
                </List.Item>
                )}
            />  
            </Tabs.TabPane>
            <Tabs.TabPane tab="종료된 의뢰" key="end_commission">
            <List
                itemLayout="vertical"
                size="large"
                dataSource={userInfo.end_commission}
                renderItem={item => (
                    <List.Item
                    key={item.title}
                    actions={[
                        <div>{item.budget} 만원</div>,
                        <div>작업기간  {item.updated}개월</div>,
                    ]}
                    extra={
                        <img
                                width={202}
                                height={200}
                                alt="logo"
                                src={`${SERVER_BASE_URL}${item.small_image}`}
                            />
                    }
                >
                <List.Item.Meta
                    title={item.title/*<Link to={`/portfolio/${item.id}`}>{item.title}</Link>*/}
                />
                <div>{item.client_username}</div> 
                <div>{item.client_company_name}</div>
                <div>{item.client_phone}</div>
                </List.Item>
                )}
            />
            </Tabs.TabPane>
        </Tabs>
        </div>
        </>
    );
};

export default DesignerProfile;