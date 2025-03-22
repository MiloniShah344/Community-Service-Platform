import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section contact-info">
          <h2>Contact Us</h2>
          <p><strong>Email:</strong> support@connectinggoodness.org</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Address:</strong> 45 Community Road, Ahmedabad, Gujarat, India</p>
          <p><strong>Website:</strong> <a href="https://www.connectinggoodness.org" target="_blank" rel="noopener noreferrer">www.connectinggoodness.org</a></p>
        </div>

        <div className="footer-section quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/projects">Our Initiatives</a></li>
            <li><a href="/events">Upcoming Events</a></li>
            <li><a href="/volunteer">Volunteer With Us</a></li>
            <li><a href="/donate">Make a Donation</a></li>
            <li><a href="/testimonials">Testimonials</a></li>
          </ul>
        </div>

        <div className="footer-section social-media">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://facebook.com/connectinggoodness" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
            <a href="https://twitter.com/connectinggood" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com/connectinggoodness" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com/company/connectinggoodness" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
        </div>

        <div className="footer-section newsletter">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest events and volunteer opportunities.</p>
          <form>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Connecting Goodness. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
