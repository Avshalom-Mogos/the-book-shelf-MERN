import React, { Component } from 'react'
import axios from "axios";
import BookCard from './BookCard';
import "./CSS/Search.css"
import { Container, Col, Row, Spinner } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast'


export default class Search extends Component {

    state = { books: [], showSpinner: true, showToast: false };
    searchParam = this.props.match.params.searchParam;
    msg = "";

    render() {


        return (
            <Container style={{ marginTop: "20px" }}>
                {
                    this.state.showToast ? this.Toast() : ""
                }

                {
                    this.state.showSpinner ?
                        <Spinner animation="border" className="d-flex" style={this.spinnerStyle} variant="warning" />
                        : <h3>{`${this.state.books.length} results for ${this.searchParam}:`}</h3>
                }
                <Row style={{ marginTop: "20px" }}>

                    {
                        this.state.books.map((book, index) => {
                            return (
                                <Col key={index} sm="6" md="4" lg="3">
                                    <BookCard book={book} Toast={this.ToastDisplay} />

                                </Col>
                            )
                        })
                    }

                </Row>

            </Container>
        )
    }

    //
    ToastDisplay = (msg) => {

        this.msg = msg;
        let that = this
        this.setState({ showToast: true })
        //hide after 3 sec
        setTimeout(function () {
            that.setState({ showToast: false })
        }, 3000);
    }

    Toast = () => {
        return (

            <Toast style={this.ToastStyle} onClose={() => this.setState({ showToast: false })}>
                <Toast.Header>
                    <img src="" className="rounded mr-2" alt="" />
                    <strong className="mr-auto">The Book Shelf</strong>
                </Toast.Header>
                <Toast.Body>{this.msg}</Toast.Body>
            </Toast>

        )
    }

    ToastStyle = {
        position: "fixed",
        top: 0,
        zIndex: 1,
        margin: "auto auto"
    }


    //



    componentDidMount() {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=:${this.searchParam}&key=AIzaSyDhshslNH7uBtbjyb_AXtPz2vlYOFTF6pI`)
            .then((res) => {
                this.setState({ books: res.data.items, showSpinner: false })
                console.log(res.data.items);



            })
    }
    spinnerStyle = {
        width: "200px",
        height: "200px",
        margin: "auto auto",

    }

}







