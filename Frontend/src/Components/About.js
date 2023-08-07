import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import CustomJumbotron from './CustomJumbotron';
import '../About.css'; 

const About = (props) => {
  const theme=props.theme;
  return (
    <div className='container'>
      <CustomJumbotron theme={theme}/>

      <Container className="mt-5">
        <Row className="comp-fade-in-up">
          <Col md={6} className="mb-4">
            <h2 className="text-primary">About Notesify</h2>
            <p style={{color:theme==="light"?"black":"white",transition:"0.8s"}}>
              Notesify is a simple and elegant notes app built using the MERN
              stack (MongoDB, Express, React, Node.js). It allows you to create,
              read, update, and delete your notes securely. With Notesify, you
              can organize your thoughts, jot down ideas, and keep track of
              important information with ease.
            </p>
            <p style={{color:theme==="light"?"black":"white",transition:"0.8s"}}>
              This app provides a user-friendly interface that enables you to
              manage your notes effortlessly. Notesify ensures that each user's
              notes are safe and can only be accessed by the respective user
              after signing up and logging in.
            </p>
            <p style={{color:theme==="light"?"black":"white",transition:"0.8s"}}>
              Get started today with Notesify and experience the convenience of
              keeping your notes organized and accessible from anywhere,
              anytime.
            </p>
          </Col>
          <Col md={6} className="mb-4">
            <h2 className="text-primary">Key Features</h2>
            <ul>
              <li style={{color:theme==="light"?"black":"white",transition:"0.8s"}}>
                <i className="bi bi-check2-circle text-success me-2"></i>Simple
                and intuitive user interface
              </li>
              <li style={{color:theme==="light"?"black":"white",transition:"0.8s"}}>
                <i className="bi bi-check2-circle text-success me-2"></i>Create,
                edit, and delete notes with ease
              </li>
              <li style={{color:theme==="light"?"black":"white",transition:"0.8s"}}>
                <i className="bi bi-check2-circle text-success me-2"></i>
                Organize notes into categories or tags
              </li>
              <li style={{color:theme==="light"?"black":"white",transition:"0.8s"}}>
                <i className="bi bi-check2-circle text-success me-2"></i>
                Responsive design for all devices
              </li>
              <li style={{color:theme==="light"?"black":"white",transition:"0.8s"}}>
                <i className="bi bi-check2-circle text-success me-2"></i>
                Dark mode for a comfortable reading experience
              </li>
            </ul>
          </Col>
        </Row>
        <Row className="mt-5 comp-fade-in-up">
          <Col>
            <h2 className="text-primary">Contact Us</h2>
            <p style={{color:theme==="light"?"black":"white",transition:"0.8s"}}>
              If you have any questions, suggestions, or feedback, we'd love to
              hear from you. You can reach us at contact@notesifyapp.com or use
              the contact form on our website.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;
