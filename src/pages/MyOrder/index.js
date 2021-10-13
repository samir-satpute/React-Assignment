import React, { Fragment, useState, useEffect } from "react";
import secureStorage from "../../util/secureStorage";
import { Icon, Label, Menu, Table, Button, Form, Dropdown, Modal, Radio } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getOrderList, confirmOrder } from "../../store/action/orderAction";


const MyOrder = (props) => {

    const [orderList, setOrderList] = useState([]);
    const [open, setOpen] = useState(false);
    const [orderDetails, setOrderDetails] = useState();


    useEffect(() => {
        getOrderList();
    }, [])

    const getOrderList = () => {
        const userData = secureStorage.getItem("userData");
        props.getOrderList().then(res => {
            console.log("list -------------->", res)
            if (userData.userType == 'customer') {
                setOrderList(res.filter(item => item.userName == userData.first_name))
            } else if (userData.userType == 'seller') {

                setOrderList(res.filter(item => item.sellerName == userData.first_name))
            } else {
                setOrderList(res)
            }
        }).catch(err => {
            //error to fetch data
        })

    }
    const changeStatus = order => {
        props.confirmOrder(orderDetails).then(res => {
            setOpen(false)
            getOrderList();
        }).catch(err => {

        })
    }
    const userData = secureStorage.getItem("userData");
    return (
        <Fragment>
            <h1> In MyOrder component</h1>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Book</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Discount</Table.HeaderCell>
                        {userData.userType == 'customer' || userData.userType == 'admin' && (
                            <Table.HeaderCell>Seller</Table.HeaderCell>
                        )}
                        <Table.HeaderCell>Quantity</Table.HeaderCell>

                        <Table.HeaderCell>Total Price</Table.HeaderCell>
                        {userData.userType == 'seller' || userData.userType == 'admin' && (
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                        )}

                        <Table.HeaderCell>Status</Table.HeaderCell>
                        {userData.userType == 'seller' && (
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        )}

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {orderList.map((order, index) => {
                        return (
                            <Table.Row key={index}>
                                <Table.Cell>{order.bookName}</Table.Cell>
                                <Table.Cell>{order.price}</Table.Cell>
                                <Table.Cell>{order.discount}</Table.Cell>
                                {userData.userType == 'customer' || userData.userType == 'admin' && (
                                    <Table.Cell>{order.sellerName}</Table.Cell>
                                )}

                                <Table.Cell>{order.quantity}</Table.Cell>
                                <Table.Cell>{order.totalPrice}</Table.Cell>
                                {userData.userType == 'seller' || userData.userType == 'admin' && (
                                    <Table.Cell>{order.userName}</Table.Cell>
                                )}

                                <Table.Cell>{order.status}</Table.Cell>
                                {userData.userType == 'seller' && (
                                    <Table.Cell>
                                        {order.status == 'PENDING' && (
                                            // <Button icon='edit' onClick={() => changeStatus(order)} />
                                            <Button icon='edit' onClick={() => { setOrderDetails(order); setOpen(true) }} />
                                        )}

                                    </Table.Cell>
                                )}
                            </Table.Row>
                        )
                    })}
                </Table.Body>

            </Table>


            <Modal
                open={open}
            >
                <Modal.Header>Confirm Order</Modal.Header>
                <Modal.Content>
                    <p>Are you sure to confirm order?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        Cancle
                    </Button>
                    <Button
                        onClick={() => changeStatus('')}
                        positive
                    > Confirm
                    </Button>
                </Modal.Actions>
            </Modal>

        </Fragment>

    )
}


const mapDispatchToProps = dispatch => {
    return {
        getOrderList: () => dispatch(getOrderList()),
        confirmOrder: (oderDetails) => dispatch(confirmOrder(oderDetails))
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orders.orderList,
        isOrderConfirm: state.orders.isOrderConfirm
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyOrder);