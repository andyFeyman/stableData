// components/Features.jsx
import React from 'react';
import { Container, Card } from 'react-bootstrap';
import "./features.scss";

function Features() {
  const features = [
    {
      icon: "🌱",
      title: "Save disk space",
      description: "Your files and pictures automatically get smaller, freeing up valuable storage space on your servers or device storage."
    },
    {
      icon: "⚡",
      title: "Easy API",
      description: "Power up your website with a fully-featured API. Make your website blazing fast by reducing the size of your images."
    },
    {
      icon: "💜",
      title: "API Integration",
      description: "Integrate using our plugins or create your own integration. We support WordPress, Magento, and more."
    },
    {
      icon: "🔌",
      title: "WordPress Plugin",
      description: "Install our WordPress plugin and compress new images automatically. Existing images can be compressed with one click."
    }
  ];

  return (
    <section className="features-section py-5">
      <Container>
        <h2 className="text-center mb-5">Optimization for each project</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 h-100">
              <Card.Body>
                <div className="feature-icon mb-3">{feature.icon}</div>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Text>{feature.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default Features;