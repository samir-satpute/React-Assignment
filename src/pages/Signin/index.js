import React, { Fragment, useState, useRef, useEffect } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { authLogin } from "../../store/action/authAction";
import FormElements from "../../hoc/FormElements";
import { history } from "../../util/history";
import checkFormError from "../../helperFunctions/checkFormError";

const initialFormData = {
    email: "",
    password: "",
}

const initialFormError = {

}
const Signin = (props) => {


    const toggleTab = () => {
        history.push('/signup')
    }

    const handleSign = async (e) => {

        if (checkFormError(props.formErrors, 'email') == null && checkFormError(props.formErrors, 'password') == null) {
            try {
                e.preventDefault();
                props.authLogin(props.data)
            } catch (error) {
                console.log("Error in sign in form----->", error)
            }
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

                            {props.smartElement.formInput({
                                type: 'email', name: 'email',
                                placeholder: 'Email address',
                                rules: ['required', 'email'],
                                error: checkFormError(props.formErrors, 'email'),
                            })}
                            {props.smartElement.formInput({
                                type: 'password', name: 'password',
                                placeholder: 'Password',
                                rules: ['required', 'password'],
                                error: checkFormError(props.formErrors, 'password')
                            })}

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
    return {
        authLogin: (credentials) => dispatch(authLogin(credentials))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}


export default FormElements(connect(mapStateToProps, mapDispatchToProps)(Signin, initialFormData, initialFormError))
