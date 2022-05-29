import { Tabs, Tab } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import React, { Component } from 'react';
import './time-setting.css'
import TimePicker from 'react-bootstrap-time-picker';

class TimeSetting extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
        1 : {
          on: 11111,
          off: 2222
        },
        2: {
          on: 33333,
          off: 4444
        }
      };
    }

    render(){
      const handleChangeTimeOn = (e) => {
        let copy = { ...this.state[1]}
        copy.on = e.target.value
        this.setState({[1]: copy})
        
      }

    const products = [
      {'id': 1, 'function': 'fan setting', 'on': <input type="datetime-local" onChange={handleChangeTimeOn}></input>, 'off': '2222222', '':'Setting'},
      {'id': 2, 'function': 'mist setting', 'on': <input type="datetime-local" onChange={handleChangeTimeOn}></input>, 'off': '2222222', '':'Setting'},
      {'id': 3, 'function': 'pumb setting', 'on': <input type="datetime-local" onChange={handleChangeTimeOn}></input>, 'off': '2222222', '':'Setting'},
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