import React, { Component } from 'react'
import axios from "axios"
import { Container } from "react-bootstrap"
import HistoryItem from "./HistoryItem.js"
import "./CSS/PurchaseHistory.css"

export default class PurchaseHistory extends Component {

    state = { items: [] }

    render() {

        return (
            <div className="PurchaseHistory">
                <Container>
                    <h1>Purchase History</h1>
                    {
                        this.state.items.map((item,index) => {
                            return <HistoryItem key={index} book={item} />
                        })
                    }
                </Container>
            </div>
        )
    }

    componentDidMount() {

        this.getPurchaseHistoryFromDB()
    }

    getPurchaseHistoryFromDB = () => {

        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.get(`/purchaseHistory/${user._id}`)
            .then((res) => {
                console.log(res.data)


                // // update myCart in Session storage
                // user.purchaseHistory = [...res.data]
                // let updatedUser = JSON.stringify(user)
                // sessionStorage.setItem("theBookShelf_user_login", updatedUser);

                this.setState({ items: res.data })


                // //update user info on App.js
                // this.props.triggerLogin()
            })
            .catch(err => console.log(err))
    }
}
