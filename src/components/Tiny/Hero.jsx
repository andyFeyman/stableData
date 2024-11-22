// components/Hero.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Hero() {
  return (
    <section className="hero-section">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1>Smart WebP, PNG and JPEG Compression for Faster Websites</h1>
            <p className="lead">Optimize your images for the web with our smart lossy compression algorithm.</p>
            <button className="btn btn-success btn-lg">Get Started Free</button>
          </Col>
          <Col md={6} className="text-center">
            <img src="[panda-placeholder]" alt="Panda Mascot" className="panda-mascot" />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;