/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const LinkContainer = css`
    width: 100%;
    height: 100%;
`

const ActiveLink = styled(Link)`
    fontWeight: bold;
    fontSize: 20px;
    color: black;
    margin: 10px 10px;
    padding: 10px 10px;
    ${({ isactive }) => isactive && 'border-bottom: 2px solid black;'}
    

`
//color: '#3c434a',
export {  ActiveLink,  LinkContainer };