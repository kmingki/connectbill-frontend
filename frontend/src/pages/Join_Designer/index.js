import React, { useState } from "react";
import Form from "react-bootstrap/Form"; 
import Button from "react-bootstrap/Button";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import MainMenu from "../../components/MainMenu";
import Background from "../../components/Background";
import {Dropdown, DropdownButton} from 'react-bootstrap';
import './index.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function JoinDesignerPage() {
    const [userInfo, setUserInfo] = useState({
        "username" :  "",
        "password" :  "",
        "password2" : "",
        "email" : "",
        "phone": "",
        "skills" :  "",
        "description" : "",
        "is_client": false
        });
    const navigate = useNavigate();

    const onClickSubmit = async (e) => {
        e.preventDefault();
        console.log(userInfo);
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = token;
        axios.post('http://localhost:8000/api/auth/register_designer', userInfo, {headers: { "Content-Type": `application/json`}})
        .then((res) => {
            navigate("/",  { replace: true });
        })
        .catch((error) => {
            console.error(error.response);
        });
        
        navigate('/login');
    }

    const onChangeId = (e) => {
        setUserInfo({...userInfo, username: e.target.value});
    }

    const onChangePassword = (e) => {
        setUserInfo({...userInfo, password : e.target.value});
    }

    const onChangePasswordCheck = (e) => {
        setUserInfo({...userInfo, password2 : e.target.value});
    }

    const onChangeEmail = (e) => {
        setUserInfo({...userInfo, email : e.target.value});
    }
    const onChangePhone = (e) => {
        setUserInfo({...userInfo, phone: e.target.value});
    }

    const onChangeSkill = (e) => {
        setUserInfo({...userInfo, skills: e.target.value});
    }

    const onChangeDescription = (e) => {
        setUserInfo({...userInfo, description: e.target.value});
    }

    return (
        <>
        <MainMenu/>
        <Background/>

        <div style={{marginLeft:'35%', marginTop:'50px'}}>
            <Container className="panel" style={{width:'500px', position:'absolute', backgroundColor:'white', borderStyle:'solid', borderWidth:3, borderColor:'antiquewhite', borderRadius:10}}>
                <div style={{marginTop:'15px', fontSize:'25px', fontWeight: 'bold', textAlign:'center'}}>디자이너 회원가입</div>
                <Form style={{marginLeft:'40px'}}>
                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'20px', fontWeight:'bold'}}>아이디</div>
                        <Col sm>
                            <input type="text" placeholder="UserID" style={{width:'90%'}} value={userInfo.username} onChange={onChangeId}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>비밀번호</div>
                        <Col sm>
                            <input type="password" placeholder="Password" style={{width:'90%'}} value={userInfo.password} onChange={onChangePassword}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>비밀번호 확인</div>   
                        <Col sm>
                            <input type="password" placeholder="PasswordCheck" style={{width:'90%'}} value={userInfo.password2} onChange={onChangePasswordCheck}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>이메일</div> 
                        <Col sm>
                            <input type="email" placeholder="Email Address" style={{width:'90%'}} value={userInfo.email} onChange={onChangeEmail}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>phone</div> 
                        <Col sm>
                            <input type="email" placeholder="Phone" style={{width:'90%'}} value={userInfo.phone} onChange={onChangePhone}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>skill</div> 
                        <Col sm>
                            <input type="email" placeholder="Skill" style={{width:'90%'}} value={userInfo.skill} onChange={onChangeSkill}/>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
                        <div style={{fontSize:'15px', marginTop:'10px', fontWeight:'bold'}}>자기소개</div> 
                        <Col sm>
                            <input type="email" placeholder="Description" style={{width:'90%'}} value={userInfo.description} onChange={onChangeDescription}/>
                        </Col>
                    </Form.Group>
                    <Button className="join" onClick={onClickSubmit} style={{marginTop:'20px', marginBottom:'10px'}} >
                        회원가입
                    </Button>
                </Form>
            
            </Container>
        </div>
        </>
    );



}

export default JoinDesignerPage;