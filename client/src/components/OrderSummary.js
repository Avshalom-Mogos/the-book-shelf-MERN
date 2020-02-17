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
                                <span>{item.volumeInfo.title}</span>
                                <span className="amount">{item.saleInfo.listPrice.amount}.99ILS</span>
                                <hr />
                                
                            </div>
                        )
                    })
                }
                 
                 <p className="info">After you click buy all your items will be waiting for you in purchase History</p>
               
                <button onClick={this.addToPurchaseHistory}>buy all</button>
                <button onClick={() => this.props.close()}>cancel</button>
                
          
            </div>
        )

       
        
    }

   



    addToPurchaseHistory = () => {
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        let itemsArray = [...this.props.items];
        this.addDateStamp(itemsArray);
        axios.post("/purchaseHistory", { id: user._id, items: itemsArray })
            .then((res) => this.deleteAlldataFromCart())

            .catch((err) => console.log(err))

        

    }

    deleteAlldataFromCart =()=>{
        let user = JSON.parse(sessionStorage.getItem("theBookShelf_user_login"));
        axios.delete(`cart/${user._id}`)
            .then(res => console.log("ok"))
            .catch(err => {
                console.log(err);
            })
            
            // this.setState({items:[]})
            this.props.getAllCartDataFromDB()
        
    }


    



    addDateStamp = (itemsArray) => {

        itemsArray.forEach(item => {
            item.dateOfPurchase = new Date().toDateString();
        });

    }
}


