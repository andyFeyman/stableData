// components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import "./Footer.scss";

function Footer() {
  return (
    <footer className="footer py-5 bg-dark text-light">
      <Container>
        <Row className="mb-4">
          <Col lg={3}>
            <h5>Help</h5>
            <ul className="list-unstyled">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#api">API Documentation</a></li>
              <li><a href="#support">Support</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </Col>
          <Col lg={3}>
            <h5>Products</h5>
            <ul className="list-unstyled">
              <li><a href="#compress">Compress Images</a></li>
              <li><a href="#api">Developer API</a></li>
              <li><a href="#plugins">Plugins</a></li>
              <li><a href="#apps">Desktop Apps</a></li>
            </ul>
          </Col>
          <Col lg={3}>
            <h5>Company</h5>
            <ul className="list-unstyled">
              <li><a href="#about">About Us</a></li>
              <li><a href="#blog">Blog</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press Kit</a></li>
            </ul>
          </Col>
          <Col lg={3}>
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#cookie">Cookie Policy</a></li>
              <li><a href="#gdpr">GDPR</a></li>
            </ul>
          </Col>
        </Row>
        <div className="footer-bottom pt-4 mt-4 border-top border-secondary">
          <Row className="align-items-center">
            <Col md={6}>
              <p className="mb-0">© 2024 TinyPNG. All rights reserved.</p>
            </Col>
            <Col md={6}>
              <div className="social-links text-md-end">
                <a href="#twitter" className="me-3">Twitter</a>
                <a href="#facebook" className="me-3">Facebook</a>
                <a href="#linkedin" className="me-3">LinkedIn</a>
                <a href="#github">GitHub</a>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;