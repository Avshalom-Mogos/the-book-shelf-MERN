import React, { Component } from 'react'
import axios from "axios"
import "./CSS/PurchaseHistory.css"

export default class PurchaseHistory extends Component {

    state = { items: [] }

    render() {

        return (
            <div className="PurchaseHistory" style={{ height: "100%" }}>
                <h1>Hello from Purchase History</h1>
                {/* {
                    this.state.items.map((item) => {

                    })
                } */}
            </div>
        )
    }

    componentDidMount() {
        // this.getPurchaseHistoryFromDB()

    }

    getPurchaseHistoryFromDB = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.get(`/cart/${user._id}`)
            .then((res) => {
                console.log(res.data)

                
                // update myCart in Session storage
                user.purchaseHistory = [...res.data]
                let updatedUser = JSON.stringify(user)
                sessionStorage.setItem("theBookShelf_user_login", updatedUser);

                this.setState({ items: res.data })


                //update user info on App.js
                this.props.triggerLogin()
            })
            .catch(err => console.log(err))
    }
}
