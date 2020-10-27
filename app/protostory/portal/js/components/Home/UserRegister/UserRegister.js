import React from "react";
// import './UserRegister.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import * as csrfUtil from 'Utilities/csrf.js';

export default class UserRegister extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            processing: false,
            form_Username:'',
            form_Password:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.userRegister = this.userRegister.bind(this);
    }
    userRegister() {
        var formData = new FormData();
        formData.append("username", this.state.form_Username);
        formData.append("password", this.state.form_Password);
        fetch("http://localhost:8080/portal/login", {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'X-CSRFToken': csrfUtil.getCookie('csrftoken')
            },
            body: formData
        })
            .then(res => res.json())
            .then(
                (result) => {       //fetch成功時
                    this.setState({
                        processing: false,
                    });
                    if (result.login === 'success') {
                        this.props.handleClose(this.state.form_Username);
                    } else {
                        alert('Login failed.Maybe password is wrong or username is already exist.');
                    }
                },
                (error) => {        //fetch失敗時
                    this.setState({
                        processing: false,
                    });
                    alert(error);
                }
            )
        this.setState({ processing: true });
    }
    handleChange(event) {
        event = event.nativeEvent;
        let settingState = {};
        settingState['form_' + event.target['ariaLabel']] = event.target.value;
        this.setState(settingState);
    }
    render() {
        return (
            <Modal.Dialog className={this.props.className} >
                <Modal.Header closeButton onHide={this.props.handleClose}>
                    <Modal.Title>User Registing</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <InputGroup >
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">User Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="text"
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="UsernameInput"
                            value={this.state['form_Username']}
                            onChange={this.handleChange}
                        />

                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="PasswordInput"
                            value={this.state['form_Password']}
                            onChange={this.handleChange}
                        />
                    </InputGroup>
                </Modal.Body>

                <Modal.Footer >
                    <Button variant="primary"
                        onClick={this.userRegister}
                        disabled={this.state.processing ? true : false}>Login</Button>
                </Modal.Footer>
            </Modal.Dialog>
        );

    }
}
