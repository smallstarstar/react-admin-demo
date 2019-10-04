import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './redux/store';


/**
 * 注册相应拦截
 */
axios.interceptors.response.use((res)=>{
    return res.data;
})

ReactDOM.render(
    <Provider store={store}>
     <App />
    </Provider>
    , document.getElementById('root'));




serviceWorker.unregister();
