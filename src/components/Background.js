import React from 'react';
import Styled from 'styled-components/native';

const ImageBackground = Styled.ImageBackground`
    flex: 1;
    width: 100%;
    height: 650px;
    opacity: 0.8;
    position: absolute;
    top: 71;
    left: 0;
    right: 0;
    bottom: 0;
`;

const Background = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_960_720.jpg',
      }}
    />
  );
};

export default Background;