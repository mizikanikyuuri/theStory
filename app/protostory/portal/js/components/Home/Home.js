import React from "react";
import './Home.css';
import Sticker from './Sticker/Sticker.js';
import UserRegister from './UserRegister/UserRegister.js';
import * as csrfUtil from 'Utilities/csrf.js';

export default class Home extends React.Component {
  #matchingSocket;
  #startMatching = () => {
    this.setState({ matching: true });
    this.#matchingSocket = new WebSocket('ws://localhost:8080/ws/portal/matching/');
    
    this.#matchingSocket.onopen = (e) => {
    };
    this.#matchingSocket.onmessage = (e) => {
      alert(e);
      window.location.href = "http://localhost:8080/gamemain/";
    };
    this.#matchingSocket.onclose = function (e) {
      console.error('Game match making failed. Socket closed unexpectedly');
    };
  };
  #cancelMatching= () => {
    console.log("match canceled");
    this.setState({ matching: false });
    this.#matchingSocket.close();
  };
  #popupUserRegisterForm = () => {
    this.setState({ show_register_form: true });
  };
  #userRegisterHandleClose = (userName = null) => { this.setState({ show_register_form: false, userName: userName }); };
  #popupUserLogoutForm = () => {
    if (window.confirm("Do you really want to Logout?")) {
      if(this.#matchingSocket!==null)
        this.#matchingSocket.close();
      fetch("http://localhost:8080/portal/logout", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'X-CSRFToken': csrfUtil.getCookie('csrftoken')
        },
      })
        .then(
          (result) => {       //fetch成功時
            this.setState({ userName: null });
            alert("logout done");
          },
          (error) => {        //fetch失敗時
            this.setState({
              processing: false,
            });
            alert("logout failed. " + error);
          }
        )
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      matching: false,
      show_register_form: false,
      userName: null,
    };
  }
  render() {
    let start_sticker, user_sticker;
    if (this.state.matching === false) {
      start_sticker =
        <Sticker className="start-sticker" action={this.#startMatching}>
          <h1>&emsp;START&emsp;</h1>
        </Sticker>;
    } else {
      start_sticker =
        <Sticker className="start-sticker" action={this.#cancelMatching}>
          <h1>&emsp;IN QUEUE&emsp;</h1>
        </Sticker>;
    }
    if (this.state.userName == null) {
      user_sticker =
        <div>
          {this.state.show_register_form ?
            <UserRegister className="user-register" handleClose={this.#userRegisterHandleClose} />
            : null}
          <Sticker className="user-sticker" action={this.#popupUserRegisterForm}>
            <h1>&emsp;PLEAZE LOGIN&emsp;</h1>
          </Sticker>
        </div>
    } else {
      user_sticker =
        <Sticker className="user-sticker" action={this.#popupUserLogoutForm}>
          <h1>&emsp;{this.state.userName}&emsp;</h1>
        </Sticker>
    }
    return (
      <div className="portal-home">
        <img className="home-content-background"
          src="../static/portal/img/main_background16_9.jpg"
          alt="main content back ground"
        />
        {user_sticker}

        {start_sticker}
      </div>
    );
  }
}
