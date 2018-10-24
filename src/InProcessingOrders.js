/**
 * Created by Tharuka Jayalath on 08/11/2018
 */

import React, {Component} from 'react';
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import {DatePicker, TimePicker,} from '@progress/kendo-react-dateinputs';
import {ExcelExport} from '@progress/kendo-react-excel-export';
import {orderBy} from '@progress/kendo-data-query';
import {Pages} from "./Constants";
import {setOrders, setDisplayOrderGrid, setDateTime, setOrderGridData} from "./store/Reducers";
import connect from "react-redux/es/connect/connect";
import {executGetApiCall} from "./ApiUtil";
import {createOrderGridData, createExcelExportGrid} from "./CommonUtil";
import moment from 'moment';
import OrderModal from './OrderModal';
import ExcelExportComponent from "./ExcelExportComponent";

class InProcessingOrders extends Component {

    _export;
    _grid;
    export = () => {
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

console.log('hell',orders);
        return {
            items: orders ? this.getOrders(orders, []).slice(skip, skip + take) : [],
            total: orders ? orders.length : 0,
            skip: skip,
            pageSize: take,
            pageable: this.state ? this.state.pageable : {
                buttonCount: 5,
                info: true,
                type: 'numeric',
                pageSizes: true,
                previousNext: true
            },
            sort: [],
            fromDate: null,
            toDate: null,
            fromTimeHours: null,
            fromTimeMinutes: null,
            toTimeHours: null,
            toTimeMinutes: null,
            showModal: false,
            currentOrder: null,
            exportExcelWithItems: false
        };
    }

    updatePagerState(key, value) {
        const newPageableState = Object.assign({}, this.state.pageable, {[key]: value});
        this.setState(Object.assign({}, this.state, {pageable: newPageableState}));
    }


    handleChange = (event) => {
        // console.log(event);
        const name = event.target.name;
        const value = event.target.value;
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
    getOrders = (orders, sort) => {
        return orderBy(orders, sort);
    };

    componentWillReceiveProps(nextProps) {

        if (this.state.items && this.state.items.length === 0 && nextProps.orders) {
            // this.getOrders(orders,[]).slice(skip, skip + take)
            // const{skip, take} = this.state;
            // this.setState({items: this.getOrders(nextProps.orders, []).slice(0, 10)});
        }
    }

    onSortChange = (event) => {
        const {skip, pageSize} = this.state;
        console.log(skip);
        // console.log(take);
        this.setState({
            sort: event.sort,
            items: this.getOrders(this.props.orders, event.sort).slice(skip, skip + pageSize)
        });
        console.log(this.getOrders(this.props.orders, event.sort).slice(0, 5));
    };

    componentDidMount() {

        executGetApiCall(`/admin/getOrders`).then(response => {
            console.debug(response);

            if (response && response.statusCode === 200) {

                if (response.data) {

                    this.props.setOrders(response.data);
                    this.props.setOrderGridData(createOrderGridData(response.data, this.props.usersMap));
                    this.setState({items: this.getOrders(this.props.orderGridData, []).slice(0, 10)});
                    this.props.setDisplayOrderGrid(true);

                } else {
                    this.props.setOrders([]);
                    this.props.setDisplayOrderGrid(false);
                    this.setState({items: []});
                }


            }

        })


    }

    handleClose() {
        this.setState({showModal: false});
    }

    render() {

        return (
            <div>
                {this.state.items && this.state.items.length > 0 &&
                <div>
                    {this.state.showModal ? <OrderModal ref={this.modalRef}
                                                        orderName={this.state.currentOrder.name}
                                                        items={this.state.currentOrder.items}
                                                        order={this.state.currentOrder}
                                                        handleClose={this.handleClose}/> : null}
                    <ExcelExport data={this.props.orderGridData}
                                 ref={(exporter) => {
                                     this._export = exporter;
                                 }
                                 }>
                        <Grid ref={(grid) => {
                            this._grid = grid;
                        }}
                              data={this.props.orders}
                              onPageChange={this.pageChange}
                              total={this.state.total}
                              skip={this.state.skip}
                              pageable={this.state.pageable}
                              pageSize={this.state.pageSize}
                              sortable={{allowUnsort: true, mode: 'multiple'}}
                              onSortChange={this.onSortChange}
                              onRowClick={(dataItem) => {
                                  const node = this.modalRef.current;
                                  console.debug(node);
                                  console.log(dataItem.dataItem);
                                  this.setState({currentOrder: dataItem.dataItem, showModal: true});
                              }
                              }

                        >
                            <GridToolbar>
                                <div className={'row'}>
                                    <div className={'space'}>
                                        <button title={'Export Table as Excel'}
                                                className={'k-button k-primary'}
                                                onClick={this.export}>
                                            Export Excel
                                        </button>
                                    </div>
                                    <div className={'space'}>

                                        <button title={'Export Table as Excel with Items'}
                                                className={'k-button k-primary'}
                                                onClick={() => {
                                                    this.setState({exportExcelWithItems: true})
                                                }}>
                                            Generate Order-Items Grid
                                        </button>
                                    </div>
                                </div>
                            </GridToolbar>


                            <Column field={'createdDate'} title={'Order Created Time'} width={'150px'}/>
                            <Column field={'name'} title={'Order Name'} width={'120px'}/>
                            <Column field={'customerName'} title={'Order Name'} width={'140px'}/>
                            <Column field={'contactNumber'} title={'Contact Number'} width={'140px'}/>
                            <Column field={'address'} title={'Address'} width={'600px'}/>
                        </Grid>
                    </ExcelExport>
                    {this.state.exportExcelWithItems ? <ExcelExportComponent handleClose={() => {
                        this.setState({exportExcelWithItems: false});
                    }
                    } data={createExcelExportGrid(this.props.orderGridData)}/> : null}


                </div>
                }
            </div>

        );
    }
}


const mapStateToProps = (state) => {

    return {
        renderMe: state.currentPage === Pages.HOME_PAGE,
        orders: state.orders ? state.orders.filter(order => order.status === 5): state.orders,
        orderGridData: state.orderGridData ? state.orderGridData.filter(order => order.status ===5) : state.orderGridData,
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

export default connect(mapStateToProps, actions)(InProcessingOrders);
