import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import axios from "axios";
import "./CartItem.css";


const CartItem = (props) => {

    const book = props.book;

    const deleteBook = () => {
        const user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.delete(`cart/${user._id}/${props.book.id}`)
            .then(res => props.update())
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <div className="CartItem">
            <Container>
                <Row className="text-center">
                    <Col className="col-cart-item" md={3}>
                        <img className="CartItem-img" src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                    </Col>
                    <Col className="col-cart-item" md={3}>
                        <strong><p>{book.volumeInfo.title}</p></strong>
                        <p className="CartItem-description">{book.volumeInfo.description}</p>
                    </Col>
                    <Col className="col-cart-item CartItem-price">{book.saleInfo.listPrice.amount.toFixed(2)}ILS</Col>
                    <Col className="col-cart-item" md={3} >
                        <button className="CartItem-deleteButton" onClick={deleteBook}>Remove</button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default CartItem;