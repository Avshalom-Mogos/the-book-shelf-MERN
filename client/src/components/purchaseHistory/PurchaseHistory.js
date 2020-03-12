import React, { Component } from 'react'
import axios from "axios"
import { Container } from "react-bootstrap"
import HistoryItem from "../historyItem/HistoryItem"
import BookLoader from "../bookLoader/BookLoader"
import "./PurchaseHistory.css"


export default class PurchaseHistory extends Component {

    state = { items: [], showBookLoader: false }

    render() {

        return (
            <div className="PurchaseHistory">
                <h1 className="text-info text-center">Purchase History</h1>
                {this.state.showBookLoader ? <BookLoader /> : ""}
                <Container>
                    {
                        this.state.items.map((item, index) => {
                            return <HistoryItem key={index} book={item} />
                        })
                    }
                </Container>
            </div>
        )
    }

    componentDidMount() {
        this.setState({ showBookLoader: true })
        this.getPurchaseHistoryFromDB()
    }

    getPurchaseHistoryFromDB = () => {

        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.get(`/purchaseHistory/${user._id}`)
            .then((res) => {
                console.log(res.data)
                this.setState({ items: res.data, showBookLoader: false })
            })
            .catch(err => console.log(err))
    }
}
