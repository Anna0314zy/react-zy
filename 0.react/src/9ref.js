import React from 'react';
import ReactDOM from 'react-dom';
class Form extends React.Component{
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    getFocus = () => {

    }
    render() {
        return (
            <>
            <TextInput ref={this.textInput} />
            <button onClick={this.getFocus}>focus</button>
            </>
        )
    }
}
class TextInput extends React.Component{
    render() {
        return (
             <input />
        );
    }
}
ReactDOM.render(<Form/>, document.getElementById('root'));