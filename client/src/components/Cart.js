import React, { Component } from 'react';
import axios from "axios";
import "./CSS/Cart.css";
import CartItem from './CartItem';

export default class Cart extends Component {

    state = { items: [] }

    render() {

        return (
            <div className="Cart container">
                <h1>My Cart</h1>

                {
                    this.state.items.map((book,index) => {
                        return (
                            <div>
                               <CartItem key={index} book={book}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.post("/cart/get", { id: user._id })
            .then((res) => {
                console.log(res.data);

                this.setState({ items: res.data })
            })
    }



}
