/**
 * Created by Tharuka Jayalath on 07/14/2018
 */

import React, {Component} from 'react';
import {connect} from "react-redux";
import {Pages} from './Constants';
import {setUsers, setUsersMap} from './store/Reducers';
import {executGetApiCall} from "./ApiUtil";
import {createUsersMap} from './CommonUtil';


import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { DatePicker , TimePicker, } from '@progress/kendo-react-dateinputs';
import {ExcelExport} from '@progress/kendo-react-excel-export';
import { orderBy } from '@progress/kendo-data-query';
import UserModal from "./UserModal";

class Users extends Component{


    _export;
    _grid;
    export = ()=>{
        this._export.save();
        console.log(this._grid)
    };
    constructor(props){
        super(props);
        this.pageChange = this.pageChange.bind(this);
        this.updatePagerState = this.updatePagerState.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = this.createState(0, 10);
        this.modalRef = React.createRef();

    }

    pageChange(event) {
        console.debug(event.page.skip);
        console.debug(event.page.take);
        this.setState(this.createState(event.page.skip, event.page.take));
    }

    createState(skip, take) {
        const {users} = this.props;
        console.log('users', users);
        return {
            items: users ? this.getUsers(users,[]).slice(skip, skip + take): [],
            total: users? users.length: 0,
            skip: skip,
            pageSize: take,
            pageable: this.state ? this.state.pageable : {
                buttonCount: 5,
                info: true,
                type: 'numeric',
                pageSizes: true,
                previousNext: true
            },
            sort:[],
            showModal: false,
            currentUser: null,
            exportExcelWithItems: false
        };
    }

    updatePagerState(key, value) {
        const newPageableState = Object.assign({}, this.state.pageable, { [key]: value });
        this.setState(Object.assign({}, this.state, { pageable: newPageableState }));
    }
    //handling sorting functionality
    getUsers = (users, sort)=>{
        return orderBy(users, sort);
    };
    onSortChange = (event)=>{
        const{skip, pageSize} = this.state;
        console.log(skip);
        // console.log(take);
        this.setState({
            sort: event.sort,
            items: this.getUsers(this.props.orders, event.sort).slice(skip,skip+pageSize)
        });
        console.log(this.getUsers(this.props.orders, event.sort).slice(0,5));
    };
    componentDidMount(){
        return executGetApiCall(`/admin/getUsers`).then(response=>{
            console.debug(response);
            this.props.setUsers(response.data);
            console.log('users', response.data);
            this.setState({items: this.getUsers(response.data,[]).slice(0, 10)});
            this.props.setUsersMap(createUsersMap(response.data));
        }).catch(error=>{
            console.error(error);
        });
    }

    handleClose(){
        this.setState({showModal: false});
    }

    render(){
        const {renderMe, users} = this.props;
        console.debug(this.props);
        return (
            renderMe? <div>

                {this.state.showModal ? <UserModal ref={this.modalRef}
                                                    user={this.state.currentUser}
                                                    handleClose={this.handleClose}/> : null}

              <ExcelExport data={this.props.users}
                             ref={(exporter)=>{ this._export = exporter;}
                             }>
                    <Grid ref={(grid) => { this._grid = grid; }}
                          data={this.state.items}
                          onPageChange={this.pageChange}
                          total={this.state.total}
                          skip={this.state.skip}
                          pageable={{
                              buttonCount: 5,
                              info: true,
                              type: 'numeric',
                              pageSizes: true,
                              previousNext: true
                          }}
                          pageSize={this.state.pageSize}
                          sortable={{allowUnsort: true, mode: 'multiple'}}
                          onSortChange={this.onSortChange}
                          onRowClick={(dataItem)=>{
                              const node = this.modalRef.current;
                              console.debug(node);
                              this.setState({currentUser: dataItem.dataItem, showModal: true});
                              // node.refs.style.display = 'inherit'

                              console.log(dataItem);
                              /*
                                                            $('#myModal').on('shown.bs.modal', function () {
                                                                $('#myInput').trigger('focus');
                                                            });*/
                          }
                          }

                    >
                        <GridToolbar>
                            <button title={'Export Table as Excel'}
                                    className={'k-button k-primary'}
                                    onClick={this.export}>
                                Export Excel
                            </button>
                        </GridToolbar>

                        <Column field={'_id'} title={'Email'} width={'220px'}/>
                        <Column field={'name'} title={'Customer Name'} width={'240px'}/>
                        <Column field={'contactNumber'} title={'Contact Number'} width={'150px'}/>
                        <Column field={'address'} title={'Address'} width={'600px'}/>
                    </Grid>
                </ExcelExport>

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
    setUsersMap
};

export default connect(mapStateToProps,actions )(Users);
