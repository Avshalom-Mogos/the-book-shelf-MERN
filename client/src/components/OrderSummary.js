import React, { Component } from "react"
import axios from "axios"
import "./CSS/OrderSummary.css"

export default class OrderSummary extends Component {



    render() {

        let items = this.props.items;
        return (
            <div className="OrderSummary">
                <p>Order summary</p>
                {
                    items.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{item.volumeInfo.title} {item.saleInfo.listPrice.amount}.99</p>
                                <hr />
                            </div>
                        )
                    })
                }
                <button onClick={this.addToPurchaseHistory}>buy all</button>
                <button onClick={() => this.props.close()}>X</button>
            </div>
        )
    }



    addToPurchaseHistory = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        let itemsArray = [...this.props.items];
        this.addDateStamp(itemsArray);

        axios.post("/purchaseHistory", { id: user._id, items: itemsArray })
            .then((res) => console.log(res))
            .catch((err) => console.log("hello"))

    }

    addDateStamp = (itemsArray) => {

        itemsArray.forEach(item => {
            item.dateOfPurchase = new Date().toDateString();
        });

    }
}
