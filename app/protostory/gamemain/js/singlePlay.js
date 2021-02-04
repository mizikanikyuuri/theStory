import React from "react";
import ReactDOM from "react-dom";

import Game from "./Game";

import 'bootstrap/dist/css/bootstrap.min.css';

const app = document.getElementById('app');
let websocketProtocol=location.protocol==="https:"?'wss:':'ws:';
ReactDOM.render(<Game webSocketUrl={websocketProtocol+'//'+location.host+'/ws/gameMain/singlePlayConsumer/'} />, app);
