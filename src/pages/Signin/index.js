import React, { Fragment, useState } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { authLogin } from "../../store/action/authAction";


const Signin = (props) => {

    const [signInData, setSigninData] = useState({
        email: "",
        password: "",
    });
    const [errorList, setErrorList] = useState({});
    const toggleTab = () => {
        props.history.push('/signup')
    }
    const handleChange = (e) => {
        setSigninData({
            ...signInData,
            [e.target.name]: e.target.value,
        });
    }

    const validateForm = async () => {
        const errors = {};
        if (signInData.email.trim() === "") {
            errors.email = "Email required";
        } else if (!new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(signInData.email) // email validation regex
        ) {
            errors.email = "Enter valid email id"
        }
        if (signInData.password.trim() === "") {
            errors.password = "Password required"
        } else if (!new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(signInData.password)) { //Minimum eight characters, at least one letter and one number:
            errors.password = "Password should min 8 length"
        }

        return Object.keys(errors).length === 0 ? null : errors;
    };

    const handleSign = async (e) => {
        let err = await validateForm();
        setErrorList({ ...errorList, ...err });
        if (err) {
            //show error messsage through tost message or any other better UI
            console.log("Error in sign up form----->", err)
        } else {
            // API call for registration page
            e.preventDefault();
            props.authLogin(signInData)
            //console.log("sign in details form 2222222----->", props.auth)
        }
    }
    return (
        <Fragment>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.png' /> Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            {/* {props.smartElement.input("email",{type:"password"})} */}
                            <Form.Input
                                fluid icon='user'
                                type='email'
                                name="email"
                                onChange={handleChange}
                                iconPosition='left'
                                placeholder='E-mail address'
                            />
                            {errorList.email && (<p style={{ color: "red", float: 'right' }}>Invalid email</p>)}
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                name="password"
                                onChange={handleChange}
                            />
                            {errorList.password && (<p style={{ color: "red", float: 'right' }}>Minimum 8 char, at least 1 letter and 1 number</p>)}
                            <Button color='teal' fluid size='large' onClick={
                                handleSign
                            }>
                                Sign In
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <a onClick={
                            toggleTab
                        }>Sign Up</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </Fragment>

    )
}


const mapDispatchToProps = dispatch => {
    // console.log("in map dispatch to props --->", dispatch)
    return {
        authLogin: (credentials) => dispatch(authLogin(credentials))
    }
}

const mapStateToProps = state => {
    // console.log("in map state to props ---->", state)
    return {
        auth: state.auth
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
//export default Signin;