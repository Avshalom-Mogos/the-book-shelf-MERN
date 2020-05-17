import React, { Component } from 'react'
import { Container, Col, Row, Accordion, Toast, Dropdown, Card } from 'react-bootstrap';
import axios from "axios";
import BookCard from '../bookcard/BookCard';
import BookLoader from '../bookLoader/BookLoader';
import "./Search.css";


export default class Search extends Component {

    searchParam = this.props.match.params.searchParam;
    toastMsg = "";

    state = {
        books: [],
        showLoader: false,
        showToast: false,
        listToDisplay: [],
        categories: "categories"
    };

    render() {

        return (
            <div className="Search">

                {this.state.showToast ? this.toast() : ""}
                <Container fluid>
                    {
                        this.state.showLoader ?
                            <BookLoader />
                            : <div className="Search-resultsNum">
                                <h4 className="text-info">{`${this.state.listToDisplay.length} results for "${this.display()}":`}</h4>
                            </div>
                    }
                    <Row>
                        {
                            !this.state.showLoader ?
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
                                </Col> : ""
                        }
                        <Col>
                            <Row style={{ marginTop: "20px" }}>


                                {this.state.listToDisplay.map((book, index) => {
                                    return (
                                        <Col key={index} sm="6" md="4" lg="4">
                                            <BookCard book={book}
                                                Toast={this.toastDisplay}
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
                                //handle no return value warning
                                return null
                            })
                            this.setState({ listToDisplay: [...tmpArr], categories: booksBtnsObj[book.volumeInfo.categories] })
                        }}
                    >{booksBtnsObj[book.volumeInfo.categories]}</Dropdown.Item>
                }
            }
            //handle no return value warning
            return null
        })
        return btns
    }


    toastDisplay = (msg) => {

        this.toastMsg = msg;
        this.setState({ showToast: true })
    }

    toast = () => {
        return (
            <div className="Search-toast-container">
                <Toast className="Search-toast" autohide
                    delay={2500} animation
                    onClose={() => this.setState({ showToast: false })}>

                    <Toast.Header>
                        <i className="fas fa-book"></i>
                        <strong style={{ margin: "10px" }} className="mr-auto">The Book Shelf</strong>
                    </Toast.Header>
                    <Toast.Body>"<strong>{this.toastMsg}</strong>" was added to the cart!</Toast.Body>
                </Toast>
            </div>
        )
    }

    componentDidMount() { this.getBooks(this.searchParam); }

    componentDidUpdate(prevProps) {
        prevProps = prevProps.match.params.searchParam;
        let currentProps = this.props.match.params.searchParam;

        //get new books on search params change
        if (currentProps !== prevProps) {
            this.getBooks(currentProps);
        }
    }

    getBooks = (query) => {

        // show loader and clear book list
        this.setState({ showLoader: true, listToDisplay: [] })

        let url = `https://www.googleapis.com/books/v1/volumes?q=:${query}&maxResults=40&projection=full&key=AIzaSyDhshslNH7uBtbjyb_AXtPz2vlYOFTF6pI`;
        axios.get(url)
            .then((res) => {

                let fullDataArr = [...res.data.items]
                fullDataArr.forEach((book, index) => {
                    this.addMissingDetails(fullDataArr, index)
                });

                this.setState({ books: fullDataArr, showLoader: false, listToDisplay: fullDataArr })
            })
            .catch((err) => console.log(err));
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

            let defaultDescription = " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
            fullDataArr[index].volumeInfo.description = defaultDescription;

        }
    }

    display = () => {

        let searchParam = this.props.match.params.searchParam;
        try {
            decodeURIComponent(searchParam)
        } catch (err) {
            return searchParam
        }
        return decodeURIComponent(searchParam);
    }

}







