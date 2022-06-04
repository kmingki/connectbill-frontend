/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import MainMenu from '../../components/MainMenu';
import Footer from 'components/Footer';
import { getProject } from '../../apis/project';
import { useParams } from 'react-router-dom';
import { getPortfolio } from '../../apis/portfolio';
import { ProjectWrapper } from 'components/PortfolioCard/style';

const ProjectDetailPage = () => {

    const { id } = useParams();
    const [ projectInfo, setProjectInfo ] = useState({});
    
    useEffect(()=>{
        
        const loadProject = async () => {
            const data = await getProject(id);
            console.log(data);
            setProjectInfo(data);
        }

        loadProject();
        
    }, []);

    
    return (
        <>
        <MainMenu />
        <span style={{position:'absolute', marginTop:'50px' ,marginLeft:'280px' , textAlign:'center', fontSize:'35px', 
        fontWeight:'bold'}}>프로젝트 소개</span>
        <hr style={{width:'900px',marginTop:'120px', marginLeft:'280px'}}></hr>
        <h1 style={{marginTop:'20px', marginLeft:'270px'}}>[{projectInfo?.project?.title}]</h1>
        <h3 style={{marginTop:'10px', marginLeft:'270px'}}>프로젝트 기간 : {projectInfo?.project?.participation_date}</h3>
        <h3 style={{marginTop:'10px', marginLeft:'270px'}}>의뢰자 : {projectInfo?.project?.client}</h3>
        <h3 style={{marginTop:'10px', marginLeft:'270px'}}>평점 : {projectInfo?.project?.score}점</h3>
        <div style={{marginTop:'30px', width:'920px', marginLeft:'270px', border:'2px solid gray', borderRadius:'20px', padding:'10px'}} dangerouslySetInnerHTML={ {__html: projectInfo?.project?.description} }></div>
        <Footer />
        </>
    );
};

export default ProjectDetailPage;