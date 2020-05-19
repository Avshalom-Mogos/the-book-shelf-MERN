import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";


const Login = (props) => {

    const { triggerLogin } = props;
    const [redirectToHome, setRedirectToHome] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const initialValues = {
        email: "",
        password: "",
    };

    const formik = useFormik({
        initialValues,
        onSubmit: values => submitForm(values)
    });

    const userFeedBack = () => {
        if (showError) return <p style={{ color: "red" }}> Password or Email Is Invalid</p>
        if (showSpinner) return <Spinner animation="border" />
    };

    const submitForm = (values) => {

        setShowError(true);
        setShowError(false);

        axios.post("/users/login", {
            email: values.email,
            password: values.password,

        }).then(res => {
            //res.data is user
            if (res.status === 200) {

                //wirte user info to session storage
                const userInfo = { ...res.data };
                sessionStorage.setItem("theBookShelf_user_login", JSON.stringify(userInfo));
                triggerLogin();

                //Redirect
                setRedirectToHome(true)
            } else {
                setShowError(true);
                console.log(`error code : ${res.status}`);
            };

        }).catch(err => {
            setShowError(true);
        })
    };

    if (redirectToHome) return < Redirect to="/" />;
    
    return (
        <div className="Login">
            <Container className="Login-from">
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Enter email"
                            required
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label >Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Password"
                            minLength={6}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <label>Don't have an account?</label>
                        <Link to="/signup"> Sign Up</Link>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">Login</Button>
                    </Form.Group>
                    <Form.Group className="Login-feedback">
                        {userFeedBack()}
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
};
export default Login;