import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Form, Button, Container, Spinner } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Signup.css";


const Signup = () => {

    const [redirectToHome, setRedirectToHome] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [error, setError] = useState({ showError: false, errorDescription: "" });

    const initialValues = {
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreedEULA: false,
    };

    const formik = useFormik({
        initialValues,
        onSubmit: values => submitForm(values)
    });

    const userFeedBack = () => {
        if (error.showError) return <p style={{ color: "red" }}>{error.errorDescription}</p>
        if (showSpinner) return <Spinner animation="border" />
    };

    const register = (values) => {

        axios.post("/users/register", {

            email: values.email,
            password: values.password,
            userName: values.userName,
            agreedEULA: values.agreedEULA,
            myCart: [],
            purchaseHistory: [],

        }).then(res => {
            //res.data is user
            if (res.status === 201) {
                setRedirectToHome(true);
            };

        }).catch(err => {
            setError({ showError: true, errorDescription: `ERROR: ${err.response.data}` });
            if (err.response.status === 400) {
                setError({ showError: true, errorDescription: "This email is taken by another account" });
            };
        })
    };

    const submitForm = (values) => {

        setError({ ...error, showError: false });
        setShowSpinner(true);

        //check if password not match to confirm password
        if (values.password !== values.confirmPassword) {
            setError({ showError: true, errorDescription: "Passwords doesn't match" });
            return;
        };
        register(values);
    };

    if (redirectToHome) return < Redirect to="/" />

    return (
        <div className="Signup">
            <Container className="Signup-from">
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                            name="userName"
                            placeholder="Enter User Name"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="Enter email"
                            required
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name='password'
                            onChange={formik.handleChange}
                            value={formik.values.password}
                            minLength="6"
                            placeholder="Password"
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name='confirmPassword'
                            onChange={formik.handleChange}
                            value={formik.values.confirmPassword}
                            minLength="6"
                            placeholder="Confirm Password"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check
                            type="checkbox"
                            name='agreedEULA'
                            onChange={formik.handleChange}
                            value={formik.values.agreedEULA}
                            label="Accept Terms & Conditions"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">Sign up</Button>
                    <Form.Group className="Signup-feedback">
                        {userFeedBack()}
                    </Form.Group>
                </Form>
            </Container>
        </div>
    )
};
export default Signup;