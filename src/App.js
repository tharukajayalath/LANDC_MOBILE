import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import adminPortal from './store/Reducers';
import CompositeApp from './CompositeApp';

// You can import style files in ./App.js and add global styles in ./App.css
import '@progress/kendo-theme-default/dist/all.css';
import '@progress/kendo-ui';

const middleWares = [thunk, logger];

const store = compose(applyMiddleware(...middleWares))(createStore)(adminPortal,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const  App = ()=>{
    return (
        <Provider store={store}>
            <CompositeApp/>
        </Provider>
    );
};
export default App;
