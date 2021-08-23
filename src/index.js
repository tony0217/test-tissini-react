
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./App";
import './auth/auth.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import {AuthGoogle} from './auth/auth';
import dotenv from 'dotenv';
dotenv.config();



// const authGoogle = new AuthGoogle();
// authGoogle.onInit();


const root = document.querySelector('#root');
ReactDOM.render(<App />, root);





