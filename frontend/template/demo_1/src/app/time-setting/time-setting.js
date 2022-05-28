import { Tabs, Tab } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import React, { Component } from 'react';
import { Line } from "react-chartjs-2";

const products = [
    {'id': 2, 'function': 'fan setting', 'on': 11111111, 'off': '2222222', '':'Setting'},
    {'id': 3, 'function': 'fan setting', 'on': 11111111, 'off': '2222222', '':'Setting'},
    {'id': 1, 'function': 'fan setting', 'on': 11111111, 'off': '2222222', '':'Setting'},
  ];

const columns = [{
    dataField: 'id',
    text: 'ID'
  }, {
    dataField: 'function',
    text: 'Function'
  }, {
    dataField: 'on',
    text: 'ON'
  },
  {
    dataField: 'off',
    text: 'OFF'
  },
  {
    dataField: '',
    text: 'Time'
  }
  ];
  

class TimeSetting extends Component {
    render(){
        return(
            <div>
                <div className='row'>
                    <div className="col-md-12">
                        <div className="justify-content-between align-items-center tab-transparent">
                            <Tabs defaultActiveKey="table" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="table" title="Schedule">
                            <div className="card">
                            <div className="card-body text-center">
                            <h5 className="mb-2 text-dark font-weight-normal">Device Schedule</h5>
                                <BootstrapTable keyField='id' data={ products } columns={ columns } />
                                </div>
                            </div>
                            </Tab>
                            <Tab eventKey="setting" title="Setting">
                            <div className="card">
                            <div className="card-body text-center">
                            <h5 className="mb-2 text-dark font-weight-normal">Schedule Setting</h5>
                                <BootstrapTable keyField='id' data={ products } columns={ columns } />
                                </div>
                            </div>

                            </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimeSetting;