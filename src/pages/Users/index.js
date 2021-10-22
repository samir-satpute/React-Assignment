import React, { useEffect, useState } from "react";
//import { Table } from 'semantic-ui-react';
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { userMetaData } from "../../constant/userMetaData";
import TableElement from "../../layout/TableElement";

const Users = (props) => {

    const [userList, setuserList] = useState([]);

    useEffect(() => {

        getUserList();

    }, [])

    const getUserList = async () => {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "users"));
        let list = [];
        querySnapshot.forEach((doc) => {
            list.push(doc.data())
        });
        setuserList(list)
    }


    return (
        <>
            <TableElement
                title="List of users"
                headerList={userMetaData}
                metaData={userList}
            />
        </>
    )
}

export default Users;