import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Button, Card, Modal, Form } from 'semantic-ui-react'
import secureStorage from "../../util/secureStorage";
import { history } from "../../util/history";
import { placeOrder } from "../../store/action/orderAction";
import FormElement from "../../hoc/FormElement";

const Book = (props) => {

    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    const orderBook = () => {
        const userData = secureStorage.getItem("userData");

        if (userData) {
            //place order
            setOpen(true);
            let priceWithDiscount = props.book.price - (props.book.price * props.book.discount / 100)
            setTotalPrice(priceWithDiscount)

        } else {
            history.push('/signin');
        }
    }
    const onQuantityChange = e => {
        if (e.target.value >= 1) {
            setQuantity(e.target.value)
            let priceWithDiscount = (props.book.price * e.target.value) - (props.book.price * e.target.value * props.book.discount / 100)
            setTotalPrice(priceWithDiscount);
        }

    }
    const placeOrder = () => {
        //call place order API
        const userData = secureStorage.getItem("userData");
        let orderDetails = {
            userName: userData.first_name,
            bookId: props.book.bookId,
            bookName: props.book.title,
            sellerName: props.book.sellerName,
            price: props.book.price,
            discount: props.book.discount,
            quantity: quantity,
            totalPrice: totalPrice,
            status: 'PENDING'
        }
        props.placeOrder(orderDetails).then(res => {
            setOpen(false);
        }).catch(err => {
            console.log("place order error--------->")
        })
    }

    return (
        <>
            &nbsp;&nbsp;
            <Card.Group>
                <Card>
                    <Card.Content>
                        <Card.Header>{props.book.title}</Card.Header>
                        <Card.Meta><strong>Author :</strong>{props.book.author}</Card.Meta>
                        <Card.Description>
                            {props.book.description}
                        </Card.Description>
                        <Card.Meta><strong>Price :</strong>{props.book.price}</Card.Meta>
                        <Card.Meta><strong>Discount :</strong>{props.book.discount}%</Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green' onClick={() => { orderBook() }}>
                                Order
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
            </Card.Group>
            &nbsp;&nbsp;

            <Modal
                open={open}
            >
                <Modal.Header>Order details</Modal.Header>
                <Modal.Content>
                    <h3><b>{props.book.title}</b></h3>
                    <h4>Price :{props.book.price}</h4>
                    <h5>Discount :{props.book.discount}%</h5>
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Quantity'
                                placeholder='Quantity'
                                type='number'
                                name="quantity"
                                onChange={onQuantityChange}
                                value={quantity}
                            />
                            <Form.Input
                                fluid
                                label='Total Price'
                                placeholder='Total price'
                                type='number'
                                disabled='true'
                                name="totalPrice"
                                value={totalPrice}
                            />
                        </Form.Group>
                    </Form>

                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={() => setOpen(false)}>
                        Cancle
                    </Button>
                    <Button
                        onClick={() => placeOrder()}
                        positive
                    > Place order
                    </Button>
                </Modal.Actions>
            </Modal>
        </>

    )
}

const mapDispatchToProps = dispatch => {
    return {
        placeOrder: (orderDetails) => dispatch(placeOrder(orderDetails)),
    }
}

const mapStateToProps = state => {
    return {
        isOrderPlace: state.orders.isOrderPlace,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Book);
