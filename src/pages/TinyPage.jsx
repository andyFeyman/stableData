// App.jsx
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Hero from '../components/Tiny/Hero';
import Features from '../components/Tiny/Features';
import Comparison from '../components/Tiny/Comparison';
import Testimonials from '../components/Tiny/Testimonials';
import TrustedBy from '../components/Tiny/TrustedBy';
import FAQ from '../components/Tiny/FAQ';
import Calculator from '../components/Tiny/Calculator';
import Footer from '../components/Tiny/Footer';
import './TinyPage.scss';

function TinyPage() {
  return (
    <>
      <Navbar expand="lg" className="navbar-light">
        <Container>
          <Navbar.Brand href="#home">🐼 TinyPNG</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
              <Nav.Link href="#api">API</Nav.Link>
              <Nav.Link href="#developers">Developers</Nav.Link>
              <Nav.Link className="btn btn-dark">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Hero />
      <Features />
      <TrustedBy />
      <Comparison />
      <Calculator />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
}

export default TinyPage;


