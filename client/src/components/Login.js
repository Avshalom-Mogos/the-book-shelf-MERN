import React, { Component } from 'react';
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios"
import { Redirect } from "react-router-dom"
import "./CSS/Login.css"
export default class Login extends Component {

    state = {
        redirectToHome: false,
        error: false,

    }

    userInfo ={
        email: "",
        password: "",

    }



    login = () => {
        axios.post("/users/login", {
            email: this.userInfo.email,
            password: this.userInfo.password,

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
      
        if (this.state.redirectToHome) {
            return < Redirect to="/"/>

        }
        return (
            <div className="Login">

                <Container className="Login-from">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required onChange={(e) => this.userInfo.email = e.target.value} type="email"  placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control required onChange={(e) => this.userInfo.password = e.target.value} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <label>Dont have an account? </label>
                        <a href="/signup"> sign up</a>

                    </Form.Group>
                    {this.state.error ? <p style={{ color: "red" }}> Password or Email Invalid</p> : ""}
                    <Button onClick={this.login} variant="primary" type="submit">Submit</Button>
                </Container>

            </div>
        )
    }

}
