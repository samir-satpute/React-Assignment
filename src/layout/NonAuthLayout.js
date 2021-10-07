import React,{ Fragment } from "react"

const NonAuthLayout =(props) =>{


    return(
        <Fragment>
            {props.children}
        </Fragment>
    )
}

export default NonAuthLayout