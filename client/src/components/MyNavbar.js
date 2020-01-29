import React from 'react'
import { Navbar, Form, FormControl, Dropdown, Badge } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./CSS/MyNavbar.css"


export default class MyNavbar extends React.Component {


    searchParams = "";

    render() {

        return (
            <div>
               
                    <Navbar bg="dark" variant="dark" expand="">
                        <Navbar.Brand as={Link} to="/home">
                            The Book Shelf
                    </Navbar.Brand>
                        <Form inline>
                            <Navbar.Text>
                                <Dropdown>
                                    <Dropdown.Toggle variant="Success" id="dropdown-menu-align-right">
                                        My Shelf
                                </Dropdown.Toggle>
                                    <Dropdown.Menu >
                                        <Dropdown.Header style={{ color: "black" }}>
                                            <strong>{`Welcome ${this.props.userInfo.userName}`}</strong>
                                        </Dropdown.Header>
                                        <Dropdown.Divider />
                                        {
                                            this.props.userInfo._id ?
                                                <div>
                                                    <Dropdown.Item as={Link} to="/Cart" style={{ color: "black" }} >
                                                        <span className="mr-3">Shopping Cart</span>
                                                        <Badge pill variant="danger">{this.props.userInfo.myCart.length}</Badge>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item as={Link} to="/PurchaseHistory" style={{ color: "black" }}>Purchase History</Dropdown.Item>
                                                    <Dropdown.Item style={{ color: "black" }} onClick={this.props.triggerLogout}>Logout</Dropdown.Item>
                                                </div> :
                                                <Dropdown.Item style={{ color: "black" }} as={Link} to="/login">Login</Dropdown.Item>
                                        }
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Navbar.Text>
                        </Form>
                    </Navbar>
               
        
                    <Navbar style={this.NavbarStyle}>
                        <Form className="MyNavbar-form" onSubmit={(e) => this.redirectToSearch(e)}>
                            <FormControl onChange={(e) => this.searchParams = e.target.value} type="text" placeholder="Search" className="MyNavbar-search-input" />
                            {/* <Button onClick={this.redirectToSearch} variant="outline-success">Search</Button> */}
                            <i onClick={this.redirectToSearch} className="fas fa-search MyNavbar-search-btn"></i>
                        </Form>
                    </Navbar>
              
            </div>
        )
    }

    redirectToSearch = (e) => {
        e.preventDefault();
        window.location.href = `/search/${this.searchParams}`
    }

    NavbarStyle = {
        margin: "0 auto",
        backgroundColor: "lightgray"

    }
}
