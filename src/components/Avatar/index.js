import React from 'react';
import {AvatarWrapper} from './style';


const Avatar = ({src, icon, shape, ...props}) => {

    return (
        <AvatarWrapper src={src} shape={shape} {...props}>
        {icon && <icon />}
        </AvatarWrapper>
    );
};

Avatar.defaultProps = {
    shape: "circle"
}

export default Avatar;

