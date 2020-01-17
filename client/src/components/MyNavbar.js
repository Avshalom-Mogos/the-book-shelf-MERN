import React from 'react'
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
import "./CSS/MyNavbar.css"



export default class MyNavbar extends React.Component {

    state = {
        user: "Guest"
    }

    searchParams = "";

    render() {


        return (
            <div>
                <Navbar bg="dark" variant="dark" expand="xl" sticky="top">
                    <Navbar.Brand as={Link} to="/home">
                        The Book Shelf
                    </Navbar.Brand>

                    <Form inline>
                        <Navbar.Text>{`Hello ${this.state.user}`}</Navbar.Text>
                        <Navbar.Toggle className="ml-3" aria-controls="basic-navbar-nav" />
                    </Form>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>
                            <Form inline onSubmit={(e) => this.redirectToSearch(e)}>
                                <FormControl onChange={(e) => this.storeInputVal(e)} type="text" placeholder="Search" className="mr-sm-2" />
                                <Button onClick={this.redirectToSearch} variant="outline-success">Search</Button>

                            </Form>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>



            </div>
        )

    }

    storeInputVal = (e) => {

        this.searchParams = e.target.value;

    }



    redirectToSearch = (e) => {
        e.preventDefault();
        window.location.href = `/search/${this.searchParams}`
    }

}
