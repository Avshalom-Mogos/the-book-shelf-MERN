import React, { Component } from 'react'
import axios from "axios";
import BookCard from './BookCard';
import "./CSS/Search.css"
import { Container, Col, Row, Spinner, Accordion, Toast, Dropdown, Card } from 'react-bootstrap';



export default class Search extends Component {

    state = {
        books: [],
        showSpinner: true,
        showToast: false,
        listToDisplay: [],
        categories: "categories"
    };
    searchParam = this.props.match.params.searchParam;
    toastMsg = "";

    render() {

        return (
            <div className="Search">
                {this.state.showToast ? this.Toast() : ""}
                <Container fluid>
                    {
                        this.state.showSpinner ?
                            <Spinner animation="border" className="Search-spinner" variant="warning" />
                            : <div className="Search-resultsNum">
                                <h3>{`${this.state.listToDisplay.length} results for "${this.searchParam}":`}</h3>
                            </div>
                    }
                    <Row>
                        <Col lg={3} md={12} style={{ marginTop: "20px" }}>
                            <Accordion style={{ padding: "0px 15px" }}>
                                <Card>
                                    <Accordion.Toggle className="Search-accordion-header" as={Card.Header} eventKey="0">
                                        {this.state.categories}
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div>
                                            {this.FilterButtons()}
                                        </div>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion >
                        </Col>
                        <Col>
                            <Row style={{ marginTop: "20px" }}>


                                {this.state.listToDisplay.map((book, index) => {
                                    return (
                                        <Col key={index} sm="6" md="3" lg="3">
                                            <BookCard book={book}
                                                Toast={this.ToastDisplay}
                                                triggerLogin={this.props.triggerLogin}
                                                moreDetails={this.props.moreDetails}
                                            />
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }


    FilterButtons = () => {

        const booksBtnsObj = {};
        const btns = this.state.books.map((book, index) => {

            // let categories = book.volumeInfo.categories;
            if (book.volumeInfo.categories) {

                if (!booksBtnsObj[book.volumeInfo.categories]) {

                    booksBtnsObj[book.volumeInfo.categories] = book.volumeInfo.categories[0];
                    return <Dropdown.Item
                        className={
                            booksBtnsObj[book.volumeInfo.categories] === this.state.categories ?
                                "Search-accordion-item Search-accordion-item-selected"
                                : "Search-accordion-item"
                        }


                        key={index} variant="primary"
                        onClick={() => {
                            //filter search results
                            let tmpArr = this.state.books.filter((bookFilter) => {
                                if (bookFilter.volumeInfo.categories) {
                                    return bookFilter.volumeInfo.categories[0] === booksBtnsObj[book.volumeInfo.categories]
                                }
                            })
                            console.log(tmpArr);
                            this.setState({ listToDisplay: [...tmpArr], categories: booksBtnsObj[book.volumeInfo.categories] })
                        }}
                    >{booksBtnsObj[book.volumeInfo.categories]}</Dropdown.Item>
                }
            }
        })
        return btns
    }


    ToastDisplay = (msg) => {

        this.toastMsg = msg;
        this.setState({ showToast: true })
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
                let fullDataArr = [...res.data.items]
                fullDataArr.forEach((book, index) => {
                    this.addMissingDetails(fullDataArr, index)
                });
                console.log(fullDataArr);
                console.log(res.data.items);
                this.setState({ books: fullDataArr, showSpinner: false, listToDisplay: fullDataArr })
            })
    }

    addMissingDetails = (fullDataArr, index) => {


        if (!fullDataArr[index].saleInfo.listPrice) {

            let randPrice = Math.floor(Math.random() * (70 - 20 + 1)) + 20
            fullDataArr[index].saleInfo.listPrice = { amount: 0 };
            fullDataArr[index].saleInfo.listPrice.amount = randPrice;
        }

        if (!fullDataArr[index].volumeInfo.imageLinks) {

            let defaultSrc = "https://render.fineartamerica.com/images/rendered/default/print/5.875/8.000/break/images-medium-5/brown-closed-book-orensila.jpg"
            fullDataArr[index].volumeInfo.imageLinks = { thumbnail: "" };
            fullDataArr[index].volumeInfo.imageLinks.thumbnail = defaultSrc;
        }

        if (!fullDataArr[index].volumeInfo.authors) {

            let defaultAuthors = "Ardato Belay";
            fullDataArr[index].volumeInfo.authors = [defaultAuthors];
        }

        if (!fullDataArr[index].volumeInfo.categories) {

            let defaultCategory = "General";
            fullDataArr[index].volumeInfo.categories = [defaultCategory];
        }

        if (!fullDataArr[index].rating) {

            let RandomRating = (Math.random() * 4 + 1).toFixed(1)
            fullDataArr[index].rating = RandomRating;
        }

        if (!fullDataArr[index].volumeInfo.description) {

            let defaultDescription = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";
            fullDataArr[index].volumeInfo.description = defaultDescription;
        }
    }

}







