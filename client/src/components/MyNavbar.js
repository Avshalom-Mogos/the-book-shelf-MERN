import React from 'react'
import { Nav, Navbar, Form, FormControl, Button, Dropdown ,Badge} from "react-bootstrap"
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
                                    <Dropdown.Header style={{ color: "black" }}>{`Hello ${this.props.userInfo.userName}`}</Dropdown.Header>
                                    <Dropdown.Divider />

                                    {
                                        this.props.userInfo._id ?
                                            <div>
                                                <Dropdown.Item as={Link} to="/Cart" style={{ color: "black" }} >
                                                    <span className="mr-3">Shopping Cart</span>
                                                    <Badge pill variant="danger">{this.props.userInfo.myCart.length}</Badge>
                                                    </Dropdown.Item>
                                                <Dropdown.Item as={Link} to="/Settings" style={{ color: "black" }}>Settings</Dropdown.Item>
                                                <Dropdown.Item style={{ color: "black" }} onClick={this.props.triggerLogout}>Logout</Dropdown.Item>
                                            </div> :
                                            <Dropdown.Item style={{ color: "black" }} as={Link} to="/login">Login</Dropdown.Item>
                                    }

                                </Dropdown.Menu>
                            </Dropdown>

                        </Navbar.Text>
                        <Navbar.Toggle className="ml-3" aria-controls="basic-navbar-nav" />


                    </Form>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Form inline onSubmit={(e) => this.redirectToSearch(e)}>
                                <FormControl onChange={(e) => this.searchParams = e.target.value} type="text" placeholder="Search" className="mr-sm-2" />
                                <Button onClick={this.redirectToSearch} variant="outline-success">Search</Button>
                            </Form>


                            {
                                this.props.userInfo._id ? " " :
                                    <Nav.Link as={Link} to="/login">Login</Nav.Link>

                            }

                            <Nav.Link as={Link} to="/about">About</Nav.Link>

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )

    }

    redirectToSearch = (e) => {
        e.preventDefault();
        window.location.href = `/search/${this.searchParams}`
    }

}
