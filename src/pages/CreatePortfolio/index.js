import React, { useRef, useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import { Button } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { useNavigate } from 'react-router-dom';
import { UserInfoForm, NameWrapper, SubTitle, UserInfo } from './style.js';
import Avatar from 'components/Avatar';
import { Input, Table, Form, DatePicker } from 'antd';
import { useInput } from 'utils/useInput';
import moment from 'moment';
import { loadMyInfo } from '../../apis/user';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
const columns = [
    {
      title: '취득 기간',
      dataIndex: 'acquired_period',
      key: 'acquired_period',
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
        dataIndex: 'job_position',
        key: 'job_position',
      },
  ];


const CreatePortfolioPage = () => {
    const [ user, setUser ]  = useState({});
    const [certificates, setCertificates] = useState([]);
    const [educationcareers, setEducationcareers] = useState([]);

    const [ certificateName, onChangeCertificateName] = useInput('');
    const [ companyName, onChangeCompanyName] = useInput('');
    const [ career, onChangeCareer] = useInput('');
    const [ content, setContent ] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{

        const loadData = async () => {
            const data = await loadMyInfo();
            setUser(data);
        }
        loadData();
    }, []);

    const onSubmit = (e) => {
        console.log('create portfolio');
        console.log(certificates);
        console.log(educationcareers);
        console.log(content);
        /*
        const formData = new FormData();
        formData.append('certificates', certificates);
        formData.append('educationcareers', educationcareers);
        formData.append('content', content);
        */
        navigate('/sda');
        const token = localStorage.getItem('token');
        axios.defaults.headers.common['Authorization'] = "Token "+token;
        axios.post('http://localhost:8000/api/portfolio/create_portfolio', 
        {'certificates': certificates,
        'educationcareers': educationcareers,
        'content': content
    })
        .then((res) => {
            navigate('/sda');
        })
        .catch((error) => {
            console.error(error);
        });
        navigate('/sda');
    }

    const onChangeTextArea = (e) => {
        setContent(e.target.value);
    }

    const onChangeRangePicker = (fieldsValue) => {
        const rangeValue = fieldsValue['range-picker'];
        //console.log(rangeValue);
        //console.log(moment(rangeValue[1].format('YYYY-MM-DD')).diff(moment(rangeValue[0].format('YYYY-MM-DD')), 'months'));
        setCertificates(prev => [...prev, {
            acquired_period:rangeValue[0].format('YYYY-MM-DD')+" ~ "+rangeValue[1].format('YYYY-MM-DD'),
            certificate_name: certificateName,
            time: moment(rangeValue[1].format('YYYY-MM-DD')).diff(moment(rangeValue[0].format('YYYY-MM-DD')), 'months'),
        }]);
        //console.log(certificates);
    }

    const onChangeRangeCareer = (fieldsValue) => {
        const rangeValue = fieldsValue['range-picker'];
        
        setEducationcareers(prev => [...prev, {
            working_period:rangeValue[0].format('YYYY-MM-DD')+" ~ "+rangeValue[1].format('YYYY-MM-DD'),
            company_name: companyName,
            job_position: career//
        }]);
        //console.log(certificates);
    }

    /**
     * setUser({
            userId : id,
            isClient : is_client,
            username : username,
            auth_token : auth_token,
            profileImage : '',
        });
     */
    return (
        <>
        <MainMenu />
        <section className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>

            <div className={'mainTitle'} style={{fontSize: '32px', fontWeight: '500', padding:'50px 0'}}>
                이력서를 등록해보세요
            </div>

            <UserInfoForm>
                <Avatar shape="circle" src={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAKlBMVEXFxcX////CwsLe3t7b29vT09Pn5+f19fXOzs77+/vJycnw8PDq6urt7e0K8aSoAAAE+klEQVR4nO2di5qqMAyEsQpy0fd/3WOXZYuKCiTpTD35n8D50maS0NaqchzHcRzHcRzHcRzHcRzHcRzHcRzHcRzHcRwHQJiD/jHa3CT17enYNEPk0hxPdV99j8wQ2uO16w4PdOem/gaVoaqvT+ISw7EtWmSU91rdFMtTW6rG0J/eRG/Opa0KFBn6yzp5P5xPpUkM1XGDvsjQF6UxrF2fcy7laAzt5/yyRFfKUg2nXfoi1zIkNrsF3sLI7xyhPQsE3jiiFXwgtDtSzINE6iiGWqrvwL0ZBTlmzoDW8RIlgbcKhzSKKkt0hHShtmoCD4cGLWaJXpxF5zBmVKEPPlKzSQySSmaJDq3oAbU0mjijNd0jL2WeodqKYUs/v5oeLSthsEYjRMYfDNZohCafGoWQKNn0RgJpko26Fc7gSDa65do9FEE024WRgUGhdkF6T41WV+k2Tc8QBNGmnEngc42V20/g5+B6o4tl4MvU0gxHwALNFyk+m9pm0kiDXaamdj8C7qGsvSKC9YtgWtCMtFCFlXmiQTuiXWuYwKYaa7+PQD0/QyoFJ9Ow9dTMHjpXaKowgx0eDq7QFbrC/1yhef8LV/j9bpGjpoEq/P669D/oLb6/P8zR42OHbWHfie5NgOc09naBPjpkPy+9oMf65qkG/WnGvjJFf14zr2rwx4asPR9/ViEMtgrBE++IbWkK/0AaMc2m+EVqbPpoux+xzDUMIbStTQnyTMSucoNXbL+YzaM6dD3zRzBSiC5JE0bpFDuCesCk1ac55l2pXltLcF1gM0g2HGaf0C/A6W51a1c2HNXMHOWtyLUJR1S7fc7LzoquyFPM3KOXUNFKXqI0eOtIOoolVKLYUb9To7AXB9I9OCHOqFe0go8In2/hM/ol9uebAh7g+WHXO1gR/hU6EXbZRsfUD35k23t0P/p4RhZrCOG01RmvdUFPRIaq2bMRu6aM1xNDqPfbxZk/kDd9smZ/INcoid8sjmgZL9HQx6wx9HrDKManPoPyPLFh245aCzTBtlQtTtVc0KISCs9BLkLTaRh+yCfpFi0P1BDMTa1W6AR8pWY4rA8+BJ3jvgV0M2a5MoN8CDPLracD0BkznGL/BTOiynER4Q/IOdqcAiGP0+VboiPZF2quJJPIm27y3Kx8IOcNL4jAnBKz3KtcIlcBF+xvAr0iVxkOE5jpCENWp38kh/ODssyEfbYxOWe5BfMRXI6rze8xPqphfctpBbb3hGBOOMfUFfFrNGK4TqFGkbCzjCxzpzXYzabQyv4w0gf2+jlGvo/2+jkmL0kQWGHCwhTh5do9FsVbhndaNqB/o4bGKSbUHcP+zeeNaF/dowuhfhDZQqi9EwlDqB1EvhAqB5HLCycUCxuqciahWNjgRsDvUbsfRZlnInq5Bq3kJUr6yGruOUr1N8l0ZgmliQ3HgG0ZlbEb0fDiGZ1xBu8iVTqiwWqGIwqWSGuGIwqWSNf63qPQCDNn0og4m1J8bXqH+EsUaVuRkDcY3NtQoQ/m9oqI0C+oC5oRYVmT4zVrIdK3eti3oXgj8m9D4Uakd8OIyBELSDTCVEPc3idkjT5/ohGmmhISjSjVFJFoRKmGvPudEHTB9I3FiKC9KCKVipIp+QRjQjLJQP/2lewXyD6jmdg/q+H9JHPP7o/BhdihwBALsUOBIRbRWUR2dxd5/qFSgd1/MFBISfOhqPkHhUBa66YjQ/cAAAAASUVORK5CYII='}></Avatar>
                <NameWrapper><div style={{fontWeight:'600', fontSize:"22px"}}>{user.username? user.username: '김커넥'}</div><div>{user.skills? user.skills: 'Frontend Developer'}</div></NameWrapper>

                <UserInfo>
                    <NameWrapper><MailOutlined style={{marginRight:'5px'}}/>이메일<div style={{marginLeft: '10px', display:'inline-block', fontWeight:'400'}}>{user.email? user.email : ''}</div></NameWrapper>
                    <NameWrapper><PhoneOutlined style={{marginRight:'5px'}}/>전화번호<div style={{marginLeft: '10px', display:'inline-block', fontWeight:'400'}}>{user.phone? user.phone : ''}</div></NameWrapper>
                </UserInfo>
            </UserInfoForm>
            
            <div style={{marginTop:'20px'}}>
                <SubTitle>소개 / ABOUT ME</SubTitle>
                <Input.TextArea placeholder="소개글을 작성해주세요" rows={4} onChange={onChangeTextArea} />
            </div>

            <div style={{margin: '30px 0'}}>
            <SubTitle>자격증</SubTitle>
            <Table columns={columns} dataSource={certificates} pagination={false}/>
            </div>

            <Form name="time_related_controls" onFinish={onChangeRangePicker}>
                <div style={{display:'flex', alignItems:'start'}}>
                <Form.Item name="range-picker" label="취득 기간" style={{marginRight:'5px'}} >
                    <DatePicker.RangePicker />
                </Form.Item>
                <Form.Item >
                    <Input placeholder="자격증 이름" onChange={onChangeCertificateName} value={certificateName}/>
                </Form.Item>
                <Button htmlType="submit" >추가하기</Button>
                </div>
            </Form>

            <div style={{margin: '30px 0'}}>
            <SubTitle>경력 사항</SubTitle>
            <Table columns={work_columns} dataSource={educationcareers} pagination={false}/>
            </div>

            <Form name="time_related_controls" onFinish={onChangeRangeCareer}>
                <div style={{display:'flex', alignItems:'start'}}>
                <Form.Item name="range-picker" label="재학 / 근무 기간" style={{marginRight:'5px'}} >
                    <DatePicker.RangePicker />
                </Form.Item>
                <Form.Item >
                    <Input placeholder="회사 이름" onChange={onChangeCompanyName} value={companyName}/>
                </Form.Item>
                <Form.Item >
                    <Input placeholder="직무" onChange={onChangeCareer} value={career}/>
                </Form.Item>
                <Button htmlType="submit" >추가하기</Button>
                </div>
            </Form>

            
            <Button type="primary" shape="round" size='large' onClick={onSubmit}>포트폴리오 등록</Button>
            
        </section>
        </>
    );
};




/**
 * 
 * <div style={{margin: '20px 0'}}>
                <input type="file" name="image" multiple hidden ref={imageInput} onChange={onChangeImage}/>
            </div>
            <div style={{margin: '20px 0'}}>
            <Button icon={<UploadOutlined />} onClick={onClickImageUpload}>
                Upload
            </Button>
            </div>
            {imagePrevious && <img alt='미리보기' ref={imagePreviousRef} />}
            
 * 
 * 
 */




export default CreatePortfolioPage;

/**
 * 
 * { userid : 회원 아이디, 
title: 게시글 제목, 
description: 게시글 내용, 
image: 이미지파일 }
 * 
 * 
 */