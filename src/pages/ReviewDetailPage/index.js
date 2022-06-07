import React, {useEffect, useState} from 'react';
import MainMenu from '../../components/MainMenu';
import { getReview } from '../../apis/review';
import { Navigate, useParams} from 'react-router-dom';
import {ClientInfoContainer, PanoramaWrapper, ContentWrapper } from './style';
import { Rate } from 'antd';
import Avatar from 'components/Avatar';
import { SERVER_BASE_URL } from '../../utils/constants.js';
import defaultProfileImage from '../../assets/user_default_image.png';
/**
 * 
 * 'client_profile_image',
'client_username',
'client_company_name',
'client_email',
'panorama_image', // 후기사진
'score',
'description', 'title',
'created',
'commission_image', //의뢰할 당시 사진
'commission_budget' ,
'commission_description’
 * 
 */
const dummy = {
    'review' : {
        'client_profile_image': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsw40RqD54BYg7g04mBOm0f2k24h2hhn8-gg&usqp=CAU',
        'client_username': '의뢰인',
        'client_company_name' :'soongsil',
        'client_email': 'wl1524@naver.com',
        'panorama_image': 'https://t1.daumcdn.net/cfile/tistory/26562E3F5732904612',
        'score': 3, 
        'description': 'description', 
        'title' : 'title',
        'created': '2022-05-03',
        'commission_image' :'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPTguhV2D25pM3yUQrsa_kDKt6U8llBLWLGg&usqp=CAU' , 
        'commission_budget': 1000 , 
        'commission_description': '의뢰서 제목' 
        },
        
        designer_review : {
        'designer_username':'디자이너 이름', 
        'designer_id' : 5,
        'designer_email' : 'wl1524@naver.com', 
        'designer_profile_image':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPTguhV2D25pM3yUQrsa_kDKt6U8llBLWLGg&usqp=CAU' ,
        'score': 3,
        'review_text': '리뷰텍스트'
        }
}
const ReviewDetailPage = () => {
    const { id } = useParams();
    const [reviewDetail, setReviewDetail] = useState({});

    useEffect(()=>{

        
        const loadReview = async () => {
            const review = await getReview(id);
            setReviewDetail(review);
        }

        loadReview();
        

        //setReviewDetail(dummy);
    }, []); 

    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '100px 10%', width: '100%', height: '100%'}}>
        <div style={{marginTop:'50px', marginBottom: '100px', marginLeft:'40px', fontSize:'30px', 
        fontWeight:'bold'}}>고객 후기를 살펴보세요!</div>


        <div style={{display:'flex'}}>
        <ContentWrapper>
        <h2>{reviewDetail?.review?.title}</h2>
        <div><Rate disabled defaultValue={reviewDetail?.review?.score}/></div>
        <div>{reviewDetail?.review?.description}</div>
        </ContentWrapper>


        <ContentWrapper style={{display:'flex', padding: '20px 100px', flexDirection: 'column', marginLeft:'600px', borderRadius: '3%', backgroundColor: '#f0f0f1'}}>
            {
                reviewDetail?.review?.client_profile_image?
                <Avatar alt="클라이언트 프로필이미지" style={{marginBottom: '40px',width:'200px', height:'200px',objectFit: 'cover' }} src={`${SERVER_BASE_URL}${reviewDetail?.review?.client_profile_image}`}></Avatar>:
                <Avatar alt="클라이언트 프로필이미지" style={{marginBottom: '40px',width:'200px', height:'200px',objectFit: 'cover' }} src={defaultProfileImage}></Avatar>
            }
            <div>의뢰인 {reviewDetail?.review?.client_username}</div>
            <div>회사명 {reviewDetail?.review?.client_company_name}</div>
            <div>이메일 {reviewDetail?.review?.client_email}</div>
        </ContentWrapper>
        </div>

        
        

        <ContentWrapper style={{display:'flex', flexDirection:'column'}}>
                <h2>디자이너 후기</h2>
                <div onClick={()=>Navigate(`/portfolio/${reviewDetail?.designer_review?.designer_id}`)}>
                {
                    reviewDetail?.designer_review?.designer_profile_image?
                    <Avatar alt="클라이언트 프로필이미지" src={`${SERVER_BASE_URL}${reviewDetail?.designer_review?.designer_profile_image}`}></Avatar>:
                    <Avatar alt="클라이언트 프로필이미지" src={defaultProfileImage}></Avatar>
                }
                
                </div>
                <div>{reviewDetail?.designer_review?.designer_username}</div>
                <div>{reviewDetail?.designer_review?.designer_email}</div>
                <div><Rate disabled defaultValue={reviewDetail?.designer_review?.score}/></div>
                <div>{reviewDetail?.designer_review?.review_text}</div>
        </ContentWrapper>


        <ContentWrapper>
            <h2>의뢰 정보</h2>
            <div>{reviewDetail?.review?.commission_budget}</div>
            <div>{reviewDetail?.review?.client_company_name}</div>
            <div>{reviewDetail?.review?.commission_description}</div>
        </ContentWrapper>
        <h2>Before</h2>
        {
            reviewDetail?.review &&
            <PanoramaWrapper>
                <a-scene class="aframebox" embedded>
                <a-sky src={`${SERVER_BASE_URL}${reviewDetail?.review?.commission_image}`}
                rotation="0 -130 0" >
                </a-sky>
                </a-scene>
            </PanoramaWrapper>
                    
        }
        <h2>After</h2>
        {
            reviewDetail?.review &&
            <PanoramaWrapper>
                <a-scene class="aframebox" embedded>
                <a-sky src={`${SERVER_BASE_URL}${reviewDetail?.review?.panorama_image}`}
                rotation="0 -130 0" >
                </a-sky>
                </a-scene>
            </PanoramaWrapper>
                    
        }

            
        </div>


        

        </>
    );
}

export default ReviewDetailPage;

/*
 * 
 * 
 * 
 * 
 * 'review’ : {
'client_profile_image',*
'client_username',*
'client_company_name',*
'client_email',*
'panorama_image', // 후기사진 *
'score', *
'description', *
'title',*
'created',
'commission_image', //의뢰할 당시 사진 *
'commission_budget' , *
'commission_description’ * 
},

designer_review : {
'designer_username', * 
'designer_id' // 클릭하면 디자이너 포트폴리오로 이동할 수 있도록 할 수도 있을 것 같아서 추가했습니다.
,'designer_email', *
'designer_profile_image', *
'score',
'review_text’
}
 * 
 * 
 * 
 */