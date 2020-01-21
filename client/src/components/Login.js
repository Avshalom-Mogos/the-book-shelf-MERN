import React, { Component } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios"
import { Redirect } from "react-router-dom"

export default class Login extends Component {

    state = {
        email: "",
        password: "",
        redirectToHome: false,
        error: false,

    }

    login = () => {

        axios.post("/users/login", {
            email: this.state.email,
            password: this.state.password

        }).then(res => {
            //res.data is user
            if (res.status === 200) {
                
                let userInfo = { ...res.data };
                let tmpStr = userInfo.password.replace(/./g, "*");
                userInfo.password = tmpStr;
                //wirte user info to session storage
                sessionStorage.setItem("theBookShelf_user_login", JSON.stringify(userInfo));
                this.props.triggerLogin();
                this.setState({ redirectToHome: true })
            }

            else {
                this.setState({ error: true })
                console.log(`error code : ${res.status}`);
            }

        }).catch(err => {
            this.setState({ error: true })
            console.log(err);
        })
    }

    render() {
        const disabled = !this.state.email || !this.state.password;

        if (this.state.redirectToHome) {
            return < Redirect to="/" />

        }
        return (
            <div style={{ height: "100%", padding: "120px" }}>

                <Container>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={e => this.setState({ email: e.target.value })} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <label>Dont have an account? </label>
                        <a href="/signup"> sign up</a>

                    </Form.Group>
                    {this.state.error ? <p style={{ color: "red" }}> Password or Email Invalid</p> : ""}
                    <Button disabled={disabled} onClick={this.login} variant="primary" type="submit">Submit</Button>
                </Container>

            </div>
        )
    }

}
