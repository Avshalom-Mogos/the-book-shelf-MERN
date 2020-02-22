import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import axios from "axios";
import "./CSS/CartItem.css";


export default class cartItem extends Component {

    render() {

        const book = this.props.book;
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
                        <Col className="col-cart-item CartItem-price">{book.saleInfo.listPrice.amount} ILS</Col>
                        <Col className="col-cart-item" md={3} >
                            <button className="CartItem-deleteButton" onClick={this.deleteBook}>Remove</button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


    deleteBook = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.delete(`cart/${user._id}/${this.props.book.id}`)
            .then(res => this.props.update())
            .catch(err => {
                console.log(err);
            })
    }

}