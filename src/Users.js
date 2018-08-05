/**
 * Created by Tharuka Jayalath on 07/14/2018
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Pages} from './Constants';
import {setUsers} from './store/Reducers';
import {executGetApiCall} from "./ApiUtil";

class Users extends Component{

    constructor(props){
        super(props);
        this.state = {
            users: null
        }
    }

    componentDidMount(){
        return executGetApiCall(`/admin/getUsers`).then(response=>{
            console.debug(response);
            this.props.setUsers(response.data);

        }).catch(error=>{
            console.error(error);
        });
    }


    renderTableRow(){

    }
    comp

    render(){
        const {renderMe, users} = this.props;
        console.debug(this.props);
        return (
            renderMe? <div>
            <table className={'table table-striped'}>
                <thead>
                    <tr>
                        <th scope={'col'}>Name</th>
                        <th scope={'col'}>Email</th>
                        <th scope={'col'}>Contact No</th>
                        <th scope={'col'}>Address</th>
                    </tr>
                </thead>
                <tbody>
                {users && users.length>0 ?
                    users.map(user=>{
                        return (
                            <tr key={user.email}>
                                <th style={{textAlign: 'left'}} scope={'row'} onClick={()=>{console.debug(user)}}>{user.name}</th>
                                <td style={{textAlign: 'left'}}>{user.email}</td>
                                <td style={{textAlign: 'left'}}>{user.contactNumber}</td>
                                <td style={{textAlign: 'left'}}>{user.address}</td>
                            </tr>
                        );
                    })
                    : null}

                </tbody>

            </table>

            </div>: null
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        renderMe: state.currentPage ===  Pages.USERS_PAGE,
        users: state.users
    };
};
const actions = {
    setUsers,
};

export default connect(mapStateToProps,actions )(Users);
