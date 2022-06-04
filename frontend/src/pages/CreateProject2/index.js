import React, {useEffect, useState, useRef, useMemo} from 'react'; //필요한 라이브러리 첨부
import MainMenu from '../../components/MainMenu';
import Footer from '../../components/Footer';
import 'antd/dist/antd.min.css';
import { useInput } from 'utils/useInput';
import { Form, DatePicker } from 'antd';
import './index.css';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Editor from 'components/Editor';
import QuillEditor from 'components/TestEditor';
import { postProject, postAllProject } from 'apis/project';
import axios from 'axios';
import moment from 'moment';
import { Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreateProjectPage2 = ({ }) => {
  
    useEffect(() => {
    }); 
    //title, date, title_image, description

    const navigate = useNavigate();
    const [ fileImage, setFileImage] = useState("");
    const [ title, onChangeContent ] = useInput('');
    const [value, setValue] = useState('');
    const [ start_date, setStartDate ] = useState('');
    const [ end_date, setEndDate ] = useState('');

    //미리보기를 위해 파일 저장
    const saveFileImage = (e) => {
      setFileImage((e.target.files[0]));
    };


    //여기서부터 quill
    function imageUrlHandler() {
      const range = this.quill.getSelection();
      const url = prompt('please copy paste the image url here.');

      if (url) {
          //커서위치에 imageUrl 삽입
          this.quill.insertEmbed(range.index, 'image', url);
      }
  }

  //이미지 제어
  function imageHandler() {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', '.png, .jpg, .jpeg');
      input.click();

      input.onchange  = async(e) => {

          
          const files = e.target.files;
          const formData = new FormData();
          formData.append('files', files[0]);

          //file 등록
          // const tempFile = await postProject(formData);
          // console.log('check');
      
          const token = localStorage.getItem('token');
          axios.defaults.headers.common['Authorization'] = "Token "+token;
          axios.post('http://localhost:8000/api/portfolio/projects/image_handler', 
          formData)
          .then((res) => {
              console.log(res.data)
              const range = this.quill.getSelection();
              this.quill.insertEmbed(range.index, 'image', 'http://localhost:8000/'+ res.data['file_path']);
          })
          .catch((error) => {
              console.error(error);
          });
          
      }
  }

  //Quill Editor 모듈 구성
  const modules = useMemo(() => ({
      toolbar: {
          container: [
              [{header: [1,2,false]}],
              ['bold', 'italic', 'underline'],
              [{list:'ordered'}, {list:'bullet'}],
              ['imageUrl', 'image', 'code-block']
          ],
          handlers: {
              imageUrl: imageUrlHandler,
              image: imageHandler
          }
      }
  }), [])

//여기까지 value
 // console.log(value);
  

    const onSubmit = async (e) =>{
        e.preventDefault();
       
        const formData = new FormData();

        //formData.append('end_date', end_date);
        //formData.append('participate_date', start_date + " ~ " + end_date);
        formData.append('start_date', start_date+' ~ '+end_date);
        formData.append('title', title);
        formData.append('title_image', fileImage);
        formData.append('description', value);
        
        console.log('참여기간: ',start_date + ' ~ ' + end_date);
        //console.log('마감일: ',end_date);
        //console.log('참여기간', start_date + " ~ " + end_date);
        console.log('제목: ',title);
        console.log('썸네일사진: ',fileImage);
        console.log('본문: ',value);

        const result = await postAllProject(formData);
        navigate('/designer/mypage');
    };

    //이미지 등록 버튼 커스텀을 위한 코드
    const imageInput = useRef();

    const onChange = (date, dateString) => {
      setStartDate(dateString);
    };
    const onChange2 = (date, dateString) => {
      setEndDate(dateString);
    };

    return (
        <>
        <MainMenu />
        <span style={{position:'absolute', marginTop:'50px' ,marginLeft:'280px' , textAlign:'center', fontSize:'35px', 
        fontWeight:'bold'}}>디자이너님의 프로젝트를 직접 등록해주세요!</span>
        <hr style={{width:'900px',marginTop:'120px', marginLeft:'280px'}}></hr>

        <Form name="time_related_controls" >
                <div style={{display:'flex', alignItems:'start', marginLeft:'300px', marginTop:'30px'}}>
                    <div style={{fontSize:'16px'}}>[ 프로젝트 참여기간 ] : 시작일과 마감일을 설정해주세요</div>
                    <Space direction="horizental" style={{marginTop:'45px', marginLeft:'-370px'}}>
                      <DatePicker onChange={onChange} placeholder="Select start_date"/>
                      <DatePicker onChange={onChange2} placeholder="Select finish_date"/>
                    </Space>
                </div>
        </Form>

        <div style={{marginTop:'10px', fontWeight:'bold'}}>
          <span style={{marginLeft:'300px', fontSize:'16px', fontWeight:'normal'}}>[ 프로젝트 대표 이미지를 첨부해주세요 ]</span>
        </div>

        <div style={{textAlign:'center', marginTop:'30px', marginLeft:'290px', width:'940px', height:'220px', borderRadius: 10,
        border:'1px solid gray'}}>
            <input type="file" multiple onChange={saveFileImage} style={{marginTop:'20px'}} ref={imageInput}/>
        </div>

        <div style={{marginTop:'30px', textAlign:'center'}}>
          <div style={{fontSize:'16px', textAlign:'left', marginLeft:'300px', height:'10px'}}>[ 프로젝트 타이틀 ]</div>
          <textarea
            onChange={onChangeContent}
            maxLength={50} //50자 제한
            multiline={false}
            style={{
              padding:20,
              fontSize:15,
              marginTop: 40,
              paddingHorizontal: 10,
              width:940,
              height: 70,
              borderRadius: 10,
              borderWidth: 1,
              borderColor:'gray'
            }}
            placeholder="프로젝트 제목을 입력해주세요"
          />
        </div>

        <div style={{fontSize:'16px', textAlign:'left', marginLeft:'300px', height:'10px', marginTop:'40px'}}>[ 프로젝트 상세설명 ]</div>
        <div style={{marginTop:'40px', textAlign:'center', width:'940px', marginLeft:'290px'}}>
          <ReactQuill theme='snow' value={value} modules={modules} onChange={setValue} textAlign ='center'/>
        </div>
      
        <button className='submit' type='submit' onClick={onSubmit}>등록</button><br/><br/><br/><br/>
        
        <Footer />
        </>
        
      );
    };


export default CreateProjectPage2;