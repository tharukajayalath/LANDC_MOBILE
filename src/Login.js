/**
 * Created by Tharuka Jayalath on 09/29/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {executePostApiCall} from './ApiUtil';
import {setOk} from './store/Reducers';


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            uname: null,
            psw: null
        }
    }

    login = () => {
        const {uname, psw} = this.state;
        if (uname && psw) {
            return executePostApiCall(`/login`, {uname, psw}).then(res => {
                console.log(res);
                if (res.statusCode === 200) {

                    localStorage.setItem('ok', 'yes');

                    this.props.setOk(true);
                    window.location.reload();
                }
            })
        }
    };


    handleBlur = (e) => {
        const {value, name} = e.target;
        if (name === 'uname') {
            if (value) {
                this.setState({uname: value});
            } else {
                this.setState({uname: null});
            }
        } else if (name === 'psw') {
            if (value) {

                this.setState({psw: value});
            } else {
                this.setState({psw: null})
            }
        }
    };


    render() {
        return (
            <div className="modal" tabIndex="-1" role="dialog" id={'myModal'}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Admin Portal Login</h5>
                        </div>
                        <div className="modal-body">

                            <form className="login-modal-content animate">

                                <div className="login-container">
                                    <label htmlFor="uname"><b>Username</b></label>
                                    <input id="uname" type="text" className={'form-control'}
                                           placeholder="Enter Username" onBlur={this.handleBlur} name="uname" required/>

                                    <label htmlFor="psw"><b>Password</b></label>
                                    <input id="psw" type="password" className={'form-control'}
                                           placeholder="Enter Password" onBlur={this.handleBlur} name="psw" required/>

                                    <button type="button" style={{'margin': '10px', 'marginLeft': '0', 'width': '200px' }} className={'btn btn-secondary'} onClick={this.login}>Login</button>

                                </div>

                                <div className="login-container" style={{'backgroundColor': '#f1f1f1', 'height': '20px'}}>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>

        );
    }

}


const actions = {
    setOk
};

const mapStateToProps = (state) => {
    return {}
};


export default connect(mapStateToProps, actions)(Login);
