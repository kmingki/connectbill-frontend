import React, {useEffect} from 'react';
import { CardWrapper } from './style';
import { Rate } from 'antd';
/**
 * 
 client: null
id: 8
participation_date: "2022-06-13 ~ 2022-09-09"
score: 0
small_image: "/media/portfolio/projects/sumnail/b2dbbc802c80466b8db2ef97f3f389e0.png"
title: "fsdfsdfds"

 * client: null*
description: "<p><img src=\"http://localhost:8000/media/portfolio/projects/image/designer/profile - 복사본.png\"></p>"
participation_date: "2022-06-13 ~ 2022-09-09"*
score: 0*
title: "fsdfsdfds"*
 * 
 * 
 */
const ProjectCard = ({ project }) => {

    console.log(project);
    useEffect(()=>{
        const projectContent = document.querySelector(`#project-${project.id}`);
        console.log(projectContent);
        projectContent.innerHTML = project?.description;
    }, []);
    
    return (
        <CardWrapper >
            <h2>프로젝트 상세</h2>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom:'100px'}}>
                <div style={{fontSize: '20px'}}>
                    {project.title}
                    <Rate disabled defaultValue={project.score} style={{marginLeft: '20px'}}/>
                    <div>프로젝트 기간 : {project.participation_date}</div>
                    <div>의뢰자 : {project.client}</div>
                </div>
                <div>
                    <img src={`http://localhost:8000${project.small_image}`} width="300px"/>
                </div>
            </div>
            <div id={`project-${project.id}`} style={{border: '2px solid #f1f0f5', borderRadius: '5%', padding: '40px'}}></div>
        </CardWrapper>
    );
}

export default ProjectCard;