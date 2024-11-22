// components/Testimonials.jsx
import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import "./Testimonials.scss";

function Testimonials() {
  const testimonials = [
    {
      company: "Simpler",
      text: "TinyPNG's robust API has allowed us to scale our image optimization with ease. The difference in load times is remarkable!",
      author: "John Smith",
      position: "Frontend Developer"
    },
    {
      company: "StartFast",
      text: "We integrated TinyPNG into our workflow and saw immediate improvements in our website's performance across all devices.",
      author: "Sarah Johnson",
      position: "Tech Lead"
    },
    {
      company: "TUL",
      text: "The compression quality is outstanding. We've reduced our image sizes by 70% without any noticeable quality loss.",
      author: "Michael Wang",
      position: "Product Manager"
    }
  ];

  return (
    <section className="testimonials-section py-5">
      <Container>
        <h2 className="text-center mb-5">What our customers say</h2>
        <Row>
          {testimonials.map((testimonial, index) => (
            <Col md={4} key={index}>
              <Card className="testimonial-card h-100">
                <Card.Body>
                  <div className="company-name mb-3">{testimonial.company}</div>
                  <Card.Text className="mb-4">{testimonial.text}</Card.Text>
                  <div className="testimonial-author">
                    <div className="avatar-placeholder"></div>
                    <div>
                      <h6 className="mb-0">{testimonial.author}</h6>
                      <small className="text-muted">{testimonial.position}</small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Testimonials;