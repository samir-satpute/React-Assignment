import React from "react";

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            errorOccure: false
        }
    }

    static getDerivedStateFromError(error) {         // this method is catch the error in anywhere in application
        return{
            errorOccure: true
        }
    }

    componentDidCatch(error) {
        console.log("error in error boundry -->",error);   // this will log the error on console
    }

    render(){
        if(this.state.errorOccure) {
            return <h1>Error catch in error Boundry</h1>
        }
        return this.props.children
    }
}
export default ErrorBoundary;     // place this component in top-level route components