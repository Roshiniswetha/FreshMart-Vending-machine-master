import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter ,
  Switch,
    Route,
  NavLink
} from "react-router-dom";

import './index.css';
import './App.css';
import App from './App';
import NewApp from './NewApp';
import * as serviceWorker from './serviceWorker';
import Main from './vendingmachine/NewMain';
import { createBrowserHistory } from "history";

 const browserHistory = createBrowserHistory();
  
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter history={browserHistory}>
      <Main/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
