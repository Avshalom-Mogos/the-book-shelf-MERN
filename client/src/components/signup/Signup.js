import React, { Component } from 'react'
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom"
import axios from "axios"
import "./Signup.css"


export default class Signup extends Component {

    state = {
        redirectToHome: false,
        showSpinner: false,
        error: {
            showError: false,
            errorDescription: ""
        }
    }

    userInfo = {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreedEULA: false,
    }


    render() {

        if (this.state.redirectToHome) {
            return < Redirect to="/" />
        }
        return (
            <div className="Signup">
                <Container className="Signup-from">
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Username</Form.Label>
                            <Form.Control required onChange={(e) => this.userInfo.userName = e.target.value} type="text" placeholder="Enter User Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required onChange={(e) => this.userInfo.email = e.target.value} type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control required onChange={(e) => this.userInfo.password = e.target.value} type="password" minLength="6" placeholder="Password" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required onChange={(e) => this.userInfo.confirmPassword = e.target.value} type="password" minLength="6" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check onChange={(e) => this.userInfo.agreedEULA = e.target.checked} type="checkbox" label="Accept Terms & Conditions" required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Sign up</Button>
                        <Form.Group className="Signup-feedback">
                            {this.userFeedBack()}
                        </Form.Group>
                    </Form>
                </Container>
            </div>
        )
    }

    userFeedBack = () => {
        if (this.state.error.showError) return <p style={{ color: "red" }}>{this.state.error.errorDescription}</p>
        if (this.state.showSpinner) return <Spinner animation="border" />
    }

    register = () => {

        axios.post("/users/register", {

            email: this.userInfo.email,
            password: this.userInfo.password,
            userName: this.userInfo.userName,
            agreedEULA: this.userInfo.agreedEULA,
            myCart: [],
            purchaseHistory: [],

        }).then(res => {
            //res.data is user
            if (res.status === 201) {
                this.setState({ redirectToHome: true })
            }

        }).catch(err => {
            this.setState({ error: { showError: true, errorDescription: `ERROR: ${err.response.data}` } })
            if (err.response.status === 400) {
                this.setState({ error: { showError: true, errorDescription: "This email is taken by another account" } })
            }
            console.log(err.response);
        })
    }

    validate = () => {
        //check if password not match to confirm password
        if (this.userInfo.password !== this.userInfo.confirmPassword) {
            return false;
        }
        return true;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ showSpinner: true, error: { showError: false } })
        if (!this.validate()) {

            console.log("validation error");
            console.log(this.userInfo)
            this.setState({ error: { showError: true, errorDescription: "Passwords doesn't match" } });
        } else {
            this.register();
        }

    }
}
