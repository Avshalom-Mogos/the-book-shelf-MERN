import React, { Component } from 'react';
import axios from "axios";
import CartItem from './CartItem';
import OrderSummary from "./OrderSummary"
import { Container, Col, Row, Badge } from 'react-bootstrap';
import BookLoader from "./BookLoader"
import "./CSS/Cart.css";

export default class Cart extends Component {

    state = { items: [],
         showOrderSummary: false,
          showSpinner: false,
           showEmptyMessage: false,   
        }

    render() {

        return (
            <div className="Cart">
               {this.state.showOrderSummary ? <div className="Cart-dimBackground"></div>:""}
                {this.state.showOrderSummary ? <OrderSummary items={this.state.items} close={this.closeOrder} getAllCartDataFromDB={this.getAllCartDataFromDB} /> : ""}
                <h1 className="text-info text-center">My Cart</h1>
                <Container>
                    {this.state.showEmptyMessage ? <h2 className="Cart-emptyMessage">The cart is Empty</h2> : ""}
                    {this.state.showSpinner ? <BookLoader /> : ""}
                    <Row className="d-flex">
                        <Col className="Cart-container flex-grow-1">
                            <Row>
                                <Col>
                                    {
                                        this.state.items.map((book, index) => {
                                            return (
                                                <CartItem key={index} book={book} update={this.getAllCartDataFromDB} />
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        </Col>
                        {this.checkOutDisplay()}
                    </Row>
                </Container>
            </div>
        )
    }

    checkOutDisplay = () => {
        if (!this.state.showSpinner) {
            return (
                <div className="Cart-checkOut">
                    <h5> <i className="fas fa-book"></i> All Books: <Badge pill variant="info">{this.state.items.length}</Badge></h5>
                    <h5>Total: {this.state.items.reduce((total, book) => {
                        return total + book.saleInfo.listPrice.amount
                    }, 0)} ILS</h5>
                    {this.state.items.length === 0 ? <button style={{ marginBottom: "10px", opacity: 0.5 }} className="btn-lg">CHECKOUT</button> :
                        <button onClick={() => this.setState({ showOrderSummary: true })} style={{ marginBottom: "10px" }} className="btn btn-lg">CHECKOUT</button>}
                </div>
            )
        }
    }


    componentDidMount() {
        this.setState({ showSpinner: true })
        this.getAllCartDataFromDB();
    }

    getAllCartDataFromDB = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.get(`/cart/${user._id}`)
            .then((res) => {
                this.setState({ showSpinner: false })

                //show cart is empty msg
                if (res.data.length === 0) {
                    this.setState({ showEmptyMessage: true })
                }
                // console.log(res.data);

                // update myCart in Session storage
                user.myCart = [...res.data]
                let updatedUser = JSON.stringify(user)
                sessionStorage.setItem("theBookShelf_user_login", updatedUser);

                this.setState({ items: res.data })


                //update user info on App.js
                this.props.triggerLogin()
            })
    }



    closeOrder = () => {
        this.setState({ showOrderSummary: false })
    }
}

