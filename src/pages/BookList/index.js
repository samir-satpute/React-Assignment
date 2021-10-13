import React, { Fragment, useState, useEffect } from 'react';
import { Icon, Label, Menu, Table, Button, Form, Modal, Grid, Radio } from 'semantic-ui-react';
import { collection, getFirestore, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { connect } from 'react-redux';
import { getBookList, getSellerList } from '../../store/action/bookAction';
import secureStorage from '../../util/secureStorage';



const BookList = props => {

    const [userType, setUserType] = useState("");
    const [bookList, setbookList] = useState([]);
    const [sellerList, setSellerList] = useState([]);
    const [open, setOpen] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [bookId, setBookId] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [errorList, setErrorList] = useState({});
    const [bookDetailsForm, setBookDetailsFrom] = useState({
        title: "",
        author: "",
        description: "",
        price: 0,
        discount: 0,
        status: "PENDING",
        sellerName: '',
    })
    useEffect(() => {
        const userData = secureStorage.getItem("userData");
        setUserType(userData.userType)
        getBookList();
        if (userData.userType == 'admin') {
            getSellerList();
        }
    }, [])

    const validateForm = async () => {
        const errors = {};
        if (bookDetailsForm.title.trim() === "") {
            errors.title = "required";
        }
        if (bookDetailsForm.author.trim() === "") {
            errors.author = "required";
        }
        if (bookDetailsForm.description.trim() === "") {
            errors.description = "required";
        }
        if (bookDetailsForm.price < 0) {
            errors.price = "required";
        }
        if (bookDetailsForm.discount < 0) {
            errors.discount = "required";
        }
        if (bookDetailsForm.sellerName.trim() === "") {
            errors.sellerName = "required";
        }
        
        return Object.keys(errors).length === 0 ? null : errors;
    };

    const getBookList = async () => {
        const userData = secureStorage.getItem("userData");
        props.getBookList().then(res => {
            // console.log("list -------------->", res)
            if (userData.userType == 'seller') {
                setbookList(res.filter(item => item.sellerName == userData.first_name))
            } else {
                setbookList(res)
            }

        }).catch(err => {
            //error to fetch data
        })
    }
    const getSellerList = async () => {
        props.getSellerList().then(res => {
            // console.log("list -------------->", res)
            setSellerList(res)
        }).catch(err => {
            //error to fetch data
        })
    }

    const handleChange = (e) => {
        setBookDetailsFrom({
            ...bookDetailsForm,
            [e.target.name]: e.target.value,
        });
    }
    const handleSellerChange = (e) => {
        // console.log("handlesellerChange", e)
        setBookDetailsFrom({
            ...bookDetailsForm,
            sellerName: e.target.outerText
        })
    }
    const handleBookStatus = (value) => {
        setBookDetailsFrom({
            ...bookDetailsForm,
            status: value
        })
    }
    const openAddBookModal = () => {
        // setShowBookForm(true);
        const userData = secureStorage.getItem("userData");
        setBookDetailsFrom({
            title: "",
            author: "",
            description: "",
            price: 0,
            discount: 0,
            status: "PENDING",
            sellerName: userData.userType === 'seller' ? userData.first_name : "",
        })
        setOpen(true)
        setIsEdit(false)

    }
    const addBook = async () => {


        let err = await validateForm();
        setErrorList({ ...errorList, ...err });
        if (err) {
            console.log('error in form')// show toster message
        }else{
            const userData = secureStorage.getItem("userData");
            const db = getFirestore();
            if (isEdit) {   //Edit existing book
    
                const bookRef = doc(db, "books", bookDetailsForm.bookId);
    
                await updateDoc(bookRef, {
                    title: bookDetailsForm.title,
                    author: bookDetailsForm.author,
                    description: bookDetailsForm.description,
                    price: bookDetailsForm.price,
                    discount: bookDetailsForm.discount,
                    status: bookDetailsForm.status,
                    sellerName: userData.userType === 'seller' ? userData.first_name : bookDetailsForm.sellerName,
                });
                setOpen(false);
    
                setbookList(bookList.filter(item => item.bookId != bookDetailsForm.bookId));
    
                let id = { bookId: bookDetailsForm.bookId }
                let bookWithId = { ...bookDetailsForm, id }
    
                // setbookList([...bookList, bookWithId])          // async operation
    
                setbookList(bookList => [...bookList, bookWithId]); //sync operation
                console.log("update successfully----->");
    
            } else {   //add new book
                try {
                    //await setDoc(doc(db, "books"), bookDetailsForm);
                    const docRef = await addDoc(collection(db, "books"), bookDetailsForm);
                    // console.log("Document written with ID: ", docRef.id);
                    // console.log("Data added successfully------------------->")
                    setOpen(false);
                    let id = { bookId: docRef.id }
                    let bookWithId = { ...bookDetailsForm, id }
    
                    setbookList([...bookList, bookWithId])
    
                } catch (error) {
                    console.log("Error while data add------------------->", error)
                }
    
            }

        }

    }

    const editBook = bookDetails => {
        setIsEdit(true)
        setBookDetailsFrom(bookDetails)
        setOpen(true);
    }
    const deleteBook = async () => {
        const db = getFirestore();
        await deleteDoc(doc(db, "books", bookId));
        setbookList(bookList.filter(item => item.bookId != bookId));
        console.log("Delete book successfully")
    }

    return (
        <Fragment>
            <Grid>
                <Grid.Column width={4}>
                <h1 style={{ float: 'left' }}>List of books</h1>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button secondary onClick={openAddBookModal}>Add Book</Button>
                </Grid.Column>
            </Grid>
            <Fragment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Tile</Table.HeaderCell>
                            <Table.HeaderCell>Author</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                            <Table.HeaderCell>Discount</Table.HeaderCell>
                            <Table.HeaderCell>Seller Name</Table.HeaderCell>
                            <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {bookList.map((book, index) => {
                            return (
                                <Table.Row key={index}>
                                    <Table.Cell>{book.title}</Table.Cell>
                                    <Table.Cell>{book.author}</Table.Cell>
                                    <Table.Cell>{book.price}</Table.Cell>
                                    <Table.Cell>{book.discount}%</Table.Cell>
                                    <Table.Cell>{book.sellerName}</Table.Cell>
                                    <Table.Cell>{book.status}</Table.Cell>
                                    <Table.Cell>
                                        <Button icon='edit' onClick={() => editBook(book)} />
                                        <Button icon='delete' onClick={() => { setIsDeleteModal(true); setBookId(book.bookId) }} />
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>
                </Table>


                <Modal open={open}>
                    <Modal.Header>{isEdit ? "Edit Book" : "Add Book"}</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Title'
                                    placeholder='Book title'
                                    type='text'
                                    name="title"
                                    onChange={handleChange}
                                    value={bookDetailsForm.title}
                                />
                                {errorList.title && (<p style={{ color: "red", float: 'right' }}>required</p>)}
                                <Form.Input
                                    fluid
                                    label='Author'
                                    placeholder='Author name'
                                    type='text'
                                    name="author"
                                    onChange={handleChange}
                                    value={bookDetailsForm.author}
                                />
                                {errorList.author && (<p style={{ color: "red", float: 'right' }}>required</p>)}
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.TextArea
                                    fluid
                                    label='Description'
                                    placeholder='description'
                                    type='text'
                                    name="description"
                                    onChange={handleChange}
                                    value={bookDetailsForm.description}
                                />
                                {errorList.description && (<p style={{ color: "red", float: 'right' }}>required</p>)}
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Price'
                                    placeholder='Price'
                                    type='number'
                                    name="price"
                                    onChange={handleChange}
                                    value={bookDetailsForm.price}
                                />
                                {errorList.price && (<p style={{ color: "red", float: 'right' }}>required</p>)}
                                <Form.Input
                                    fluid
                                    label='Discount'
                                    placeholder='Discount'
                                    type='number'
                                    name="discount"
                                    onChange={handleChange}
                                    value={bookDetailsForm.discount}
                                />
                                {errorList.discount && (<p style={{ color: "red", float: 'right' }}>required</p>)}
                            </Form.Group>
                            {userType === 'admin' && !isEdit && (

                                <Form.Group widths='equal'>
                                    <Form.Select
                                        fluid
                                        label='Select Seller'
                                        options={sellerList}
                                        name="sellerName"
                                        onChange={handleSellerChange}
                                        placeholder='Seller'
                                    // value={sellerList}
                                    />
                                    {errorList.sellerName && (<p style={{ color: "red", float: 'right' }}>required</p>)}
                                </Form.Group>
                            )}

                            {userType === 'admin' && (

                                <Form.Group>
                                    <label><b>Status</b></label>
                                    <Radio
                                        label='PENDING'
                                        name='statusRadio'
                                        value='PENDING'
                                        checked={bookDetailsForm.status === 'PENDING'}
                                        onChange={() => { handleBookStatus('PENDING') }}
                                    />
                                    <Radio
                                        label='PUBLISHED'
                                        name='statusRadio'
                                        value='PUBLISHED'
                                        checked={bookDetailsForm.status === 'PUBLISHED'}
                                        onChange={() => { handleBookStatus('PUBLISHED') }}
                                    />
                                </Form.Group>
                            )}
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setOpen(false)}>
                            Cancle
                        </Button>
                        <Button
                            onClick={() => addBook()}
                            positive
                        > {isEdit ? "Edit Book" : "Add Book"}
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Modal open={isDeleteModal}>
                    <Modal.Header>Confirm Delete</Modal.Header>
                    <Modal.Content>
                        <p>Are you sure to delete book?</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='black' onClick={() => setIsDeleteModal(false)}>
                            Cancle
                        </Button>
                        <Button
                            onClick={() => deleteBook()}
                            positive
                        > Confirm
                        </Button>
                    </Modal.Actions>
                </Modal>
            </Fragment>
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getBookList: () => dispatch(getBookList()),
        getSellerList: () => dispatch(getSellerList())
    }
}

const mapStateToProps = state => {
    return {
        book: state.book.bookList,
        sellers: state.book.sellerList,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BookList);

//export default BookList;