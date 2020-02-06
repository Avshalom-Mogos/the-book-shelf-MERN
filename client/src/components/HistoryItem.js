import React, { Component } from 'react'
import { Row, Col } from "react-bootstrap"
import "./CSS/HistoryItem.css"


export default class HistoryItem extends Component {
    render() {
        const book = this.props.book;
        return (
                <Row className="HistoryItem">
                    <Col className="Col" sm={4} >
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                    </Col>
                    <Col  className="Col" sm={4} >
                        <p>{book.volumeInfo.title}</p>
                    </Col>
                    <Col  className="Col" sm={4} >
                        <p>{book.dateOfPurchase}</p>
                    </Col>
                </Row>
        )
    }
   
}
