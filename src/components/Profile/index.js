import React from 'react';
import './index.css';


function Profile() {
    return (
        <div className='main_container' style={{width:'900px', height:'1800px', border:'1px solid skyblue', borderRadius:'10px', padding:'15px'}}>
            <div className='img_box'>
                <img className='profile_img' src="https://cdn.pixabay.com/photo/2016/10/16/23/33/fashion-show-1746590_960_720.jpg" alt="profile img"></img>
            </div>
            <span className='name' style={{position:"absolute" ,fontSize:'50px', fontWeight:'bold', marginLeft:'210px', marginTop:'-160px'}}>아만다</span>
            <span className='skills' style={{position:"absolute" ,fontSize:'40px', fontWeight:'bold', marginLeft:'210px', marginTop:'-80px'}}>Frontend Developer</span>
            
            <div style={{marginLeft:'20px'}}>
                <span className='email' style={{position:"absolute" ,fontSize:'20px', fontWeight:'bold', marginLeft:'625px', marginTop:'-90px'}}>이메일: </span>
                <span style={{position:"absolute" ,fontSize:'18px', marginLeft:'700px', marginTop:'-87px'}}>test@naver.com</span>
                <hr style={{width:'220px', position:'absolute', marginLeft:'625px', marginTop:'-55px'}}/>
            </div>
         
            <div style={{marginLeft:'20px'}}>
                <span className='phone' style={{position:"absolute" ,fontSize:'20px', fontWeight:'bold', marginLeft:'625px', marginTop:'-55px'}}>연락처</span>
                <span style={{position:"absolute" ,fontSize:'18px', marginLeft:'700px', marginTop:'-52px'}}>010-1111-2222</span>
                <hr style={{width:'220px', position:'absolute', marginLeft:'625px', marginTop:'-22px'}}/>
            </div>
            <hr></hr>

            <span style={{position:'absolute' ,fontSize:'16px', marginTop:'20px', fontWeight:'bold'}}>디자이너 소개 / About Designer</span>
            <div style={{position:'absolute', marginTop:'55px',width:'800px', height:'165px', border:'2px solid skyblue', borderRadius:'10px', padding:'10px'}}>
                <h4>-소개1</h4>
                <h4>-소개2</h4>
                <h4>-소개3</h4>
                <h4>-소개4</h4>
                <h4>-소개5</h4>
            </div>

            <span style={{position:'absolute' ,fontSize:'16px', marginTop:'250px', fontWeight:'bold'}}>자격증</span>
            <div style={{position:'absolute', marginTop:'285px',width:'800px', height:'165px', border:'2px solid skyblue', borderRadius:'10px', padding:'10px'}}>
                <table>
                    <thead>
                        <tr>
                        <th>취득기간</th><th>자격증</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>2020.03.08</td><td>정보처리기사</td>
                        </tr>
                        <tr>
                        <td>2021.05.78</td><td>파워포인트 1급</td>
                        </tr>
                        <tr>
                        <td>2022.10.24</td><td>컴퓨터활용능력 2급</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <span style={{position:'absolute' ,fontSize:'16px', marginTop:'480px', fontWeight:'bold'}}>경력사항</span>
            <div style={{position:'absolute', marginTop:'515px',width:'800px', height:'165px', border:'2px solid skyblue', borderRadius:'10px', padding:'10px'}}>
                <table>
                    <thead>
                        <tr>
                        <th>근무기간</th><th>회사명</th><th>직무</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>4개월</td><td>카카오</td><td>인턴</td>
                        </tr>
                        <tr>
                        <td>1년</td><td>넥슨</td><td>대리</td>
                        </tr>
                        <tr>
                        <td>3년</td><td>당근마켓</td><td>상무</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <span style={{position:'absolute' ,fontSize:'16px', marginTop:'710px', fontWeight:'bold'}}>진행한 프로젝트</span>
        </div>
    

    );
}

export default Profile;

