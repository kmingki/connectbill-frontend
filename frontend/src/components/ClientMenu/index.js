import React from 'react';
import { menuWrapper, menuTitle } from './style';

const ClientMenu = () => { 
    

    return (
        <div id="menu">
                    <div css={menuWrapper}>
                    <div css={menuTitle}>
                        의뢰 관리
                        <hr></hr>
                    </div>
                    <div>1:1 의뢰 관리</div>
                    </div>

                    <div css={menuTitle}>
                        결제 관리
                        <hr></hr>
                    </div>
                    
                    <div>결제 내역</div>
                    <div>가상계좌</div>
                    <div>쿠폰함</div>
                </div>
    );
}

export default ClientMenu;