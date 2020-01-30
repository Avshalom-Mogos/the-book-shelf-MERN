import React, { Component } from 'react';
import axios from "axios";
import "./CSS/Cart.css";
import CartItem from './CartItem';
import OrderSummary from "./OrderSummary"
import { Container, Col, Row, Badge } from 'react-bootstrap';

export default class Cart extends Component {

    state = { items: [], showOrderSummary: false }

    prices = [];

    render() {


        return (
            <div className="Cart">

                {this.state.showOrderSummary ? <OrderSummary items={this.state.items} close={this.closeOrder} /> : ""}
                <Row className="d-flex">
                    <Col className="Cart-container flex-grow-1">
                        <Row>
                            <Col>
                                {
                                    this.state.items.map((book, index) => {
                                        return (
                                            <div key={index}>
                                                <CartItem book={book} update={this.getAllCartDataFromDB} />

                                            </div>
                                        )
                                    })
                                }
                            </Col>
                        </Row>
                    </Col>

                    <div  className="Cart-checkOut">

                        <h5> <i className="fas fa-book"></i>  all Books: <Badge>{this.state.items.length}</Badge></h5>
                        <h5>Total: {this.state.items.reduce((total, book) => {
                            return total + book.saleInfo.listPrice.amount
                        }, 0)} ILS</h5>
                        <button onClick={() => this.setState({ showOrderSummary: true })} style={{ marginBottom: "10px" }} className="btn  btn-lg ">CheckOut</button>
                    </div>
                </Row>
            </div>
            
        )
    }


    componentDidMount() {
        this.getAllCartDataFromDB();
    }

    getAllCartDataFromDB = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.get(`/cart/${user._id}`)
            .then((res) => {
                console.log(res.data);

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
