import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const CustomJumbotron = (props) => {
  return (
    <div className="bg-primary text-light py-5 mb-0">
      <Container>
        <Row>
          <Col>
            <Card body className="bg-transparent border-0 text-center">
              <Card.Title as="h1" className="display-4" style={{transition:"0.8s",color:"white"}}>
                Welcome to Notesify
              </Card.Title>
              <Card.Text as="p" className="lead" style={{transition:"0.8s",color:"white"}}>
                A simple and elegant notes app
              </Card.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CustomJumbotron;
