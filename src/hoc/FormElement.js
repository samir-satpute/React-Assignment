import React from 'react';

import { Form, Radio } from 'semantic-ui-react';

const formInput =(props) =>{

    const onChangeHandler = (e) =>{
        return [e.target.name] = e.target.value
    }

    return(
        <Form.Input 
        fluid 
        error={props.error}
        iconPosition={props.iconPosition ? props.iconPosition : 'user'}
        type={props.type ? props.type : 'text'}
        icon={props.icon ? props.icon : 'user'}
        placeholder={props.placeholder}
        name={props.name}
        onChange={onChangeHandler}
        ref={props.ref}
        >        
        </Form.Input>
    )
}


const radioInput =(props) => {
  
    return(
        <Radio
            label={props.label}
            name={props.name}
            value={props.value}
            checked={props.checked}
            onChange={props.onChange}
        />
    )
}

const formElement ={
    formInput : formInput,
    radioInput: radioInput,
}


export default (HocComponent) =>{
    return () =>{
        return  <HocComponent {...formElement}/>
    }
}




























// import React, { useState } from 'react';
// import { Form, Radio } from 'semantic-ui-react';


// const FormElements =  (props, initialFormData = {}, initialFormError = {}) => {




//     const [formData, setformData] = useState(initialFormError);
//     const [formError, setformError] = useState(initialFormError);


//     // console.log("new hoc -------->", props)


//     const onChange = (e) => {
//         setformData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     }

//     const onBlur = (event, rules) => {
//         console.log("rules", rules)
//     }

//     const formInput = (props) => {
//         return (
//             <Form.Input
//                 error={props.error}
//                 iconPosition={props.iconPosition ? props.iconPosition : 'user'}
//                 type={props.type ? props.type : 'text'}
//                 icon={props.icon ? props.icon : 'user'}
//                 placeholder={props.placeholder}
//                 name={props.name}
//                 onChange={onChange}
//                 onBlur={(e) => onBlur(e, props.rules || [])}
//                 {...props}
//             />
//         )
//     }
    
//     const smartElement = {
//         formInput : formInput,
//     }
//     const formMeta = {
//         smartElement,
//         // formErrors:formError,
//         // data:formData
//     }

// // return(
// //     <WropComponent {...formMeta} />

// // )
// return function WrapComponent(){
//     return (
//         <WrapComponent {...formMeta} />
//     )
// }
// }

// export default FormElements;

// // export default (HocComponent) =>{
// //     return () =>{
// //         return  <HocComponent {...FormElements}/>
// //     }
// // }
























