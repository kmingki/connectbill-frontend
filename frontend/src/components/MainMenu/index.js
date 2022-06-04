import React from 'react';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import userState from '../../store/user';
import { logout } from 'apis/user/index';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
const menuStyle = {
    top: '0',
    padding: '0 10%',
    height: '70px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #dcdcdc',
};

const MainMenu = () => {
    const [user, setUser]  = useRecoilState(userState);
    const navigate = useNavigate();

    const onSearch = () => {

    };

    const onClicklogout = async() => {
        
        await logout();
        localStorage.removeItem('token');
        localStorage.removeItem('isClient');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        
        setUser({
            userId : '',
            isClient : null,
            username : null,
            auth_token : null,
            profileImage : '',
        });
        navigate('/');

    };

    return(
        <div style={menuStyle}>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <div >
                    <Link to="/"> 
                        <img src={logo} height={'70px'}/>
                    </Link>
                </div>
                <div style={{margin: '0 15px', fontSize: '20px', fontWeight: 'bold', cursor:"pointer"}}>
                    <Link to="/sda"> 
                        <Button style={{fontWeight:'500', fontFamily: 'Noto Sans KR, sans-serif', color:'black'}}> 디자이너 </Button>
                    </Link>
                </div>
                <div style={{margin: '0 15px', fontSize: '20px', fontWeight: 'bold', cursor:"pointer"}}>
                    <Link to="/request"> 
                        <Button style={{fontWeight:'500', fontFamily: 'Noto Sans KR, sans-serif', color:'black', marginLeft:'-15px'}}> 의뢰서 </Button>
                    </Link></div>
                </div>
            {/* <Input.Search placeholder="디자이너, 커미션 검색" onSearch={onSearch} style={{width:'30%'}}/> */}
            <div style={{display: 'flex', alignItems: 'center'}}>
                {
                    localStorage.getItem('userId') ? 
                    <div style={{padding: '0 10px'}}>
                        <Button onClick={onClicklogout}> 로그아웃 </Button>
                    </div> :
                    <div style={{padding: '0 10px'}}>
                    <Link to="/login"> 
                        <Button> 로그인 </Button>
                    </Link>
                    </div> 
                }
                {
                    localStorage.getItem('userId') ? 
                    localStorage.getItem('isClient') === 'true' ?
                    <div style={{padding: '0 10px'}}>
                    <Link to={`/client/mypage`}> 
                        <Button> 마이페이지 </Button>
                    </Link>
                </div> :<div style={{padding: '0 10px'}}>
                    <Link to={`/designer/mypage`}> 
                        <Button> 마이페이지 </Button>
                    </Link>
                </div>
                :
                    <div style={{padding: '0 10px'}}>
                    <Link to="/Join"> 
                        <Button> 회원가입 </Button>
                    </Link>
                </div>
                }
                
                {localStorage.getItem('userId') ? localStorage.getItem('isClient') === 'true'? 
                <Link to ="/request/new">
                <Button type="primary" shape="round" size='large'>의뢰하기</Button> 
            </Link>
            :
            <Link to ="/portfolio/new">
                <Button type="primary" shape="round" size='large'>포트폴리오 등록하기</Button>
            </Link>
                : null}
            </div>
        </div>
    );

}


export default MainMenu;