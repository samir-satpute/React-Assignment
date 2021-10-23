import React from 'react';
import { Radio, Form } from 'semantic-ui-react';
import { Validations } from '../helperFunctions/Validation';
import { map } from 'lodash';

export default function HocComponent(WrappedComponent, initialFormObj = {}, initialFormErrors = {}) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                formValue: initialFormObj,
                formErrors: initialFormErrors,
                isDirtyForm: false
            }
        }

        getFromValue = (formValues) => {
            this.setState({ formValue: { ...this.state.formValue, ...formValues } });
            this.setState({formErrors: JSON.parse(JSON.stringify(this.state.formErrors).replaceAll('false', 'true'))})
        }

        onChange = (event) => {
            this.setState({ isDirtyForm: true })
            this.setState({ formValue: { ...this.state.formValue, [event.target.name]: event.target.value } })
        };


        onBlur = (event, rules) => {
            this.setState({ isDirtyForm: true })
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
                    label={props.label}
                    value={props.value}
                    iconPosition={props.iconPosition ? props.iconPosition : 'user'}
                    type={props.type ? props.type : 'text'}
                    icon={props.iconss}
                    placeholder={props.placeholder}
                    name={props.name}
                    onChange={this.onChange}
                    onBlur={(e) => this.onBlur(e, props.rules || [])}
                    {...props}
                />
            )
        }

        handleRadioChange = (event, { value, name, }) => {
            this.setState({ formValue: { ...this.state.formValue, [name]: value } })
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

        handleSelectChange = (event, { value, name, rules }) => {
            this.setState({ formValue: { ...this.state.formValue, [name]: value } })
            // if (rules.length) {
            //     const valid = rules.map((r) =>
            //         ({ [r]: Validations(r, value) })
            //     )
            //     this.setState({ formErrors: { ...this.state.formErrors, name: valid } })
            // }
        }
        formSelect = (props) => {
            return (
                <Form.Select
                    fluid
                    label={props.label}
                    options={props.options}
                    name={props.name}
                    onChange={this.handleSelectChange}
                    // onBlur={(e) => this.onBlur(e, props.rules || [])}
                    placeholder={props.placeholder}
                    {...props}
                />
            )
        }

        render() {
            const smartElement = {
                formInput: this.formInput,
                fromRadio: this.fromRadio,
                formTextArea: this.formTextArea,
                formSelect: this.formSelect,
                //getValues: () => this.state.formValue,

            }
            const formMeta = {
                smartElement,
                formErrors: this.state.formErrors,
                data: this.state.formValue,
                getFromValue: this.getFromValue,
                isDirtyForm: this.state.isDirtyForm,
                isValidForm:() => map(this.state.formErrors, (f) => f.every(r => !!Object.values(r)[0]))
            }
            return <WrappedComponent {...formMeta} />
        }
    }
}