import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

export default class About extends Component {
    style = {

        height: "100%",
        width: "100%"
    }
    render() {
        return (
            <div>

                <Container>
                    <br />
                    <h1 style={{ textAlign: "center" }}>About Us</h1>
                    <br />
                    <br />
                    <Row>
                        <Col sm={5}>
                            <img style={this.style} src="data:image/jpeg;base64,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" alt="aboutPic" />
                        </Col>
                        <Col sm={7}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                               It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                               It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            orem Ipsum is simply dummy text of the printing and typesetting industry.
                             Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                              when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                               It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                               It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                            orem Ipsum is simply dummy text of the printing and typesetting industry.
                  </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
