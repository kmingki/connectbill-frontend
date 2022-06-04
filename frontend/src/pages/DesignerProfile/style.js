/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';

const container = css`
    padding: 0 10%;
`
const UserInfoForm = styled.div`
    width:50%;
    height:300px;
    padding:50px;
    display: flex;
    align-items: center;
    border-radius: 1%;
    background-color: #f0f0f1;
    margin: 78px 0;    
`
const userInfoContent = css`
    margin-Left: 50px;
`
const editButtonWrapper = css`
    margin: 10px 0px;
    width:200px;
`

const SubTitle = styled.div`
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
`
const MessageWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 10px;

    &:hover {
        background-color: orange;
    }
`
export { container,UserInfoForm, userInfoContent, editButtonWrapper, SubTitle, MessageWrapper };