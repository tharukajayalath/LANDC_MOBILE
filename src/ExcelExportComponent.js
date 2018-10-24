/**
 * Created by Tharuka Jayalath on 08/26/2018
 */

import React, {Component} from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import {ExcelExport} from '@progress/kendo-react-excel-export';


export default class ExcelExportComponent extends Component{

    _export;
    export = ()=>{
        this._export.save();
        this.props.handleClose();
    };



    render(){
        return(
            <div className={'excelExportComponent'}>
            <ExcelExport  data={this.props.data}
                         ref={(exporter)=>{ this._export = exporter;}
                         }>
                <Grid data={this.props.data}>
                    <GridToolbar>
                        <button title={'Export Table as Excel'}
                                className={'k-button k-primary'}
                                onClick={this.export}>
                            Export Excel
                        </button>
                    </GridToolbar>
                    <Column field={'createdDate'} title={'Order Created Time'}/>
                    <Column field={'orderName'} title={'Order Name'} />
                    <Column field={'itemName'} title={'Item Name'}/>
                    <Column field={'quantity'} title={'Quantity'}/>
                    <Column field={'description'} title={'Description'}/>
                    <Column field={'customerName'} title={'Customer Name'} />
                    <Column field={'email'} title={'E-Mail'}/>
                    <Column field={'contactNumber'} title={'Contact Number'} />
                    <Column field={'address'} title={'Delivery Address'} />
                </Grid>

            </ExcelExport>
            </div>
        );
    }

}
