/**
 * Created by Tharuka Jayalath on 06/19/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setCurrentPage} from './store/Reducers';

class NavbarTab extends Component{

    render(){
        return (
            <li className={"nav-item "+this.props.active? "active": ""}>
                <a className="nav-link" onClick={()=>{this.props.setCurrentPage(this.props.reference)}}>{this.props.myName} <span className="sr-only">(current)</span></a>
            </li>
        );
    }
}

const mapStateToProps = (state)=>{
    return {

    }
};
const actions = {
    setCurrentPage,
};

export default connect(mapStateToProps, actions)(NavbarTab);
