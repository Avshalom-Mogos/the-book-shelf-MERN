import React, { useState, useEffect,useContext } from 'react';
import { Container, Col, Row, Accordion, Toast, Dropdown, Card } from 'react-bootstrap';
import BookCard from '../bookcard/BookCard';
import BookLoader from '../bookLoader/BookLoader';
import axios from "axios";
import "./Search.css";
import { StateContext } from "../../Contexts/StateContext";

const Search = (props) => {
    const { login } = useContext(StateContext);
    const searchParam = props.match.params.searchParam;
    const [toast, setToast] = useState({ show: false, msg: '' });
    const [books, setBooks] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [listToDisplay, setListToDisplay] = useState([]);
    const [categories, setCategories] = useState('categories');

    // state = {
    //     books: [],
    //     showLoader: false,
    //     showToast: false,
    //     listToDisplay: [],
    //     categories: "categories"
    // };

    const filterButtons = () => {

        const booksBtnsObj = {};
        const btns = books.map((book, index) => {

            if (book.volumeInfo.categories) {

                if (!booksBtnsObj[book.volumeInfo.categories]) {

                    booksBtnsObj[book.volumeInfo.categories] = book.volumeInfo.categories[0];
                    return <Dropdown.Item
                        key={index} variant="primary"
                        className={
                            booksBtnsObj[book.volumeInfo.categories] === categories ?
                                "Search-accordion-item Search-accordion-item-selected"
                                : "Search-accordion-item"
                        }
                        onClick={() => {
                            //filter search results
                            const tmpArr = books.filter((bookFilter) => {
                                if (bookFilter.volumeInfo.categories) {
                                    return bookFilter.volumeInfo.categories[0] === booksBtnsObj[book.volumeInfo.categories]
                                }
                                //handle no return value warning
                                return null
                            })
                            // this.setState({ listToDisplay: [...tmpArr], categories: booksBtnsObj[book.volumeInfo.categories] });
                            setListToDisplay([...tmpArr]);
                            setCategories(booksBtnsObj[book.volumeInfo.categories]);
                        }}
                    >{booksBtnsObj[book.volumeInfo.categories]}</Dropdown.Item>
                };
            };
            //handle no return value warning
            return null
        })
        return btns
    };


    const toastDisplay = (msg) => {
        setToast({ show: true, msg });
    };

    const toastEl = () => {
        return (
            <div className="Search-toast-container">
                <Toast className="Search-toast" autohide
                    delay={2500} animation
                    onClose={() => setToast({ ...toast, show: false })}>

                    <Toast.Header>
                        <i className="fas fa-book"></i>
                        <strong style={{ margin: "10px" }} className="mr-auto">The Book Shelf</strong>
                    </Toast.Header>
                    <Toast.Body>"<strong>{toast.msg}</strong>" was added to the cart!</Toast.Body>
                </Toast>
            </div>
        )
    };


    useEffect(() => {

        setShowLoader(true);
        //remove previous search results
        setListToDisplay([]);

        const url = `https://www.googleapis.com/books/v1/volumes?q=:${searchParam}&maxResults=40&projection=full&key=AIzaSyDhshslNH7uBtbjyb_AXtPz2vlYOFTF6pI`;
        axios.get(url)
            .then((res) => {

                const fullDataArr = [...res.data.items];
                fullDataArr.forEach((book, index) => addMissingDetails(fullDataArr, index));

                // this.setState({ books: fullDataArr, showLoader: false, listToDisplay: fullDataArr })

                setBooks(fullDataArr);
                setListToDisplay(fullDataArr);
                setShowLoader(false);
            })
            .catch((err) => console.log(err));

    }, [searchParam])

    const addMissingDetails = (fullDataArr, index) => {

        if (!fullDataArr[index].saleInfo.listPrice) {

            const randPrice = Math.floor(Math.random() * (70 - 20 + 1)) + 20
            fullDataArr[index].saleInfo.listPrice = { amount: 0 };
            fullDataArr[index].saleInfo.listPrice.amount = randPrice;
        };

        if (!fullDataArr[index].volumeInfo.imageLinks) {

            const defaultSrc = "https://render.fineartamerica.com/images/rendered/default/print/5.875/8.000/break/images-medium-5/brown-closed-book-orensila.jpg"
            fullDataArr[index].volumeInfo.imageLinks = { thumbnail: "" };
            fullDataArr[index].volumeInfo.imageLinks.thumbnail = defaultSrc;
        };

        if (!fullDataArr[index].volumeInfo.authors) {

            const defaultAuthors = "Ardato Belay";
            fullDataArr[index].volumeInfo.authors = [defaultAuthors];
        };

        if (!fullDataArr[index].volumeInfo.categories) {

            const defaultCategory = "General";
            fullDataArr[index].volumeInfo.categories = [defaultCategory];
        };

        if (!fullDataArr[index].rating) {

            const RandomRating = (Math.random() * 4 + 1).toFixed(1)
            fullDataArr[index].rating = RandomRating;
        };

        if (!fullDataArr[index].volumeInfo.description) {

            const defaultDescription = " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
            fullDataArr[index].volumeInfo.description = defaultDescription;

        };
    };

    const display = () => {

        // let searchParam = this.props.match.params.searchParam;
        try {
            decodeURIComponent(searchParam)
        } catch (err) {
            return searchParam
        }
        return decodeURIComponent(searchParam);
    };

    return (
        <div className="Search">

            {toast.show && toastEl()}
            <Container fluid>
                {
                    showLoader ?
                        <BookLoader />
                        : <div className="Search-resultsNum">
                            <h4 className="text-info">{`${listToDisplay.length} results for "${display()}":`}</h4>
                        </div>
                }
                <Row>
                    {
                        !showLoader ?
                            <Col lg={3} md={12} style={{ marginTop: "20px" }}>
                                <Accordion style={{ padding: "0px 15px" }}>
                                    <Card>
                                        <Accordion.Toggle className="Search-accordion-header" as={Card.Header} eventKey="0">
                                            {categories}
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey="0">
                                            <div>
                                                {filterButtons()}
                                            </div>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion >
                            </Col> : ""
                    }
                    <Col>
                        <Row style={{ marginTop: "20px" }}>

                            {listToDisplay.map((book, index) => {
                                return (
                                    <Col key={index} sm="6" md="4" lg="4">
                                        <BookCard book={book}
                                            Toast={toastDisplay}
                                            triggerLogin={login}
                                            moreDetails={props.moreDetails}
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
};
export default Search;