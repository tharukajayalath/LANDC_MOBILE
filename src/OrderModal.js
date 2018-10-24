/**
 * Created by Tharuka Jayalath on 08/19/2018
 */

import React, {Component} from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import {ExcelExport} from '@progress/kendo-react-excel-export';
import {executePostApiCall} from './ApiUtil';
import {OrderStatus}from './Constants';


export default class OrderModal extends Component{

    _export;
    export = ()=>{
        this._export.save();
    };

    constructor(props){
        super(props);
        this.state ={
            orderStatus:undefined
        }
    }
    updateDeliveryStatus = (orderStatus)=>{
      this.setState({orderStatus})  ;
    };

    updateOrder = (order, cb)=>{
        const _id = order._id;
        delete order._id;
        if(this.state.orderStatus !==undefined){
            order.status=this.state.orderStatus;
        }
        console.log('order', order);

        executePostApiCall(`/order/update?_id=${_id}`,order).then(res=>{
            console.log('res',res);
            cb();
        }).catch(err=>{
           console.error(err);
        });
    };


    render(){
        return(
            <div className="modal" tabIndex="-1" role="dialog" id={'myModal'}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.orderName}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.props.handleClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <ExcelExport data={this.props.items}
                                         ref={(exporter)=>{ this._export = exporter;}
                                         }>
                            <Grid data={this.props.items}>
                                <GridToolbar>
                                    <button title={'Export Table as Excel'}
                                            className={'k-button k-primary'}
                                            onClick={this.export}>
                                        Export Excel
                                    </button>
                                </GridToolbar>

                                <Column field={'name'} title={'Item Name'}/>
                                <Column field={'quantity'} title={'Quantity'}/>
                                <Column field={'description'} title={'Description'}/>
                            </Grid>

                            </ExcelExport>

                        </div>
                        <div className="modal-footer">

                            <div className="dropdown">
                                <button className="btn btn-info dropdown-toggle" type="button"
                                        id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                    Select Processing State
                                </button>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={()=>{this.updateDeliveryStatus(OrderStatus.IN_PROCESSING)}}>In Processing</a>
                                    <a className="dropdown-item" onClick={()=>{this.updateDeliveryStatus(OrderStatus.IN_DELIVERY)}}>In Delivery</a>
                                    <a className="dropdown-item" onClick={()=>{this.updateDeliveryStatus(OrderStatus.DELIVERY_SUCCESS)}}>Successfully Delivered</a>
                                    <a className="dropdown-item" onClick={()=>{this.updateDeliveryStatus(OrderStatus.DELIVEY_FAILED)}}>Delivery Failed</a>
                                    <a className="dropdown-item" onClick={()=>{this.updateDeliveryStatus(OrderStatus.DEFAULT)}}>Default</a>
                                </div>
                            </div>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={()=>{
                                this.updateOrder(this.props.order,this.props.handleClose);
                            }
                                }>Update</button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
