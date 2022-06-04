/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

const signupButton = css`
    width: 80%;
    display: block;
    margin: 20px auto;
    padding: 10px 0;
    background-color: #DCEBFF;
    text-align: center;
    border-radius: 5px;
    color: black;
    & > span {
        text-decoration: underline;
    }
    &:hover{
        color: black;
    }

`

export {signupButton};