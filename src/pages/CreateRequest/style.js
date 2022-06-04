/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import styled from '@emotion/styled'
import { TextArea } from 'antd';
const gap = css`
    padding: 20px 0;
`

const inputStyle = css`
    width:100%;
    height: 50px;
`

const imageStyle = css`
    position : relative;
`;

const BudgetInput = styled.div`
    display: flex;
    align-items: center;
`

export { gap, inputStyle, imageStyle, BudgetInput };