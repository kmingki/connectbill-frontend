import React, {useEffect, useState} from 'react';
import MainMenu from '../../components/MainMenu';
import { getReview } from '../../apis/review';
import { useParams} from 'react-router-dom';

const ReviewDetailPage = () => {
    const { id } = useParams();
    const [review, setReview] = useState({});

    useEffect(()=>{

        const loadReview = async () => {
            const review = await getReview(id);
            setReview(review);
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

        
        </div>
        </>
    );
}

export default ReviewDetailPage;