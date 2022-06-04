/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';

const container = css`
    padding: 0 10%;
`
const UserInfoForm = styled.div`
    padding:50px 20px;
    display: flex;
    align-items: center;
    border-radius: 1%;
    background-color: #f0f0f1;
    position:relative;
    margin: 78px 0;    
`
const userInfoContent = css`
    margin-Left: 20px;
`
const editButtonWrapper = css`
    position: absolute;
    right: 30px;
`

const SubTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
`
const ProjectWrapper = styled.div`
    font-size: 20px;
`
export { container,UserInfoForm, userInfoContent, editButtonWrapper, SubTitle, ProjectWrapper};

