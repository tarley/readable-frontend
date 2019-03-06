import React, {Component} from 'react';
import {Alert} from 'reactstrap';
import {isNullOrEmpty} from '../../utils/Helpers';

class FormBase extends Component {
	validate(key, value) {
		const {validate} = this.state;

    	validate[key] = isNullOrEmpty(value) ? 'has-danger' : 'has-success';
    	
    	this.setState({
    		[key]: value,
    		validate
    	});
	}
	componentAppMensage() {
		const {message} = this.state;

		if(message)
			return (
				<Alert color={message.color} toggle={() => this.clearMessage()}>{message.text}</Alert>
			);
	}
	showMessage(text, type='success') {
		this.setState({
			message: {color: type, text}
		});
	}
	clearMessage() {
		this.setState({
			message: undefined
		});
	}
}

export default FormBase;