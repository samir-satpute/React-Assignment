import { signOut } from "@firebase/auth";
import React, { Fragment, useEffect, useState } from "react";

import { Icon, Menu, Sidebar } from 'semantic-ui-react';
import secureStorage from "../util/secureStorage";
import { history } from "../util/history";

const LeftsideMenuBar = (props) => {

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
        history.push('/');
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
                {userType === 'customer' && (
                    <Menu.Item as='a' onClick={() => toggleRoute('/dashboard')}>
                    <Icon name='home' />
                    Home
                </Menu.Item>
                )}
                {userType === 'admin' && (
                    <Menu.Item as='b' onClick={() => toggleRoute('/users')}>
                        <Icon name='user' />

                        User List
                    </Menu.Item>
                )}

                {(userType === 'admin' || userType === 'seller') && (
                    <Menu.Item as='c' onClick={() => toggleRoute('/book-list')} >
                        <Icon name='th' />
                        Book List
                    </Menu.Item>
                )}

                    <Menu.Item as='d'>
                        <Icon name='th list' onClick={() => toggleRoute('/my-orders')} />
                        My Orders
                    </Menu.Item>

                <Menu.Item as='e' onClick={() => signOut()}>
                    <Icon name='sign-out' />
                    Logout
                </Menu.Item>
            </Sidebar>
        </Fragment>
    )
}


export default LeftsideMenuBar;