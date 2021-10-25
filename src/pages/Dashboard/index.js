import React, { useState, useEffect } from "react";
import Book from "../Book";
import { connect } from 'react-redux';
import { getBookList } from "../../store/action/bookAction";
import { Button, Grid, Image } from 'semantic-ui-react';
import secureStorage from '../../util/secureStorage';



const Dashboard = (props) => {


    const [bookList, setbookList] = useState([]);


    useEffect(() => {
        const data = secureStorage.getItem("userData");
        getBookList();
    }, [])

    const getBookList = async () => {

        props.getBookList().then(res => {

            // console.log("list ----------->", res)
            setbookList(res.filter(item => item.status == 'PUBLISHED'));
        }).catch(err => {
            //error to fetch data
        })
    }


    return (
        <>
            <Grid columns={3} divided>
                <Grid.Row>

                    {bookList.map((book, index) => {
                        return (
                            <Book key={index} book={book} />
                        )
                    })
                    }
                </Grid.Row>
            </Grid>
        </>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        getBookList: () => dispatch(getBookList()),
    }
}

const mapStateToProps = state => {
    return {
        book: state.book.bookList,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

