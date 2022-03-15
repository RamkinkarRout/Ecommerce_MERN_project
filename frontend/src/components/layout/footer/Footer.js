import React from "react";
import Appstore from "../../../images/Appstore.png";
import Playstore from "../../../images/playstore.png";

const Footer = () => {
  return (
    <footer id='footer'>
      <div className='leftFooter'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={Playstore} alt='Playstore' />
        <img src={Appstore} alt='Appstore' />
      </div>
      <div className='midFooter'></div>
      <div className='rightFooter'></div>
    </footer>
  );
};

export default Footer;
