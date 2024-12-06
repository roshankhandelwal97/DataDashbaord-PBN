import React from 'react';
import '../styles/Footer.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn'; // Material-UI LinkedIn Icon
import GitHubIcon from '@mui/icons-material/GitHub'; // Material-UI GitHub Icon

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <a
          href="https://www.linkedin.com/in/rokhande/"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <LinkedInIcon className="footer-icon" /> LinkedIn
        </a>
      </div>
      <p className="footer-text">Developed by Roshan Khandelwal</p>
      <div className="footer-right">
        <a
          href="https://github.com/roshankhandelwal97"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          <GitHubIcon className="footer-icon" /> GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
