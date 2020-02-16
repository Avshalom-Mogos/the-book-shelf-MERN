import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import axios from "axios";
export default class cartItem extends Component {

    render() {

        const book = this.props.book;
        return (
            <Container className="contianer">
            <Row className="text-center">
                <Col className="col-cart-item" md={3}>
                    <img className="cartitem-img" src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                </Col>
                <Col className="col-cart-item" md={3}>
                    <p>{book.volumeInfo.title}</p>
                    <p className="cartitem-description"> {book.volumeInfo.description}</p>
                </Col>
              <Col className="col-cart-item">{book.saleInfo.listPrice.amount}ILS</Col>
                <Col className="col-cart-item" md={3} >
                    {/* {< i onClick={this.deleteBook} className="fas fa-trash btn"></i>} */}
                    <button className="deleteButton" onClick={this.deleteBook} >Remove</button>
                </Col>
            </Row>
            </Container>
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