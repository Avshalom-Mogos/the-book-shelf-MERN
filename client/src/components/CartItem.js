import React, { Component } from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import axios from "axios"


export default class cartItem extends Component {

    deleteBook = () => {

        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.delete(`cart/delete/${user._id}/${this.props.book.id}`)
            .then(res => this.props.update())
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        
        const book = this.props.book;
        return (
            <Container className="container" style={{ marginTop: "10px" }}>
                <Row className="row">
                    <Col className="col-sm" style={{ fontWeight: "bold", textAlign: "center" }}>
                        <img style={{ marginTop: "10px" }} src={book.volumeInfo.imageLinks.thumbnail} alt={"imgBook"} />
                    </Col>
                    <Col className="col-sm">
                        <p>{book.volumeInfo.title}</p>
                    </Col>
                    <Col className="col-sm">
                        {<button onClick={this.deleteBook} style={{ marginTop: "10px" }} className="btn btn-primary">Remove from cart</button>}
                    </Col>
                </Row>
            </Container>
        )
    }
}