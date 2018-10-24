/**
 * Created by Tharuka Jayalath on 07/14/2018
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pages} from './Constants';
import {setOrders} from './store/Reducers';
import {executGetApiCall} from "./ApiUtil";
import Datetime from 'react-datetime';

class Orders extends Component{

    componentDidMount(){
/*        return executGetApiCall(`/admin/getOrders`).then(response=>{
            console.debug(response);
            this.props.setOrders(response.data);

        }).catch(error=>{
            console.error(error);
        });*/
    }



    render(){
        const {renderMe, orders} = this.props;
        return (
            renderMe? <div>
                <div>
                <Datetime inputProps={{placeholder: 'Click to filter by Order created date time'}}
                          onBlur={(selectedDate)=>{console.log(selectedDate.format('YYYY-MM-DD HH:MM:SS'))}}/>
                </div>
                <table className={'table table-striped'}>
                    <thead>
                    <tr>
                        <th scope={'col'}>Order Created Time</th>
                        <th scope={'col'}>Order Name</th>
                        <th scope={'col'}>Customer</th>
                        <th scope={'col'}>Contact Number</th>
                        <th scope={'col'}>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders && orders.length>0 ?
                        orders.map(order=>{
                            return (
                                <tr key={order.contactNumber+order.orderId}>
                                    <th style={{textAlign: 'left'}} scope={'row'} onClick={()=>{console.debug(order)}}>{order.createdTimeStamp}</th>
                                    <td style={{textAlign: 'left'}}>{order.orderName}</td>
                                    <td style={{textAlign: 'left'}}>{order.name}</td>
                                    <td style={{textAlign: 'left'}}>{order.contactNumber}</td>
                                    <td style={{textAlign: 'left'}}>{order.address}</td>
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
    renderMe: state.currentPage ===  Pages.ORDERS_PAGE,
    orders: state.orders
  };
};
const actions = {
    setOrders
};

export default connect(mapStateToProps,actions)(Orders);

