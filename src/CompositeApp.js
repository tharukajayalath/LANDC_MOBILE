/**
 * Created by Tharuka Jayalath on 10/01/2018
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import logo from './logo.png';
import './App.css';
import NavbarTab from './NavbarTab';
import Orders from './Orders';
import Users from './Users';
import TestKendo from './TestKendo';
import Login from './Login'
import {Pages} from './Constants';
import {executGetApiCall} from '../src/ApiUtil';
import {setOk} from './store/Reducers';

// You can import style files in ./App.js and add global styles in ./App.css
import '@progress/kendo-theme-default/dist/all.css';
import '@progress/kendo-ui';

/*const logout = ()=>{
    console.log('clicked')
    executGetApiCall('/logout').then(res=>{
        this.props.setOk(false);
        localStorage.removeItem('ok');
    }).catch(err=>{

    });
};*/

class CompositeApp extends Component {

    logout = ()=>{
        console.log('clicked')
        executGetApiCall('/logout').then(res=>{
            this.props.setOk(false);
            localStorage.removeItem('ok');
        }).catch(err=>{

        });
    };

    render() {
        return (
            <div className="App">
                {this.props.ok?
                    <div className="container-fluid">
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a className="navbar-brand" href="#">
                                <img src={logo} width={40} height={40} alt={""}/>
                            </a>
                            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                                    <NavbarTab reference={Pages.HOME_PAGE} active={true} myName={'Orders'}/>
                                    <NavbarTab reference={Pages.USERS_PAGE} active={false} myName={'Users'}/>
                                </ul>
                                <form className="form-inline my-2 my-lg-0">

                                    <button className="btn btn-outline-success my-2 my-sm-0" type="button" onClick={this.logout}>Log Out</button>

                                </form>
                            </div>
                        </nav>

                        <Orders/>
                        <Users/>
                        <TestKendo/>
                    </div>
                    :
                    <Login/>

                }


            </div>
        );
    }
}

const mapStateToProps = (state)=>{

    return{
        ok: state.ok
    }
};

export default connect(mapStateToProps,{setOk})(CompositeApp);
