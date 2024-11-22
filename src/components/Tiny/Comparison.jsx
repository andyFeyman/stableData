// components/Comparison.jsx
import React, { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import "./comparison.scss";

function Comparison() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <section className="comparison-section py-5">
      <Container>
        <h2 className="text-center mb-4">Can you tell the difference?</h2>
        <p className="text-center mb-5">The file is reduced by more than 70%</p>
        
        <div className="comparison-wrapper position-relative">
          <div className="comparison-slider" 
               style={{clipPath: `inset(0 ${100-sliderValue}% 0 0)`}}>
            <img src="[before-image-placeholder]" alt="Before compression" 
                 className="w-100" />
          </div>
          <img src="[after-image-placeholder]" alt="After compression" 
               className="w-100 position-absolute top-0 start-0" />
          
          <Form.Range
            value={sliderValue}
            onChange={(e) => setSliderValue(e.target.value)}
            className="position-absolute top-50 start-0 w-100"
          />
        </div>
        
        <div className="d-flex justify-content-between mt-3">
          <span>Original: 1.2MB</span>
          <span>Compressed: 348KB</span>
        </div>
      </Container>
    </section>
  );
}

export default Comparison;