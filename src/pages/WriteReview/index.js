import React, {useEffect, useState} from 'react'; //필요한 라이브러리 첨부
import MainMenu from '../../components/MainMenu';
import Footer from '../../components/Footer';
import 'antd/dist/antd.min.css';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';
import { useInput } from 'utils/useInput';
import './index.css';
import { Radio, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { postReview } from '../../apis/review';
import { CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ARRAY = [0, 1, 2, 3, 4]; //별의 개수가 5개이니 인덱스 0~4

function WriteReviewPage() {
  const navigate = useNavigate();
  const { id } = useParams();
    const [ isPanorama, setIsPanorama ] = useState(true);
    //의뢰 자체 별점
    const [clicked, setClicked] = useState([false, false, false, false, false]); //하나를 클릭하면 true, flase, ... 이런식으로 바뀌게
  
    const handleStarClick = index => { //el에 찍힌 값이 index로 들어와 index-1 까지는 true로 변경
      let clickStates = [...clicked];
      for (let i = 0; i < 5; i++) {
        clickStates[i] = i <= index ? true : false;
      }
      setClicked(clickStates);
      return clicked.filter(Boolean).length;
    };

    //디자이너 평점
    const [clicked2, setClicked2] = useState([false, false, false, false, false]); //하나를 클릭하면 true, flase, ... 이런식으로 바뀌게
  
    const handleStarClick2 = index => { //el에 찍힌 값이 index로 들어와 index-1 까지는 true로 변경
      let clickStates2 = [...clicked2];
      for (let i = 0; i < 5; i++) {
        clickStates2[i] = i <= index ? true : false;
      }
      setClicked2(clickStates2);
      return clicked2.filter(Boolean).length;
    };
  
    useEffect(() => {
    }, [clicked]); 

    //별점 아래 UI 관련 코드
    const [images, setImages] = useState([]); 
    const [fileImage, setFileImage] = useState("");
    //const [small_image, setsmallImage] = useState([]);
    const [ imagePrevious, setImagePrevious ] = useState([]); 
    const [ description, onChangeContent ] = useInput('');
    //const [ designer_score ];
    const [ designer_review, onChangeContent2 ] = useInput('');

    const onChangeFile = (e) => {

      Array.from(e.target.files).forEach(file => {

        const reader = new FileReader();
        reader.onload = (e) => {
            setImagePrevious(prev=> [...prev, e.target.result]);
        };
        setImages(prev=>[...prev, file]);
        reader.readAsDataURL(file);
    });
    }

    //미리보기를 위해 파일 저장
    const saveFileImage = (e) => {
      setFileImage(e.target.files[0]);
    };

    //const handleChangeFile = (e) => {
    //  if (e.target.file) {
    //  setsmallImage([small_image, e.target.file]);
    //  }
    //}

    
    const onChangeIsPanorama = (e) => {
      setIsPanorama(e.target.value);
    }

    const onClickPrevious = (i) => {
      setImagePrevious((prev)=>(
        prev.filter((img, index) => index !== i)
    ));
    }
    const onSubmit = async (e) =>{
        e.preventDefault();
        
        let score = clicked.filter(Boolean).length; //true 표시한 별 개수만 체크
        let designer_score = clicked2.filter(Boolean).length;

        const formData = new FormData();
        for (let i =0;i<images.length; i++) {
          formData.append("images", images[i]);
        }
        formData.append('commission_id', parseInt(id, 10));
        formData.append('small_image', fileImage);
        formData.append('description', description);
        formData.append('score', score);
        formData.append('designer_review', designer_review);
        formData.append('designer_score', designer_score);
        formData.append('is_panorama', isPanorama);

        console.log(id);
        console.log(images);
        console.log(fileImage);
        console.log(description);
        console.log(score);
        console.log(designer_review);
        console.log(designer_score);
        console.log(isPanorama);
        await postReview(formData);
        navigate('/client/mypage');
    
    };

    return (
        <>
        <MainMenu />
        <Wrap>
          <RatingText style={{marginTop:'40px', textAlign:'center', fontSize:'30px', fontWeight:'bold'}}>이번 의뢰는 어떠셨나요?</RatingText>
          <span style={{marginLeft:'610px', color:'gray', fontWeight:'bold'}}>(디자이너 후기는 아래쪽에 있습니다!)</span>
          <Stars style={{marginLeft:'640px', marginTop:'20px'}}>
            {ARRAY.map((el, idx) => { //map은 배열을 받아 새로운 배열로 리턴하는 함수 -> 인덱스 값이 el로 찍히게 됨
              return (
                <FaStar //svg로 나타냄
                  key={idx}
                  size="50"
                  onClick={() => handleStarClick(el)}
                  className={clicked[el] && 'redStar'}
                />
              );
            })}
          </Stars>
        </Wrap>
        <hr style={{width:'1000px', marginTop:'50px', marginLeft:'260px'}}></hr>
        <div style={{marginTop:'30px', textAlign:'center'}}>
          <span style={{fontSize:'18px', fontWeight:'bold'}}>평점에 따른 이유를 작성해주세요</span><br/>
          <span style={{fontSize:'18px', fontWeight:'bold'}}>어떤 점이 좋았나요?</span><br/>
          <textarea
            onChange={onChangeContent}
            maxLength={200} //200자 제한
            multiline={true}
            style={{
              padding:20,
              fontSize:15,
              marginTop: 40,
              paddingHorizontal: 10,
              width:940,
              height: 240,
              borderRadius: 10,
              borderWidth: 1,
              borderColor:'aliceblue',
              backgroundColor:'aliceblue'
            }}
            placeholder="최소 10글자 이상 입력해주세요"
          />
        </div>

        <div style={{marginTop:'50px', fontWeight:'bold'}}>
          <span style={{marginLeft:'290px'}}>[ 썸네일용 이미지를 첨부해주세요 ]</span>
        </div>
        <div style={{textAlign:'center', marginTop:'10px', marginLeft:'290px', width:'940px', height:'200px', borderRadius: 10,
        border:'2px solid skyblue'}}>
            <input type="file" multiple onChange={saveFileImage} style={{marginTop:'20px'}}/>
        </div>

        <div style={{marginTop:'50px', fontWeight:'bold'}}>
          <span style={{marginLeft:'290px'}}>[ 리뷰 이미지를 첨부해주세요 ]</span>
          <div style={{marginLeft:'290px'}}>
          <Radio.Group onChange={onChangeIsPanorama} value={isPanorama}>
            <Radio value={true}>파노라마 사진으로 등록하기</Radio>
            <Radio value={false}>이미지 스티칭 하기</Radio>
          </Radio.Group>
          </div>
        </div>
        
        <div style={{textAlign:'center', marginTop:'10px', marginLeft:'290px', width:'940px', height:'200px', borderRadius: 10,
        border:'2px solid skyblue'}}>
            <input type="file" multiple onChange={onChangeFile} style={{marginTop:'20px'}}/>
            <div style={{display: 'flex'}}>
                {imagePrevious.map((p, index)=> 
                <div>
                  <Button type="primary" shape="circle" style={{position:"absolute"}} icon={<CloseOutlined />} size={'small'} onClick={()=>onClickPrevious(index)}/>
                  <img  key={index} alt="미리보기" src={p} height={'100px'} width={'100px'}></img></div>)}
            </div>
        </div>

        <div style={{marginTop:'30px', textAlign:'left', marginLeft:'290px'}}>
          <span style={{ fontWeight:'bold'}}>[ 디자이너에 대한 평점과 한줄평을 남겨주세요! ]</span><br/>
          <Wrap>
          <Stars style={{marginLeft:'0px', marginTop:'0px'}}>
            {ARRAY.map((el, idx) => { //map은 배열을 받아 새로운 배열로 리턴하는 함수 -> 인덱스 값이 el로 찍히게 됨
              return (
                <FaStar //svg로 나타냄
                  key={idx}
                  size="30"
                  onClick={() => handleStarClick2(el)}
                  className={clicked2[el] && 'redStar'}
                />
              );
            })}
          </Stars>
        </Wrap>
          <textarea
            onChange={onChangeContent2}
            maxLength={100} //200자 제한
            style={{
              padding:20,
              fontSize:15,
              marginTop: 10,
              paddingHorizontal: 10,
              width:940,
              height: 70,
              borderRadius: 10,
              borderWidth: 1,
              border: '2px solid skyblue'
            }}
            placeholder="디자이너가 어땠는지 한 줄로 평가해주세요:)"
          />
        </div>

        <button className='submit' type='submit' onClick={onSubmit}>등록</button><br/><br/><br/><br/>
        
        <Footer />
        </>
        
      );
    }


export default WriteReviewPage;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 15px;
`;

const RatingText = styled.div`
  color: #787878;
  font-size: 12px;
  font-weight: 400;
`;

const Stars = styled.div`
  display: flex;
  padding-top: 5px;

  & svg {
    color: rgb(238, 237, 237);
    cursor: pointer;
  }

  :hover svg {
    color: rgb(254, 94, 94);
  }

  & svg:hover ~ svg {
    color: rgb(238, 237, 237);
  }

  .redStar {
    color: rgb(254, 94, 94);
  }
`;