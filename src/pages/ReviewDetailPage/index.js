import React, {useEffect, useState} from 'react';
import MainMenu from '../../components/MainMenu';
import { getReview } from '../../apis/review';
import { Navigate, useParams} from 'react-router-dom';
import {ClientInfoContainer, PanoramaWrapper} from './style';
import { Rate } from 'antd';
import Avatar from 'components/Avatar';
import { SERVER_BASE_URL } from '../../utils/constants.js';

const ReviewDetailPage = () => {
    const { id } = useParams();
    const [reviewDetail, setReviewDetail] = useState({});

    useEffect(()=>{

        const loadReview = async () => {
            const review = await getReview(id);
            setReviewDetail(review);
        }

        loadReview();
    }, []); 

    return (
        <>
        <MainMenu />
        <div className={'main-container'} style={{padding: '0 10%', width: '100%', height: '100%'}}>
        <span style={{position:'absolute', marginTop:'50px' ,marginLeft:'40px' , textAlign:'center', fontSize:'30px', 
        fontWeight:'bold'}}>고객 후기를 살펴보세요!</span>
        <hr style={{width:'1200px',marginTop:'120px', marginLeft:'30px', position:'absolute'}}></hr>

        <h2>{reviewDetail?.review.title}</h2>
        <div><Rate disabled defaultValue={reviewDetail?.review.score}/></div>
        <div>{reviewDetail?.review.description}</div>

        <div>
            <img alt="클라이언트 프로필이미지" src={`${SERVER_BASE_URL}${reviewDetail?.review.client_profile_image}`}></img>
            <div>{reviewDetail?.review.client_username}</div>
            <div>{reviewDetail?.review.client_company_name}</div>
            <div>{reviewDetail?.review.client_email}</div>
        </div>

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


        <div>
            <h2>의뢰 정보</h2>
            <div>{reviewDetail?.review.commission_budget}</div>
            <div>{reviewDetail?.review.client_company_name}</div>
            <div>{reviewDetail?.review.commission_description}</div>
        </div>


        <div>
            <h2>디자이너 후기</h2>
            <div onClick={()=>Navigate(`/portfolio/${reviewDetail?.designer_review.designer_id}`)}>
            <Avatar alt="클라이언트 프로필이미지" src={`${SERVER_BASE_URL}${reviewDetail?.designer_review.designer_profile_image}`}></Avatar>
            </div>
            <div>{reviewDetail?.designer_review.designer_username}</div>
            <div>{reviewDetail?.designer_review.designer_email}</div>
            <div><Rate disabled defaultValue={reviewDetail?.designer_review.score}/></div>
            <div>{reviewDetail?.designer_review.review_text}</div>
        </div>

        </>
    );
}

export default ReviewDetailPage;