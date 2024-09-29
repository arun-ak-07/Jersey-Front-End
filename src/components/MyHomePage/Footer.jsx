import React from 'react'
import { Link } from 'react-router-dom'
import instaIcons from '../images/instagramIcons.png'
import fbIcons from '../images/facebookIcons.png'
import './Footer.css'

const Footer = () => {
  return (
    <div className="footerMy" >
        <div style={{ textAlign: 'center', color: 'black' }}><p style={{ fontSize: '20px', letterSpacing: '2px' }}>FOLLOW US</p></div>
        <div style={{ textAlign: 'center' }}><img className="footer-logoMy" src={fbIcons} alt="" /><img className="footer-logoMy" alt="" src={instaIcons} /></div><br />
        <div  className='FooterDiv1My'> <hr className='footerHr1My' /> </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div><p style={{ letterSpacing: '2px' }}>STORE DETAILS</p></div>
          <div><p style={{ fontWeight: 'bold' }}>Sports Jersey Hub</p></div>
          <div><p>Kochi, Kerala, India</p></div>
          <div className='footerDiv2My'> <hr className='footerHr2My' /> </div>
          <div><p style={{ letterSpacing: '1px' }}>QUICK LINKS</p></div>
          <div style={{marginBottom:'50px'}}><Link className="footer-linksMy">Help & Support</Link> <Link className="footer-linksMy">FAQs</Link> <Link className="footer-linksMy">Store Policy</Link></div>
        </div>
      </div>
  )
}

export default Footer
