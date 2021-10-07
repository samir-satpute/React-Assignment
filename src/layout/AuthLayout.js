

import React, { Fragment } from "react";

import { Grid, Header, Icon, Menu, Segment, Sidebar } from 'semantic-ui-react';

import LeftsideMenuBar from "./LeftsideMenuBar";

const AuthLayout = (props) => {

    //console.log("in auth layout")

    return (
        <Fragment>
            <Grid.Column style={{ height: '100vh' }}>
                <Sidebar.Pushable as={Segment}>

                    <LeftsideMenuBar />

                    <Sidebar.Pusher>
                        <Segment basic>
                            <Header as='h3'>Application Content</Header>
                            {props.children}
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Grid.Column>
        </Fragment>
    )
}

export default AuthLayout