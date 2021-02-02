import React from "react";
import ReactDOM from "react-dom";

import Game from "./Game";

import 'bootstrap/dist/css/bootstrap.min.css';

const app = document.getElementById('app');
ReactDOM.render(<Game webSocketUrl={'ws://'+window.location.host+'/ws/gameMain/singlePlayConsumer/'} />, app);
