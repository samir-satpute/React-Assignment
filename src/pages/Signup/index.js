import React from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { registration } from "../../store/action/authAction";
import { history } from "../../util/history";
import FormElements from "../../hoc/FormElements";
import checkFormError from "../../helperFunctions/checkFormError";

const initialFormData = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    userType: "customer"
}

const initialFormError = {
    first_name: [{ required: false }],
    last_name: [{ required: false }],
    email: [{ required: false }, { email: false }],
    password: [{ required: false }, { password: false }]
}
const Signup = (props) => {

    const toggleTab = () => {
        history.push('/signin')
    }

    const signupHandler = async (e) => {
        // if (checkFormError(props.formErrors, 'first_name') == null &&
        //     checkFormError(props.formErrors, 'first_name') == null &&
        //     checkFormError(props.formErrors, 'email') == null &&
        //     checkFormError(props.formErrors, 'password') == null) {
        if (!props.isValidForm().includes(false)) {
            try {
                e.preventDefault();
                props.registration(props.data);
            } catch (error) {
                console.log("Error in sign up form----->", error)
            }
        }
    }


    return (
        <>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.png' /> Create new account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>

                            {props.smartElement.formInput({
                                name: 'first_name',
                                placeholder: 'First Name',
                                rules: ['required'],
                                error: props.isDirtyForm && checkFormError(props.formErrors, 'first_name')
                            })}

                            {props.smartElement.formInput({
                                name: 'last_name',
                                placeholder: 'Last Name',
                                rules: ['required'],
                                error: props.isDirtyForm && checkFormError(props.formErrors, 'last_name')
                            })}


                            {props.smartElement.formInput({
                                type: 'email', name: 'email',
                                placeholder: 'Email address',
                                rules: ['required', 'email'],
                                error: props.isDirtyForm && checkFormError(props.formErrors, 'email')
                            })}


                            {props.smartElement.formInput({
                                type: 'password', name: 'password',
                                placeholder: 'password',
                                rules: ['required', 'password'],
                                error: props.isDirtyForm && checkFormError(props.formErrors, 'password')
                            })}

                            <Form.Field>
                                Selecte type:
                            </Form.Field>
                            <Form.Field>

                                {props.smartElement.fromRadio({
                                    label: 'Customer',
                                    name: 'userType',
                                    value: 'customer',
                                    checked: props.data?.userType === 'customer',
                                })}

                                {props.smartElement.fromRadio({
                                    label: 'Seller',
                                    name: 'userType',
                                    value: 'seller',
                                    checked: props.data?.userType === 'seller',
                                })}

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
        </>

    )
}
const mapDispatchToProps = dispatch => {
    return {
        registration: (credentials) => dispatch(registration(credentials))
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}
export default FormElements(connect(mapStateToProps, mapDispatchToProps)(Signup, initialFormData, initialFormError));