// components/FAQ.jsx
import React from 'react';
import { Container, Accordion } from 'react-bootstrap';
import "./FAQ.scss";

function FAQ() {
  const faqItems = [
    {
      question: "Why should I compress images for my website?",
      answer: "Compressing images reduces file sizes without significantly impacting visual quality. This leads to faster loading times, better user experience, and improved SEO rankings."
    },
    {
      question: "Does TinyPNG support WebP images?",
      answer: "Yes, TinyPNG supports WebP compression along with PNG and JPEG formats. WebP typically provides even better compression rates while maintaining high quality."
    },
    {
      question: "What file formats does TinyPNG support?",
      answer: "TinyPNG supports PNG, JPEG, and WebP formats. We automatically choose the best compression method based on your image content."
    },
    {
      question: "Is the privacy of my images secured?",
      answer: "We take security seriously. All uploaded images are processed securely and automatically deleted after processing. We never share or store your images."
    },
    {
      question: "How much can I save with TinyPNG?",
      answer: "On average, our users see 50-80% reduction in file size while maintaining excellent visual quality. The exact savings depend on your specific images."
    }
  ];

  return (
    <section className="faq-section py-5">
      <Container>
        <h2 className="text-center mb-5">General</h2>
        <div className="faq-accordion">
          <Accordion>
            {faqItems.map((item, index) => (
              <Accordion.Item key={index} eventKey={index.toString()}>
                <Accordion.Header>{item.question}</Accordion.Header>
                <Accordion.Body>{item.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}

export default FAQ;