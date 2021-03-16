import React from "react";
import './Home.css';
import Sticker from './Sticker/Sticker.js';
import UserRegister from './UserRegister/UserRegister.js';
import * as csrfUtil from 'Utilities/csrf.js';

export default class Home extends React.Component {
  #matchingSocket;
  #startMatching = () => {
    if (this.state.userName == null) {
      alert("please login first");
      return;
    }
    this.setState({ matching: true });
  };
  #cancelMatching = () => {
    console.log("match canceled");
    this.setState({ matching: false });
  };
  #startSinglePlay = () => {
    if (this.state.userName == null) {
      alert("please login first");
      return;
    }
    if (window.confirm("Are you sure to start single play?")) {
      this.#cancelMatching();
      location.href = location.protocol + "//" + location.host + "/gamemain/singlePlay";
    }
  }
  #popupUserRegisterForm = () => {
    this.setState({ show_register_form: true });
  };
  #userRegisterHandleClose = (userName = null) => { this.setState({ show_register_form: false, userName: userName }); };
  #popupUserLogoutForm = () => {
    if (window.confirm("Do you really want to Logout?")) {
      this.#cancelMatching();
      fetch(location.protocol + "//" + location.host + "/portal/logout", {
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
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.matching == false && this.state.matching == true) {
      let websocketProtocol = location.protocol === "https:" ? 'wss:' : 'ws:';
      this.#matchingSocket = new WebSocket(websocketProtocol + '//' + location.host + '/ws/portal/matching/');
      this.#matchingSocket.onopen = (e) => {
      };
      this.#matchingSocket.onmessage = (e) => {
        alert("match found. click to enter match.");
        location.href = location.protocol + "//" + location.host + "/gamemain/";
      };
      this.#matchingSocket.onclose = function (e) {
        console.error('Game match making failed. Socket closed unexpectedly');
      };
    }
    if (prevState.matching == true && this.state.matching == false)
      this.#matchingSocket.close();
  }
  render() {
    let start_sticker, single_play_sticker, user_sticker, user_register;
    if (this.state.matching === false) {
      single_play_sticker =
        <Sticker className="single-play-sticker" action={this.#startSinglePlay}>
          <h1>&emsp;Single Play&emsp;</h1>
        </Sticker>;
      start_sticker =
        <Sticker className="start-sticker" action={this.#startMatching}>
          <h1>&emsp;START&emsp;</h1>
        </Sticker>;
    } else {
      single_play_sticker =
        <Sticker className="single-play-sticker" >
          <h1>&emsp;<del>Single Play&emsp;</del></h1>
        </Sticker>;
      start_sticker =
        <Sticker className="start-sticker" action={this.#cancelMatching}>
          <h1>&emsp;IN QUEUE&emsp;</h1>
        </Sticker>;
    }
    if (this.state.show_register_form) {
      user_register = <UserRegister className="user-register" handleClose={this.#userRegisterHandleClose} />;
    }
    if (this.state.userName == null) {
      user_sticker =
        <div>
          <Sticker className="user-sticker" action={this.#popupUserRegisterForm}>
            <h1>&emsp;PLEASE LOGIN&emsp;</h1>
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
        {user_sticker}
        {single_play_sticker}
        {start_sticker}
        {user_register}
      </div>
    );
  }
}
