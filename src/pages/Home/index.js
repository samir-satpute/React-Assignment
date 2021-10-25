import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getBookList } from "../../store/action/bookAction";
import { Button, Grid, Image } from 'semantic-ui-react';
import secureStorage from '../../util/secureStorage';
import { history } from '../../util/history';


import Book from '../Book';


const Home = props => {


    const [bookList, setbookList] = useState([]);
    const [userData, setUserdata] = useState({})


    useEffect(() => {
        const data = secureStorage.getItem("userData");
        if (data != null) {
            setUserdata(data);
        }
        getBookList();
    }, [])

    const getBookList = async () => {

        props.getBookList().then(res => {
            setbookList(res.filter(item => item.status == 'PUBLISHED'));
        }).catch(err => {
            //error to fetch data
        })
    }

    const onChangeRoute = route => {
        props.history.push(route)
    }

    return (
        <>
            <>
                <h1>In home component</h1>
                <Button secondary onClick={() => onChangeRoute('/signin')}>Sign In</Button>
                <Button secondary onClick={() => onChangeRoute('/signup')}>Sign up</Button>
            </>

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
export default connect(mapStateToProps, mapDispatchToProps)(Home);