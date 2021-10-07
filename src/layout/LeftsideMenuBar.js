import { signOut } from "@firebase/auth";
import React, { Fragment, useEffect, useState } from "react";

import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import secureStorage from "../util/secureStorage";
import { history } from "../util/history";

const LeftsideMenuBar = (props) => {

    //console.log("in LeftsideMenuBar")

    const [userType, setUserType] = useState("")

    useEffect(() => {
        const userData = secureStorage.getItem("userData");
        setUserType(userData.userType)
    }, [])


    const toggleRoute = path => {
        history.push(path)
    }
    const signOut = () => {
        //write logic for signout;
        secureStorage.clear();
        history.push('/signin');
    }

    return (
        <Fragment>
            <Sidebar
                as={Menu}
                animation='overlay'
                icon='labeled'
                inverted
                vertical
                visible={true}
                animation='push'
                width='thin'
            >
                <Menu.Item as='a' onClick={() => toggleRoute('/dashboard')}>
                    <Icon name='home' />
                    Home
                </Menu.Item>
                <Menu.Item as='a' onClick={() => toggleRoute('/users')}>
                    <Icon name='user' />

                    User List
                </Menu.Item>
                <Menu.Item as='a' onClick={() => toggleRoute('/book-list')} >
                    <Icon name='th' />
                    Book List
                </Menu.Item>
                {userType === 'customer' && (
                    <Menu.Item as='a'>
                        <Icon name='th list' onClick={() => toggleRoute('/my-orders')} />
                        My Orders
                    </Menu.Item>
                )}

                <Menu.Item as='a' onClick={() => signOut()}>
                    <Icon name='sign-out' />
                    Logout
                </Menu.Item>
            </Sidebar>
        </Fragment>
    )
}


export default LeftsideMenuBar;