import React from 'react'
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap"
import {Link,NavLink} from "react-router-dom";



export default class MyNavbar extends React.Component {

    searchParams = "";

    render() {


        return (
            <div>
                <Navbar bg="light" expand="lg" sticky="top">
                    <Navbar.Brand href="/home">The Book Shelf</Navbar.Brand>
                    <Form inline onSubmit={(e) => this.redirectToSearch(e)}>
                        <FormControl onChange={(e) => this.storeInputVal(e)} type="text" placeholder="Search" className="mr-sm-2" />
                        <Button onClick={this.redirectToSearch} variant="outline-success">Search</Button>
                        <Navbar.Toggle className="ml-3" aria-controls="basic-navbar-nav" />
                    </Form>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <Nav.Link href="/login">Login</Nav.Link> */}
                            <NavLink to="/login"/>
                            <Nav.Link href="/sales">Sales</Nav.Link>
                            <Nav.Link href="/about">About</Nav.Link>
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
