import React, { Fragment, useEffect, useState } from "react";
import { Icon, Label, Menu, Table } from 'semantic-ui-react';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const Users = (props) => {

    const [userList, setuserList] = useState();

    useEffect(() => {

        getUserList();

    }, [])

    const getUserList = async () => {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "users"));
        let list = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //   console.log("doc.id => ", doc.data());
            //setuserList( arr => [...arr, doc.data()]);
            list.push(doc.data())
        });
        setuserList(list)
    }


    return (
        <Fragment>
            <h1 style={{float: 'left'}}>List of users</h1>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell>User Type</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {userList.map((user) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{user.first_name}</Table.Cell>
                                <Table.Cell>{user.last_name}</Table.Cell>
                                <Table.Cell>{user.email}</Table.Cell>
                                <Table.Cell>{user.userType}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>

                {/* <Table.Footer>
      <Table.Row>
        <Table.HeaderCell colSpan='3'>
          <Menu floated='right' pagination>
            <Menu.Item as='a' icon>
              <Icon name='chevron left' />
            </Menu.Item>
            <Menu.Item as='a'>1</Menu.Item>
            <Menu.Item as='a'>2</Menu.Item>
            <Menu.Item as='a'>3</Menu.Item>
            <Menu.Item as='a'>4</Menu.Item>
            <Menu.Item as='a' icon>
              <Icon name='chevron right' />
            </Menu.Item>
          </Menu>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer> */}
            </Table>
        </Fragment>
    )
}

export default Users;