import React, { Component } from 'react';
import axios from "axios";
import "./CSS/Cart.css";
import CartItem from './CartItem';

export default class Cart extends Component {

    state = { items: [] }

    render() {

        return (
            <div  className="Cart-container">
                <h1>My Cart</h1>
                <p >all items: {this.state.items.length}</p>


                {
                    this.state.items.map((book, index) => {
                        return (
                            <div key={index}>
                                <CartItem  book={book} update={this.getAllCartDataFromDB}/>
                               
                            </div>
                        )
                    })
                }
                 <button  className="btn" >CheckOut</button>
            </div>
        )
    }

    componentDidMount() {
      this.getAllCartDataFromDB()
    }

getAllCartDataFromDB =()=>{
    let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
    axios.post("/cart/get", { id: user._id })
        .then((res) => {
            console.log(res.data);

            // update myCart in Session storage
            user.myCart = [...res.data]
            let updatedUser = JSON.stringify(user)
            sessionStorage.setItem("theBookShelf_user_login",updatedUser);
            
            this.setState({ items: res.data })


             //update user info on App.js
            this.props.triggerLogin()
        })
}

}
