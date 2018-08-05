import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavbarTab from './NavbarTab';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import adminPortal from './store/Reducers';
import Orders from './Orders';
import Users from './Users';
import {Pages} from './Constants';

class AdminPortal extends Component {
  render() {
    return (
      <div className="App">
          <div className="container-fluid">
              <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <a className="navbar-brand" href="#">
                      <img src={logo} width={40} height={40} alt={""}/>
                  </a>
                  <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                          <NavbarTab reference={Pages.HOME_PAGE} active={true} myName={'Home'}/>
                          <NavbarTab reference={Pages.USERS_PAGE} active={false} myName={'Users'}/>
                          <NavbarTab reference={Pages.ORDERS_PAGE} active={false} myName={'Orders'}/>
                      </ul>
                  </div>
              </nav>

              <Orders/>
              <Users/>
          </div>

      </div>
    );
  }
}

const middleWares = [thunk, logger];

const store = compose(applyMiddleware(...middleWares))(createStore)(adminPortal,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const  App = ()=>{
    return (
        <Provider store={store}>
            <AdminPortal/>
        </Provider>
    );
};
export default App;
