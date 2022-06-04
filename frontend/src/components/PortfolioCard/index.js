import React from 'react';
import { PortfolioCardContainer, NameWrapper, DescriptionWrapper, ProjectWrapper } from './style.js';
import Avatar from 'components/Avatar/index.js';
import { Rate } from 'antd';
import { useNavigate } from 'react-router-dom';

const PortfolioCard = ({portfolio}) => {
    const navigate = useNavigate();

    const onClickProfolio = () => {
        navigate(`/portfolio/${portfolio.id}`);
    }
    return (
        
        <PortfolioCardContainer onClick={onClickProfolio}>
            <div style={{width: '200px'}}>
            <Avatar src={`http://127.0.0.1:8000${portfolio?.profile_image}`} shape="square" ></Avatar>
            <NameWrapper>{portfolio?.username}</NameWrapper>
            <NameWrapper>{portfolio?.skills}</NameWrapper>
            </div>

            <div style={{width: '100%'}}>
                <DescriptionWrapper>{portfolio?.description}</DescriptionWrapper>
                <div style={{marginTop: '20px'}}>
                <fieldset style={{border:'2px solid #f0f0f1', padding: '10px', width:'900px'}}>
                <NameWrapper>진행한 프로젝트</NameWrapper>
                {portfolio?.projects.length > 0? 
                portfolio?.projects?.map((project) => {
                    return (
                        <h6><ProjectWrapper style={{fontSize: '12px', marginLeft:'30px'}}>
                            - {project?.title}
                            <Rate defaultValue={project?.average_stars} disabled/>
                        </ProjectWrapper></h6>
                    );
                }) :
                <h6><ProjectWrapper style={{fontSize: '12px', marginLeft:'30px'}}>
                        아직 진행한 프로젝트가 없습니다!
                        </ProjectWrapper></h6>
                }
                </fieldset>
                </div>
            </div>
        </PortfolioCardContainer>
        
    );

}

export default PortfolioCard;