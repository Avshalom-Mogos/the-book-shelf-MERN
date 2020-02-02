import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from "axios";

export default class cartItem extends Component {

    render() {

        const book = this.props.book;
        return (
            <Row className="text-center">
                <Col ms={4} sm={12} >
                    <img style={{ marginBottom: "10px" }} src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                </Col>
                <Col ms={4} sm={12} >
                    <p>{book.volumeInfo.title}</p>
                </Col>
                <Col ms={4} sm={12}>
                    {< i onClick={this.deleteBook} className="fas fa-trash btn"></i>}
                </Col>
            </Row>
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