import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-tiles">
          <div className="footer-tile">
            <h3 className="footer-tile-title">About Us</h3>
            <ul className="footer-tile-list">
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="footer-tile">
            <h3 className="footer-tile-title">Products</h3>
            <ul className="footer-tile-list">
              <li>Rooms</li>
              <li>Amenities</li>
              <li>Gallery</li>
            </ul>
          </div>
          <div className="footer-tile">
            <h3 className="footer-tile-title">Resources</h3>
            <ul className="footer-tile-list">
              <li>Blog</li>
              <li>FAQ</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>
        <p className="footer-text">© 2023 HotelWeb. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
