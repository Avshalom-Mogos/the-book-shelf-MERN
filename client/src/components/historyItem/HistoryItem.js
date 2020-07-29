import React from 'react';
import { Row, Col, Container } from "react-bootstrap";
import "./HistoryItem.css";


const HistoryItem = ({ book }) => {
    return (
        <Container>
            <Row className="HistoryItem">
                <Col className="Col" sm={3} >
                    <img className="historyitem-img" src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                </Col>
                <Col className="Col" sm={3} >
                    <p>{book.volumeInfo.title}</p>
                    <p className="historyitem-description">{book.volumeInfo.description}</p>
                </Col>
                <Col className="Col">
                    <p>{book.saleInfo.listPrice.amount} ILS</p>
                </Col>
                <Col className="Col" sm={3} >
                    <p>{book.dateOfPurchase}</p>
                </Col>
            </Row>
        </Container>
    );
};
export default HistoryItem;