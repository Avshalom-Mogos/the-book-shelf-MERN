import React, { Component } from 'react'
import "./CSS/OrderSummary.css"

export default class OrderSummary extends Component {



    render() {
        let items = this.props.items;


        return (
            <div className="OrderSummary">
                <p>order summary</p>
                {
                    this.props.items.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{item.volumeInfo.title} {item.saleInfo.listPrice.amount}.99</p>
                                <hr/>
                            </div>
                        )
                    })
                }
                <button>buy all</button>
                <button onClick={() => this.props.close()}>X</button>
            </div>
        )
    }



    addToPurchaseHistory = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        let newArr = [...user.purchaseHistory, ...this.state.items]
        // let newArr = [...this.state.items]
        // axios.post("/purchaseHistory", { id: user._id, newArr: user.purchaseHistory })
        //     .then((res) => console.log(res))
        //     .catch((err) => console.log("hello"))

    }
}
