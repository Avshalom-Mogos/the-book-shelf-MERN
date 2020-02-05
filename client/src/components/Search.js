import React, { Component } from 'react'
import axios from "axios";
import BookCard from './BookCard';
import "./CSS/Search.css"
import { Container, Col, Row, Spinner, ButtonToolbar, Button } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast'


export default class Search extends Component {

    state = { books: [], showSpinner: true, showToast: false, listToDisplay: [] };
    searchParam = this.props.match.params.searchParam;
    toastMsg = "";

    render() {

        return (
            <div className="Search">
                <Container>
                    {
                        this.state.showSpinner ?
                            <Spinner animation="border" className="Search-spinner" variant="warning" />
                            : <div>
                                <h3>{`${this.state.listToDisplay.length} results for "${this.searchParam}":`}</h3>
                                <ButtonToolbar style={{ border: "3px outset lightgrey" }}>
                                    {this.FilterButtons()}
                                </ButtonToolbar>
                            </div>
                    }
                    {this.state.showToast ? this.Toast() : ""}

                    <Row style={{ marginTop: "20px" }}>

                        {
                            this.state.listToDisplay.map((book, index) => {
                                // console.log(book.volumeInfo.book.volumeInfo.categories);

                                return (
                                    <Col key={index} sm="6" md="4" lg="3">
                                        <BookCard book={book}
                                            Toast={this.ToastDisplay}
                                            triggerLogin={this.props.triggerLogin}
                                        />
                                    </Col>
                                )
                            })
                        }

                    </Row>
                </Container>
            </div>
        )
    }

    //
    ToastDisplay = (msg) => {

        this.toastMsg = msg;
        this.setState({ showToast: true })
    }

    FilterButtons = () => {

        const booksBtnsObj = {};
        const btns = this.state.books.map((book, index) => {

            // let categories = book.volumeInfo.categories;
            if (book.volumeInfo.categories) {

                if (!booksBtnsObj[book.volumeInfo.categories]) {

                    booksBtnsObj[book.volumeInfo.categories] = book.volumeInfo.categories[0];
                    return <Button key={index} variant="primary"
                        onClick={() => {
                            //filter search results
                            let tmpArr = this.state.books.filter((bookFilter) => {
                                if (bookFilter.volumeInfo.categories) {
                                    return bookFilter.volumeInfo.categories[0] === booksBtnsObj[book.volumeInfo.categories]
                                }
                            })

                            console.log(tmpArr);

                            this.setState({ listToDisplay: [...tmpArr] })
                            //
                        }}
                    >{booksBtnsObj[book.volumeInfo.categories]}</Button>
                }
                // console.log(book.volumeInfo.book.volumeInfo.categories);
            }
        })
        return btns
    }

    Toast = () => {
        return (
            <div className="Search-toast-container">
                <Toast className="Search-toast" autohide
                    delay={3000} animation
                    onClose={() => this.setState({ showToast: false })}>
                    <Toast.Header>
                        <img src="" className="rounded mr-2" alt="brandImg" />
                        <strong className="mr-auto">The Book Shelf</strong>
                    </Toast.Header>
                    <Toast.Body>"<strong>{this.toastMsg}</strong>" was added to the cart!</Toast.Body>
                </Toast>
            </div>

        )
    }

    componentDidMount() {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=:${this.searchParam}&maxResults=40&projection=full&key=AIzaSyDhshslNH7uBtbjyb_AXtPz2vlYOFTF6pI`)
            .then((res) => {
                this.setState({ books: res.data.items, showSpinner: false, listToDisplay: res.data.items })
                console.log(res.data.items);

            })
    }
}







