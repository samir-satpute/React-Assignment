import React from 'react';
import { Radio, Form } from 'semantic-ui-react';
import { Validations } from '../helperFunctions/Validation';

export default function HocComponent(WrappedComponent, initialFormObj = {}, initialFormErrors = {}) {

    return class extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                formValue: initialFormObj,
                formErrors: initialFormErrors
            }
            // console.log("initilal form", initialFormObj)
        }

        componentDidMount() {
            // console.log("initilal form did mount ----->", initialFormObj)
        }

        handleRadioChange = (event, { value, name }) => {
            this.setState({ formValue: { ...this.state.formValue, [name]: value } })
        }
        onChange = (event) => {
            this.setState({ formValue: { ...this.state.formValue, [event.target.name]: event.target.value } })
        };


        onBlur = (event, rules) => {
            if (rules.length) {
                const valid = rules.map((r) =>
                    ({ [r]: Validations(r, event.target.value) })
                )
                this.setState({ formErrors: { ...this.state.formErrors, [event.target.name]: valid } })
            }
        };

        formInput = (props) => {
            return (
                <Form.Input
                    iconPosition={props.iconPosition ? props.iconPosition : 'user'}
                    type={props.type ? props.type : 'text'}
                    icon={props.icon ? props.icon : 'user'}
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={this.onChange}
                    onBlur={(e) => this.onBlur(e, props.rules || [])}
                    {...props}
                />
            )
        }

        fromRadio = (props) => {
            return (
                <Radio
                    label={props.label}
                    name={props.name}
                    value={props.value}
                    checked={props.checked}
                    onChange={this.handleRadioChange}
                />
            )

        }
        formTextArea = (props) => {
            return (
                <Form.TextArea
                    name={props.name}
                    label={props.label}
                    placeholder={props.placeholder}
                    onChange={this.onChange}
                    onBlur={(e) => this.onBlur(e, props.rules || [])}
                    {...props}
                />)
        }


        render() {
            const smartElement = {
                formInput: this.formInput,
                fromRadio: this.fromRadio,
                formTextArea: this.formTextArea,
                getValues: () => this.state.formValue,
            }
            const formMeta = {
                smartElement,
                formErrors: this.state.formErrors,
                data: this.state.formValue
            }
            return <WrappedComponent {...formMeta} />
        }
    }
}