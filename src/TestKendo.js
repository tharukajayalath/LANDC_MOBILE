/**
 * Created by Tharuka Jayalath on 08/11/2018
 */

import React, {Component} from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { DatePicker , TimePicker, } from '@progress/kendo-react-dateinputs';
import {ExcelExport} from '@progress/kendo-react-excel-export';
import { orderBy } from '@progress/kendo-data-query';
import {Pages} from "./Constants";
import {setOrders,setDisplayOrderGrid,setDateTime,setOrderGridData} from "./store/Reducers";
import connect from "react-redux/es/connect/connect";
import {executGetApiCall} from "./ApiUtil";
import { createOrderGridData, createExcelExportGrid} from "./CommonUtil";
import moment from 'moment';
import OrderModal from './OrderModal';
import ExcelExportComponent from "./ExcelExportComponent";
import InProcessingOrders from './InProcessingOrders';
import Default from './Default';
import InDelivery from './InDelivery';
import DeliverySuccess from './DeliverySuccess';
import DeliveryFailed from './DeliveryFailed';

class TestKendo extends Component{

    _export;
    _grid;
    export = ()=>{
        this._export.save();
        console.log(this._grid)
    };

    constructor(props) {
        super(props);
        this.state = this.createState(0, 10);
        this.pageChange = this.pageChange.bind(this);
        this.updatePagerState = this.updatePagerState.bind(this);
        this.modalRef = React.createRef();
        this.excelRef = React.createRef();
        this.handleClose = this.handleClose.bind(this);
    }

    pageChange(event) {
        console.debug(event.page.skip);
        console.debug(event.page.take);
        this.setState(this.createState(event.page.skip, event.page.take));
    }

    createState(skip, take) {
        const {orders} = this.props;
        return {
            items: orders ? this.getOrders(orders,[]).slice(skip, skip + take): [],
            total: orders? orders.length: 0,
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
            fromDate: null,
            toDate: null,
            fromTimeHours:null,
            fromTimeMinutes: null,
            toTimeHours:null,
            toTimeMinutes: null,
            showModal: false,
            currentOrder: null,
            exportExcelWithItems: false
        };
    }

    updatePagerState(key, value) {
        const newPageableState = Object.assign({}, this.state.pageable, { [key]: value });
        this.setState(Object.assign({}, this.state, { pageable: newPageableState }));
    }



    handleChange = (event)=>{
        // console.log(event);
        const name = event.target.name;
        const value = event.target.valsetue;
        // console.log(event.target.state.value);
        console.log(name);
        // console.log(value.getTime()me);
        console.log(value.getHours());
        console.log(value.getMinutes());
        console.log(value.getSeconds());
        // console.log(value.getDate());
        // console.log(event.target);
        // console.log(value.getMonth());
        // console.log(value.getY());

        this.props.setDateTime({name: name, value: value});
    };

    //handling sorting functionality
    getOrders = (orders, sort)=>{
        return orderBy(orders, sort);
    };

    componentWillReceiveProps(nextProps){

        if(this.state.items && this.state.items.length === 0 && nextProps.orders){
            // this.getOrders(orders,[]).slice(skip, skip + take)
            // const{skip, take} = this.state;
            // this.setState({items: this.getOrders(nextProps.orders, []).slice(0, 10)});
        }
    }

    onSortChange = (event)=>{
        const{skip, pageSize} = this.state;
        console.log(skip);
        // console.log(take);
      this.setState({
          sort: event.sort,
          items: this.getOrders(this.props.orders, event.sort).slice(skip,skip+pageSize)
      });
      console.log(this.getOrders(this.props.orders, event.sort).slice(0,5));
    };

    componentDidMount(){

        executGetApiCall(`/admin/getOrders`).then(response=>{
            console.debug(response);

            if(response && response.statusCode===200 ){

                if(response.data){

                    this.props.setOrders(response.data);
                    this.props.setOrderGridData(createOrderGridData(response.data, this.props.usersMap));
                    this.setState({items: this.getOrders(this.props.orderGridData, []).slice(0, 10)});
                    this.props.setDisplayOrderGrid(true);

                }   else {
                    this.props.setOrders([]);
                    this.props.setDisplayOrderGrid(false);
                    this.setState({items: []});
                }




            }

        })



    }

    handleClose(){
        this.setState({showModal: false});
    }

    render(){
        const {renderMe, fromDate, toDate, fromTimeHours, toTimeHours} = this.props;
        return(
            renderMe ?

            <div>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" style={{display: 'none'}}>
                        <a className="nav-link active" id="defalut-tab" data-toggle="tab" href="#defalut" role="tab"
                           aria-controls="default" aria-selected="true">Default(Need to Process)</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="default1-tab" data-toggle="tab" href="#default1" role="tab"
                           aria-controls="default1" aria-selected="false">Default(Need to Process)</a>
                    </li><li className="nav-item">
                        <a className="nav-link" id="in-processing-tab" data-toggle="tab" href="#inprocessing" role="tab"
                           aria-controls="inprocessing" aria-selected="false">In Processing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="in-delivery-tab" data-toggle="tab" href="#indelivery" role="tab"
                           aria-controls="indelivery" aria-selected="false">In Delivery</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="delivery-success-tab" data-toggle="tab" href="#deliverysuccess" role="tab"
                           aria-controls="deliverysuccess" aria-selected="false">Delivery Success</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="delivery-failed-tab" data-toggle="tab" href="#deliveryfailed" role="tab"
                           aria-controls="deliveryfailed" aria-selected="false">Delivery Failed</a>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" style={{display: 'none'}} id="default" role="tabpanel"
                         aria-labelledby="defalut-tab">

                    </div>
                    <div className="tab-pane fade" id="default1" role="tabpanel" aria-labelledby="default1-tab">
                        <Default/>
                    </div>
                    <div className="tab-pane fade" id="inprocessing" role="tabpanel" aria-labelledby="in-processing-tab">
                        <InProcessingOrders/>
                    </div>
                    <div className="tab-pane fade" id="indelivery" role="tabpanel" aria-labelledby="in-delivery-tab">
                        <InDelivery/>
                    </div>
                    <div className="tab-pane fade" id="deliverysuccess" role="tabpanel" aria-labelledby="delivery-success-tab">
                        <DeliverySuccess/>
                    </div>
                    <div className="tab-pane fade" id="deliveryfailed" role="tabpanel" aria-labelledby="delivery-failed-tab">
                        <DeliveryFailed/>
                    </div>
                </div>

            </div>

            :null

        );
    }
}





const mapStateToProps = (state)=>{
    return{
        renderMe: state.currentPage ===  Pages.HOME_PAGE,
        orders: state.orders,
        orderGridData: state.orderGridData,
        displayGrid: state.displayOrderGrid,
        fromTimeHours: state.fromTimeHours,
        fromTimeMinutes: state.fromTimeMinutes,
        toTimeHours: state.toTimeHours,
        toTimeMinutes: state.toTimeMinutes,
        fromDate: state.fromDate,
        toDate: state.toDate,
        usersMap: state.usersMap
    };
};
const actions = {
    setOrders,
    setDisplayOrderGrid,
    setDateTime,
    setOrderGridData
};

export default connect(mapStateToProps,actions)(TestKendo);
