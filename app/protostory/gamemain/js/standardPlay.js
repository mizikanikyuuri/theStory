import React from "react";
import ReactDOM from "react-dom";

import Game from "./Game";

import 'bootstrap/dist/css/bootstrap.min.css';

const app = document.getElementById('app');
ReactDOM.render(<Game webSocketUrl={'ws://localhost:8080/ws/gameMain/standardPlayConsumer/'} />, app);
