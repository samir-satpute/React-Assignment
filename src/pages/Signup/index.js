import React, { Fragment } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

const Signup = (props) => {
    const toggleTab = () => {
        props.history.push('/signin')
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
                            <Form.Input fluid icon='user' type='text' iconPosition='left' placeholder='First name' />
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Last Name'
                                type='text'
                            />
                            <Form.Input
                                fluid
                                icon='user'
                                iconPosition='left'
                                placeholder='Email address'
                                type='email'
                            />
                            <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button color='teal' fluid size='large'>
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

export default Signup;