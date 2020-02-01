import React, { Component } from 'react'
import { Row, Col } from "react-bootstrap"
import "./CSS/HistoryItem.css"


export default class HistoryItem extends Component {
    render() {
        const book = this.props.book;
        return (
                <Row className="HistoryItem">
                    <Col sm={4} style={this.style}>
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                    </Col>
                    <Col sm={4} style={this.style}>
                        <p>{book.volumeInfo.title}</p>
                    </Col>
                    <Col sm={4} style={this.style}>
                        <p>{book.dateOfPurchase}</p>
                    </Col>
                </Row>
        )
    }
    style = {
        border: "1px solid red",
      
    }
}
