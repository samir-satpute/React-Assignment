import React, { Fragment, useState, useEffect } from 'react';
import { Icon, Label, Menu, Table, Button } from 'semantic-ui-react';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";



const BookList = props => {

    const [bookList, setbookList] = useState([]);


    useEffect(() => {
        // getBookList();
    }, [])

    const getBookList = async () => {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "books"));
        let list = [];
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });
        setbookList(list)
    }

    return (
        <Fragment>
            <h1 style={{float: 'left'}}>List of books</h1>
            <Button secondary>Add Book</Button>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Tile</Table.HeaderCell>
                        <Table.HeaderCell>Author</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                        <Table.HeaderCell>Discount</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {bookList.map((book) => {
                        return (
                            <Table.Row>
                                <Table.Cell>{book.Id}</Table.Cell>
                                <Table.Cell>{book.title}</Table.Cell>
                                <Table.Cell>{book.author}</Table.Cell>
                                <Table.Cell>{book.price}</Table.Cell>
                                <Table.Cell>{book.discount}</Table.Cell>
                                <Table.Cell>{book.status}</Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>

            </Table>
        </Fragment>
    )
}

export default BookList;