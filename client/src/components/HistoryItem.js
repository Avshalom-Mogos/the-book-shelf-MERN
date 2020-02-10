import React, { Component } from 'react'
import { Row, Col, Container } from "react-bootstrap"
import "./CSS/HistoryItem.css"


export default class HistoryItem extends Component {
    render() {
        const book = this.props.book;
        return (
            <Container> 
                <Row className="HistoryItem">
                    <Col className="Col" sm={3} >
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                    </Col>
                    <Col  className="Col" sm={3} >
                        <p>{book.volumeInfo.title}</p>
                    <p>{book.volumeInfo.description}</p>
                    </Col>
                    <Col className="Col">
                    <p>{book.saleInfo.listPrice.amount}ILS</p> 
                    </Col>
                    <Col  className="Col" sm={3} >
                        <p>{book.dateOfPurchase}</p>
                    </Col>

                </Row>
                </Container>
        )
    }
   
}
