import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import 'antd/dist/antd.css';
import { AppContainer } from 'react-hot-loader'

const mountNode = document.getElementById("app");
ReactDOM.render(<AppContainer><App /></AppContainer>, mountNode);