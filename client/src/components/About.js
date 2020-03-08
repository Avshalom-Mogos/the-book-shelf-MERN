import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'
import './CSS/About.css';

export const About = () => {

    return (
        <div className="about-container">
            <Container>
                <Row>
                    <Col sm={6}>
                        <div className="about-card">
                            <div className="card-image-ardato">
                            </div>
                            <div className="card-details">
                                <h1>Ardato belay</h1>
                                <h2>Full Stack Web Developer</h2>
                            </div>
                            <div className="social-links">
                                <a href="https://il.linkedin.com/in/ardato-belay-141606194" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
                                <a href="https://github.com/ardato" rel="noopener noreferrer" target="_blank"><i className="fab fa-github-square"></i></a>
                                <a href="mailto:example@gmail.com" rel="noopener noreferrer" target="_blank"><i className="fas fa-envelope-square" rel="noopener noreferrer" target="_blank"></i></a>
                            </div>
                        </div>
                    </Col>
                    <Col sm={6}>
                        <div className="about-card">
                            <div className="card-image-avshalom">
                            </div>
                            <div className="card-details">
                                <h1>Avshalom Mogos</h1>
                                <h2>Full Stack Web Developer</h2>
                            </div>
                            <div className="social-links">
                                <a href="https://www.linkedin.com/in/avshalom-mogos-a43584198" rel="noopener noreferrer" target="_blank"><i className="fab fa-linkedin"></i></a>
                                <a href="https://github.com/Avshalom-Mogos" rel="noopener noreferrer" target="_blank"><i className="fab fa-github-square"></i></a>
                                <a href="mailto:avshalomogos@gmail.com" rel="noopener noreferrer" target="_blank"><i className="fas fa-envelope-square" rel="noopener noreferrer" target="_blank"></i></a>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About;
