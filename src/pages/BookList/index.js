import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Modal, Grid, Radio } from 'semantic-ui-react';
import { collection, getFirestore, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { connect } from 'react-redux';
import { getBookList, getSellerList } from '../../store/action/bookAction';
import secureStorage from '../../util/secureStorage';
import FormElements from '../../hoc/FormElements';
import checkFormError from '../../helperFunctions/checkFormError';
import TableElement from '../../layout/TableElement';
import { bookMetaData } from '../../constant/bookMetaData';

const initialFormData = {
    title: "",
    author: "",
    description: "",
    price: 0,
    discount: 0,
    status: "PENDING",
    sellerName: '',
}

const initialFormError = {
    title: [{ required: false }],
    author: [{ required: false }],
    description: [{ required: false }],
    price: [{ required: false }],
    discount: [{ required: false }],
    // sellerName: [{required: false}],
}

const BookList = props => {

    const [userType, setUserType] = useState("");
    const [bookList, setbookList] = useState([]);
    const [sellerList, setSellerList] = useState([]);
    const [open, setOpen] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [bookId, setBookId] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const userData = secureStorage.getItem("userData");
        setUserType(userData.userType)
        getBookList();
        if (userData.userType == 'admin') {
            getSellerList();
        }
        console.log("props in book list ------>", props)
    }, [])

    const getBookList = async () => {
        const userData = secureStorage.getItem("userData");
        props.getBookList().then(res => {
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
            setSellerList(res)
        }).catch(err => {
            //error to fetch data
        })
    }

    const openAddBookModal = () => {
        setOpen(true)
        setIsEdit(false)

    }
    const addBook = async () => {

        // console.log("add book ---->", props.data, props.formErrors, props.isValidForm());

        if (!props.isValidForm().includes(false)) {
            const userData = secureStorage.getItem("userData");
            const db = getFirestore();
            if (isEdit) {                                       //edit book
                const bookRef = doc(db, "books", props.data.bookId);
                await updateDoc(bookRef, {
                    title: props.data.title,
                    author: props.data.author,
                    description: props.data.description,
                    price: props.data.price,
                    discount: props.data.discount,
                    status: props.data.status,
                    sellerName: userData.userType === 'seller' ? userData.first_name : props.data.sellerName,
                });
                setOpen(false);
                setbookList(bookList.filter(item => item.bookId != props.data.bookId));
                let id = { bookId: props.data.bookId }
                let bookWithId = { ...props.data, id }
                setbookList(bookList => [...bookList, bookWithId]); //sync operation
                console.log("update successfully----->");

            } else {
                try {
                    //await setDoc(doc(db, "books"), bookDetailsForm);
                    const docRef = await addDoc(collection(db, "books"), {
                        title: props.data.title,
                        author: props.data.author,
                        description: props.data.description,
                        price: props.data.price,
                        discount: props.data.discount,
                        status: props.data.status,
                        sellerName: userData.userType === 'seller' ? userData.first_name : props.data.sellerName,
                    });
                    let id = { bookId: docRef.id }
                    let bookWithId = { ...props.data, id }
                    setbookList([...bookList, bookWithId]);
                    setOpen(false);
                } catch (error) {
                    console.log("Error while data add------------------->", error)
                }
            }
        }
    }
    const editBook = bookDetails => {
        props.getFromValue(bookDetails);
        setIsEdit(true)
        setOpen(true);
    }
    const deleteBook = async () => {
        const db = getFirestore();
        await deleteDoc(doc(db, "books", bookId));
        setbookList(bookList.filter(item => item.bookId != bookId));
        setIsDeleteModal(false);
    }

    const actionButtons = (book) => {
        return (
            <>
                <Button icon='edit' onClick={() => editBook(book)} />
                <Button icon='delete' onClick={() => { setIsDeleteModal(true); setBookId(book.bookId) }} />
            </>
        )
    }

    return (
        <>
            <Grid>
                <Grid.Column width={4}>
                    <h1 style={{ float: 'left' }}>List of books</h1>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button secondary onClick={openAddBookModal}>Add Book</Button>
                </Grid.Column>
            </Grid>
            <>
                <TableElement
                    title="List of Books"
                    headerList={bookMetaData}
                    metaData={bookList}
                    actionType={true}
                    actionComponent={actionButtons}
                />

                <Modal open={open}>
                    <Modal.Header>{isEdit ? "Edit Book" : "Add Book"}</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                {props.smartElement.formInput({
                                    label: 'Title',
                                    name: 'title',
                                    placeholder: 'Book title',
                                    rules: ['required'],
                                    value: props.data?.title,
                                    error: props.isDirtyForm && checkFormError(props.formErrors, 'title')
                                })}
                                {props.smartElement.formInput({
                                    label: 'Author',
                                    name: 'author',
                                    placeholder: 'Author name',
                                    rules: ['required'],
                                    value: props.data?.author,
                                    error: props.isDirtyForm && checkFormError(props.formErrors, 'author')
                                })}
                            </Form.Group>
                            <Form.Group widths='equal'>
                                {props.smartElement.formTextArea({
                                    label: 'Description',
                                    name: 'description',
                                    placeholder: 'Description',
                                    rules: ['required'],
                                    value: props.data?.description,
                                    error: props.isDirtyForm && checkFormError(props.formErrors, 'description')
                                })}
                            </Form.Group>
                            <Form.Group widths='equal'>
                                {props.smartElement.formInput({
                                    label: 'Price',
                                    name: 'price',
                                    placeholder: 'Price',
                                    type: 'number',
                                    rules: ['required'],
                                    value: props.data?.price,
                                    error: props.isDirtyForm && checkFormError(props.formErrors, 'price')
                                })}
                                {props.smartElement.formInput({
                                    label: 'Discount',
                                    name: 'discount',
                                    placeholder: 'Discount',
                                    type: 'number',
                                    value: props.data?.discount,
                                    rules: ['required'],
                                    error: props.isDirtyForm && checkFormError(props.formErrors, 'discount')
                                })}
                            </Form.Group>
                            {userType === 'admin' && !isEdit && (
                                <Form.Group widths='equal'>
                                    {props.smartElement.formSelect({
                                        label: 'Select',
                                        name: 'sellerName',
                                        placeholder: 'Seller',
                                        options: sellerList,
                                        rules: ['required'],
                                        // error: props.isDirtyForm && checkFormError(props.formErrors, 'sellerName')
                                    })}
                                </Form.Group>
                            )}
                            {userType === 'admin' && (
                                <Form.Group>
                                    <label><b>Status</b></label>
                                    {props.smartElement.fromRadio({
                                        label: 'PENDING',
                                        name: 'status',
                                        value: 'PENDING',
                                        checked: props.data?.status === 'PENDING',
                                    })}
                                    {props.smartElement.fromRadio({
                                        label: 'PUBLISHED',
                                        name: 'status',
                                        value: 'PUBLISHED',
                                        checked: props.data?.status === 'PUBLISHED',
                                    })}
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
            </>
        </>
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
// export default connect(mapStateToProps, mapDispatchToProps)(BookList);
export default (FormElements((connect(mapStateToProps, mapDispatchToProps)(BookList)), initialFormData, initialFormError))
