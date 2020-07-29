import React, { useState, useEffect} from 'react';
import { Container } from "react-bootstrap";
import HistoryItem from "../historyItem/HistoryItem";
import BookLoader from "../bookLoader/BookLoader";
import "./PurchaseHistory.css";
import axios from "axios";


const PurchaseHistory = () => {
    const [items, setItems] = useState([]);
    const [showBookLoader, setShowBookLoader] = useState(false);


    useEffect(() => {

        setShowBookLoader(true);

        //getPurchaseHistoryFromDB
        const user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.get(`/purchaseHistory/${user._id}`)
            .then((res) => {
                setItems([...res.data]);
                setShowBookLoader(false);
            })
            .catch(err => console.error(err))

    }, [])

    return (
        <div className="PurchaseHistory">
            <h1 className="text-info text-center">Purchase History</h1>
            {showBookLoader ? <BookLoader /> : ""}
            <Container>
                {!items.length ? <h1>No Purchase history was pound</h1> : ''}
                {
                    items.map((item, index) => {
                        return <HistoryItem key={index} book={item} />
                    })
                }
            </Container>
        </div>
    )
};
export default PurchaseHistory;