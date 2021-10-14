import React, { Fragment, useState } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment, Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registration } from "../../store/action/authAction";
import { history } from "../../util/history";

const Signup = (props) => {

    const [signupData, setSignupData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        userType: "customer"
    });
    const [errorList, setErrorList] = useState({});


    const toggleTab = () => {
        history.push('/signin')
    }

    const handleChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    }
    const handleUserType = (value) => {
        setSignupData({
            ...signupData,
            userType: value
        })
    }

    const validateForm = async () => {
        const errors = {};
        if (signupData.first_name.trim() === "") {
            errors.first_name = "First name required";
        }
        if (signupData.last_name.trim() === "") {
            errors.last_name = "Last name required";
        }
        if (signupData.password.trim() === "") {
            errors.password = "Password required"
        } else if (!new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).test(signupData.password)) { //Minimum eight characters, at least one letter and one number:
            errors.password = "Password should min 8 length"
        }
        if (signupData.email.trim() === "") {
            errors.email = "Email required";
        } else if (!new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(signupData.email)
        ) {
            errors.email = "Enter valid email id"
        }
        return Object.keys(errors).length === 0 ? null : errors;
    };

    const signupHandler = async (e) => {
        let err = await validateForm();
        setErrorList({ ...errorList, ...err });
        if (err) {
            //show error messsage through tost message or any other better UI
            console.log("Error in sign up form----->", err)
        } else {
            // API call for registration page
            // console.log("sign up details form ----->", signupData)
            e.preventDefault();
            props.registration(signupData);
 
        }
    }


    return (
        <Fragment>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.png' /> Create new account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input
                                fluid
                                icon='user'
                                name="first_name"
                                type='text'
                                iconPosition='left'
                                onChange={handleChange}
                                placeholder='First name' />
                                {errorList.first_name && (<p style={{ color: "red", float: 'right' }}>First name required</p>)}
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Last Name'
                                type='text'
                                name="last_name"
                                onChange={handleChange}
                            />
                            {errorList.last_name && (<p style={{ color: "red", float: 'right' }}>Last name required</p>)}
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Email address'
                                type='email'
                                name="email"
                                onChange={handleChange}
                            />
                            {errorList.email && (<p style={{ color: "red", float: 'right' }}>Enter valid email</p>)}
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
                            <Form.Field>
                                Selecte type:
                            </Form.Field>
                            <Form.Field>
                                <Radio
                                    label='Customer'
                                    name='radioGroup'
                                    value='customer'
                                    checked={signupData.userType === 'customer'}
                                    onChange={() => { handleUserType('customer') }}
                                />
                                <Radio
                                    label='Seller'
                                    name='radioGroup'
                                    value='seller'
                                    checked={signupData.userType === 'seller'}
                                    onChange={() => { handleUserType('seller') }}
                                />
                            </Form.Field>
                            <Button color='teal' fluid size='large' onClick={
                                signupHandler
                            }>
                                Sign Up
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already have account? <a onClick={
                            toggleTab
                        }>Sign In</a>
                    </Message>
                </Grid.Column>
            </Grid>
        </Fragment>

    )
}
const mapDispatchToProps = dispatch =>{
    // console.log("in map dispatch to props --->", dispatch)
    return {
        registration: (credentials)  => dispatch(registration(credentials))
    }
}

const mapStateToProps = state =>{
    // console.log("in map state to props ---->", state)
    return {
        auth:state.auth
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
//export default Signup;