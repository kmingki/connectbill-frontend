import React from 'react';
import facebook from './img/facebook.png'
import insta from './img/insta.png'
import twitter from './img/twitter.png'


function Footer()  {
    return(
        <div id="footerWrap" style={{marginLeft:'600px', marginTop: '80px', fontSize: '14px'}}>
            <div id="sns" style={{marginLeft:'90px'}}>
                <img id="facebookIcon" class="snsIcon" src={facebook} alt="facebookIcon"/>
                <img id="twitterIcon" style={{marginLeft:'10px'}} class="snsIcon" src={twitter} alt="twitterIcon"/>
                <img id="instagramIcon" style={{marginLeft:'10px'}} class="snsIcon" src={insta} alt="instagramIcon"/><br/><br/>
            </div>
            <h id="copyright">©2022 by 커넥트빌 produced by 상민경조</h>
        </div>
    );
}

export default Footer;