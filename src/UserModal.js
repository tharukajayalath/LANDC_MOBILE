/**
 * Created by Tharuka Jayalath on 10/06/2018
 */

import React, {Component} from 'react';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import {ExcelExport} from '@progress/kendo-react-excel-export';


export default class OrderModal extends Component{

    _export;
    export = ()=>{
        this._export.save();
    };

    render(){
        const{_id, name, address, contactNumber, verified, distance} = this.props.user;
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
                            <table className={'table'}>
                                <thead>
                                <tr>
                                    <th scope={'col'}>Field</th>
                                    <th scope={'col'}>Value</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope={'row'}>Name</th>
                                    <td>{name}</td>
                                </tr>
                                <tr>
                                    <th scope={'row'}>Email</th>
                                    <td>{_id}</td>
                                </tr>
                                <tr>
                                    <th scope={'row'}>Contact Number</th>
                                    <td>{contactNumber}</td>
                                </tr>
                                <tr>
                                    <th scope={'row'}>Address</th>
                                    <td>{address}</td>
                                </tr>
                                <tr>
                                    <th scope={'row'}>Verified</th>
                                    <td>{verified ? verified : 'No'}</td>
                                </tr>
                                <tr>
                                    <th scope={'row'}>Distance</th>
                                    <td>{distance? distance: 'not calculated'}</td>
                                </tr>


                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.props.handleClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}
