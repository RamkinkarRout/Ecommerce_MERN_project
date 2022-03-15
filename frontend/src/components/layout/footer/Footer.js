import React from "react";
import Appstore from "../../../images/Appstore.png";
import Playstore from "../../../images/playstore.png";
import logo from "../../../images/footerLogo.png";
import "./footer.css";
const Footer = () => {
  return (
    <footer id='footer'>
      <div className='leftFooter'>
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={Playstore} alt='Playstore' />
        <img src={Appstore} alt='Appstore' />
      </div>
      <div className='midFooter'>
        <img src={logo} alt='Amazon logo' />
        <p>Work Hard, Have Fun, Make History</p>

        <p>Copyright 2022 &copy; MeRamkinkar</p>
      </div>
      <div className='rightFooter'>
        <h4>FOLLOW US</h4>
        <a href='https://www.instagram.com/iamramkinkarrout/'>
          Instagram
        </a>
        <a href='https://github.com/RamkinkarRout'>
          Github
        </a>
        <a href='https://www.facebook.com/ramkinkar.rout'>
          Facebook
        </a>
      </div>
    </footer>
  );
};

export default Footer;
