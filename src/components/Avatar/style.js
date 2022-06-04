import styled from '@emotion/styled';

const AvatarWrapper = styled.div`
    border-radius: ${props => props.shape === 'circle' ? '50%' : 'null'};
    width: 100px;
    height: 100px;
    ${props => props.src && 'background-image: url("'+props.src+'")'};
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    &:hover {
        opacity: 0.5;
    }
`

export {AvatarWrapper};