import React from 'react';

import { Form } from 'semantic-ui-react';


const fromElement =(props) =>{
    return(
        <Form.Input 
        fluid 
        iconPosition={props.iconPosition}
        type={props.type}
        placeholder={props.placeholder}
        icon={props.icon}
        name={props.name}
        onChange={props.onChange}
        >        
        </Form.Input>
    )
}

export default (HocComponent) =>{
    return () =>{
        return  <HocComponent fromElement={fromElement}/>
    }
}

//export default FromElement;