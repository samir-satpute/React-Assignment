import React from 'react';
import { Table } from 'semantic-ui-react';

const TableElement = (props) => {
    //need to send below props
    // 1- Title "" -->   title
    // 2 - HeaderList [] --> headerList 
    // 3- table list data []  --> metaData
    return (

        <>
            <h1 style={{ float: 'left' }}>{props.title}</h1>
            <Table celled>
                <Table.Header>
                    <Table.Row>

                        {props.headerList.map(header => (<Table.HeaderCell>{header.title}</Table.HeaderCell>))}

                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {props.metaData && props.metaData.length > 0 ?
                        props.metaData.map((data, index) => {
                            return (
                                <Table.Row key={index}>
                                    {props.headerList.map(header => (
                                        <Table.Cell>{data[header.key]}</Table.Cell>
                                    ))}
                                </Table.Row>
                            )
                        })
                        : (<h2>No record found </h2>)}
                </Table.Body>
            </Table>
        </>
    )
}

export default TableElement;