import { Tabs, Tab, Button } from "react-bootstrap"
import BootstrapTable from "react-bootstrap-table-next"
import React, { Component } from 'react';
import './time-setting.css'
// import TimePicker from 'react-bootstrap-time-picker';
import axios from 'axios'

class TimeSetting extends Component {
    
  constructor(props) {
      super(props);
      this.state = {
        reload: new Date(),
        scheduled: [], 
        settingDevice: [],
        // time_start: [],
        // time_end: []
      };
    }

    componentDidMount() {
      axios.get(`http://localhost:5000/schedule?startDay=2000-01-01&endDay=2023-01-01`)
        .then(res => {
          const temp = res.data; 
          this.setState({ scheduled : temp });
          console.log(this.state.scheduled)
        })

      axios.get(`http://localhost:5000/device`)
        .then(res => {
          const temp = res.data; 
          this.setState({ settingDevice : temp });
        })
    }

    

    render(){
      const handleDeleteSchedule = (e) => {
        let index = e.target.value
        axios.delete(`http://localhost:5000/schedule/${deviceInSchedule[e.target.value]['id']}`)
        .then(res => {
          console.log(res)

          this.setState({ scheduled : [
            ...this.state.scheduled.slice(0, index), 
            ...this.state.scheduled.slice(index+1)
          ]})

          
        })
        .catch(err =>{
          console.log(err)
        })
      }

      const handleTimeStart = e => {
        let index = parseInt(e.target.className)
        console.log(typeof(e.target.value))
        deviceInSetting[index]['time_start'] = e.target.value
      }

      const handleTimeEnd = e => {
        let index = parseInt(e.target.className)
        deviceInSetting[index]['time_end'] = e.target.value
      }

      const handleSetSchedule = (e) => {
        let index = e.target.value
        let device_id = deviceInSetting[index]['id']

        let  update = false
        let startCompare = deviceInSetting[index]['time_start'] + '.000Z'
        let endCompare = deviceInSetting[index]['time_end'] + '.000Z'
        let schedule = this.state.scheduled

        
        // if (deviceInSchedule.some(x => x['id_device'] == device_id)){
        //   for (let i = 0; i < deviceInSchedule.length; i++){
        //     if (
        //     ((startCompare >= schedule[i]['time_start'] && startCompare <= schedule[i]['time_end']) ||
        //     (endCompare >= schedule[i]['time_start'] && endCompare <= schedule[i]['time_end']) )){
        //       update = true
        //       console.log('update')
        //       axios.put(`http://localhost:5000/schedule/${deviceInSchedule[index]['id']}`, {
        //         id_device: device_id,
        //         time_start: deviceInSetting[index]['time_start'],
        //         time_end: deviceInSetting[index]['time_end'],
        //         status: deviceInSetting[index]['status']
        //     })
        //     }
        //   }
        // }
        // if (!update){
        //   console.log('insert')
          
          axios.post(`http://localhost:5000/schedule`, {
            id_device: device_id,
            time_start: deviceInSetting[index]['time_start'],
            time_end: deviceInSetting[index]['time_end'],
            status: deviceInSetting[index]['status']
          })
        
      }

      const deviceInSchedule = [
        // {'id': 1, 'function': 'fan setting', 'on': <input type="datetime-local" onChange={handleChangeTimeOn}></input>, 'off': '2222222', '':'Setting'},
        // {'id': 2, 'function': 'mist setting', 'on': <input type="datetime-local" onChange={handleChangeTimeOn}></input>, 'off': '2222222', '':'Setting'},
        // {'id': 3, 'function': 'pumb setting', 'on': <input type="datetime-local" onChange={handleChangeTimeOn}></input>, 'off': '2222222', '':'Setting'},
      ];


      const deviceInSetting = []

      for (let i = 0; i < this.state.scheduled.length ; i++){
        deviceInSchedule.push({...this.state.scheduled[i],  
        time_start: this.state.scheduled[i]['time_start'].replace('T', ', ').replace('.000Z', '') ,
        time_end: this.state.scheduled[i]['time_end'].replace('T', ', ').replace('.000Z', '') ,
        status: this.state.scheduled[i]['status'] == 0 ? 'Chưa thực thi' 
        : (this.state.scheduled[i]['status'] == 1? 'Đang thực hiện' : 
        ((this.state.scheduled[i]['status'] == 2? 'Hoàn thành' : 
        (this.state.scheduled[i]['status'] == 3? 'Time Out' : 'Task LTT')))), 
        setting:  this.state.scheduled[i]['status'] == 2 ?<Button value={i} onClick={handleDeleteSchedule}>Delete</Button>: '' })
      }

      for (let i = 0; i < this.state.settingDevice.length ; i++){
          deviceInSetting.push({...this.state.settingDevice[i], 
          time_start: <input type="datetime-local" onChange={handleTimeStart} className={i} step={1}></input>, 
          time_end: <input type="datetime-local" onChange={handleTimeEnd}  className={i} step={1} ></input>,
          setting:  <Button value={i} onClick={handleSetSchedule}>Set</Button> }) 
      }

      console.log(this.state.scheduled[0])
    const columns = [{
        dataField: 'id',
        text: 'ID'
      }, {
        dataField: 'id_device',
        text: 'Device ID'
      }, 
      {
        dataField: 'time_start',
        text: 'Time Start'
      },
      {
        dataField: 'time_end',
        text: 'Time End'
      },
      {
        dataField: 'status',
        text: 'Status'
      },
      {
        dataField: 'setting',
        text: 'Setting'
      }
      ];
    
    const columns2 = [{
        dataField: 'id',
        text: 'ID'
      }, 
      {
        dataField: 'name',
        text: 'Device Name'
      },
      {
        dataField: 'time_start',
        text: 'Time Start'
      },
      {
        dataField: 'time_end',
        text: 'Time End'
      },
      {
        dataField: 'setting',
        text: 'Setting'
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
                                <BootstrapTable keyField='id' data={ deviceInSchedule } columns={ columns } />
                                </div>
                            </div>
                            </Tab>
                            <Tab eventKey="setting" title="Setting">
                            <div className="card">
                            <div className="card-body text-center">
                            <h5 className="mb-2 text-dark font-weight-normal">Schedule Setting</h5>
                                <BootstrapTable keyField='id' data={ deviceInSetting } columns={ columns2 } />
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