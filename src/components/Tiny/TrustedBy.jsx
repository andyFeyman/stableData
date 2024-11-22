// components/TrustedBy.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import "./trusted-by.scss";

function TrustedBy() {
  const brands = ['Microsoft', 'Sony', 'Samsung', 'Hertz', 'Electronic Arts'];
  
  return (
    <section className="trusted-by-section py-5 bg-light">
      <Container>
        <h3 className="text-center mb-4">Trusted by thousands of companies around the world</h3>
        <div className="brand-grid">
          {brands.map((brand, index) => (
            <div key={index} className="brand-item">
              <div className="placeholder-logo">{brand}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TrustedBy;