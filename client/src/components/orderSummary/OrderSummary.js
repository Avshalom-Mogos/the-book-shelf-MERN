import React from "react";
import axios from "axios";
import "./OrderSummary.css";


const OrderSummary = (props) => {

    const { items, close, getAllCartDataFromDB } = props;

    const addToPurchaseHistory = () => {
        const user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        const itemsArray = [...items];
        addDateStamp(itemsArray);
        axios.post("/purchaseHistory", { id: user._id, items: itemsArray })
            .then((res) => deleteAlldataFromCart())

            .catch((err) => console.log(err))
    };

    const deleteAlldataFromCart = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.delete(`cart/${user._id}`)
            .then(res => {
                alert("Thank you for your purchase!");
                //close popup
                close();
            })
            .catch(err => {
                console.log(err);
            })

        getAllCartDataFromDB()
    };

    const addDateStamp = (itemsArray) => {

        itemsArray.forEach(item => {
            item.dateOfPurchase = new Date().toDateString();
        });
    };

    return (
        <div className="OrderSummary">
            <div className="OrderSummary-header">
                <p>Order summary</p>
            </div>
            <div className="OrderSummary-body">
                {
                    items.map((item, index) => {
                        return (
                            <div key={index}>
                                <span>{item.volumeInfo.title}</span>
                                <span className="amount">{item.saleInfo.listPrice.amount.toFixed(2)} ILS</span>
                                <hr />
                            </div>
                        )
                    })
                }

                <h5>Total: {items.reduce((total, book) => {
                    return total + book.saleInfo.listPrice.amount
                }, 0).toFixed(2)} ILS</h5>

                <p className="info">After you click buy all your items will be waiting for you in purchase History</p>
                <button className="OrderSummary-btn" onClick={addToPurchaseHistory}>Buy all</button>
                <button className="OrderSummary-btn-Cancel" onClick={close}>Cancel</button>
            </div>
        </div>
    )
}
export default OrderSummary;