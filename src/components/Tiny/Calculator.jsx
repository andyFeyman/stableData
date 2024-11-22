// components/Calculator.jsx
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import "./calculator.scss";

function Calculator() {
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleCalculate = (e) => {
    e.preventDefault();
    // 处理计算逻辑
    console.log('Calculating for:', websiteUrl);
  };

  return (
    <section className="calculator-section py-5 bg-dark text-white">
      <Container>
        <h2 className="text-center mb-4">Discover how much TinyPNG can</h2>
        <div className="calculator-form mx-auto" style={{maxWidth: '600px'}}>
          <Form onSubmit={handleCalculate}>
            <div className="input-group">
              <Form.Control
                type="url"
                placeholder="https://your-website-url"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                required
              />
              <Button variant="success" type="submit">
                Calculate Savings
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </section>
  );
}

export default Calculator;