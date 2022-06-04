import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from 'react-bootstrap/Container';
import MainMenu from "../../components/MainMenu";
import Background from "../../components/Background";
import { Link } from 'react-router-dom';
import './index.css';
import option from './img/join_option.jpg'



function JoinPage() {
    return (
        <>
        <MainMenu/>
        <Background/>

        <div style={{marginLeft:'35%', marginTop:'50px'}}>
            <Container className="panel" style={{width:'500px', position:'absolute', backgroundColor:'white', height:'550px', borderStyle:'solid', borderWidth:3, borderColor:'antiquewhite', borderRadius:10}}>
                <div style={{marginTop:'15px', fontSize:'25px', fontWeight: 'bold', textAlign:'center'}}>회원 유형 선택</div>
                <div className="join_option" style={{width:'500px', height:'500px'}}>
                    <img className="select" alt="join_option" src={option} style={{width:'450px', height:'450px', marginLeft:'10px', marginTop:'-5px'}} />
                </div>
                <Link to="/Join/Client"> 
                    <Button className="join_cli" type="button">
                            일반고객
                    </Button>
                </Link>
              
                <Link to="/Join/Designer"> 
                    <Button className="join_des" type="button">
                            디자이너
                    </Button>
                </Link>
            </Container>
        </div>
        </>
    );
}

export default JoinPage;