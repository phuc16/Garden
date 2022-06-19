import React, { Component } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import BootstrapTable from 'react-bootstrap-table-next';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import './prediction.css'
class Temperature extends Component {

  constructor(props){
    super(props);
    this.state = {
      allTemp: [],
      todayTemp : [],
      lastData: 0,
      predictSetting: [],
      reload: false,
      predictData: []
    };
  }


  async componentDidMount(){
    // var today = new Date();
    // var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    // var nextDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate() + 1);
    // // console.log(nextDate)

    // await axios.get(process.env.REACT_APP_SERVER + `/data`)
    // .then(res => {
    //   let temp = []
    //   for (let i = 0; i<res.data.length; i++){
    //     if (res.data[i]['category'] == 'Temp'){
    //       temp.push(res.data[i])
    //     }
    //   }
    //   this.setState({allTemp: temp})
    // })
    // console.log('x')

    // await axios.get(process.env.REACT_APP_SERVER + `/data/last`)
    // .then(res => {
    //   var x = 0
    //   for (let i = 0; i < res.data.length; i++){
    //     if (res.data[i]['category'] == 'Temp'){
    //       x = res.data[i]['value']
    //     }
    //   }
    //   console.log(x)
    //   this.setState({lastData: x})
    // })

    // await axios.get(process.env.REACT_APP_SERVER + `/data/search?idGarden=1&startDay=${date}&endDay=${nextDate}`)
    // .then(res => {
    //   let temp = []
    //   for (let i = 0; i<res.data.length; i++){
    //     if (res.data[i]['category'] == 'Temp'){
    //      temp.push(res.data[i])
    //     }
    //   }
    //   this.setState({todayTemp: temp})
    // })

    // await axios.get(process.env.REACT_APP_SERVER +  `/data/before-last`)
    // .then(res => {
    //   let x = res.data
    //   this.setState({nearestData: x['Temp']})
    // })

    // axios.get(process.env.REACT_APP_SERVER + `/schedule?startDay=2000-01-01&endDay=2023-01-01`)
    // .then(res => {
    //     const temp = res.data; 
    //     this.setState({ scheduled : temp });
    //     console.log(this.state.scheduled)
    // })

    axios.get(process.env.REACT_APP_SERVER + `/device`)
    .then(res => {
        const temp = res.data; 
        this.setState({ predictSetting : temp });
    })

    axios.post(process.env.REACT_APP_SERVER + `/predict?startTime=2020-10-14%208:00&endTime=2020-10-14%2013:00&timeGap=15`, {
      id_device: 15
    })
    .then(res => {
      let temp = res.data.result
      for (let i = 0; i < temp.length; i++){
        temp[i]["date"] = temp[i]["date"].replace('2020', 2022)
      }
      this.setState({predictData: temp})
    })
  }

  data = {
    labels: [],
    datasets: [{
      label: 'Predict Temperature',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1,
      fill: true
    }]
  };

  options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: true
      },
      elements: {
        point: {
          radius: 0
        }
      }

  };

  showChart(){
    var predictDataChart = []
    var predictColumn = []

    
    for (let i = 0; i< this.state.predictData.length; i++){
      predictDataChart.push(this.state.predictData[i]['tempPredict'])
      predictColumn.push(this.state.predictData[i]['date'].slice(0, 16).replace('2020', '2022'))
    }

    this.data.labels = predictColumn
    this.data.datasets[0].data = predictDataChart
    console.log(predictColumn)
  }

  render () {
    console.log('render')
    this.showChart()


    const StatColumn = [
      {
      dataField: 'date',
      text: 'Time',
      sort: true
      }, {
      dataField: 'tempPredict',
      text: 'Value',
      sort: true
    }
    ]

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
        dataField: 'time_gap',
        text: 'Time Gap',
      },
      {
        dataField: 'setting',
        text: 'Setting'
      }
    ];

    const handleTimeStart = e => {
        let index = parseInt(e.target.className)
        console.log((e.target.value))
        predictInsetting[index]['time_start'] = e.target.value
      }

      const handleTimeEnd = e => {
        let index = parseInt(e.target.className)
        predictInsetting[index]['time_end'] = e.target.value
      }

      const handleTimeGap = e => {
        let index = parseInt(e.target.className)
        predictInsetting[index]['time_gap'] = e.target.value
      }

      const handleHour = (hour) => {
        console.log(hour)
        if (hour[0] == 0) return hour.slice(1,6)
        else return hour
      }
      const handlePredict = (e) => {
        let index = e.target.value
        console.log(predictInsetting[index]['time_end'])
        let device_id = predictInsetting[index]['id']
        let timeStart = predictInsetting[index]['time_start']
        let timeEnd = predictInsetting[index]['time_end']
        let timeGap = predictInsetting[index]['time_gap']
        let endDay = timeEnd.slice(0,10)
        let startDay = timeStart.slice(0,10)
        let startHour = handleHour(timeStart.slice(11,16))
        let endHour = handleHour(timeEnd.slice(11,16))

        timeStart = startDay + ' ' + startHour
        timeEnd = endDay + ' ' + endHour
        if (timeGap != 15){
            axios.post(process.env.REACT_APP_SERVER + `/predict?startTime=${timeStart}&endTime=${timeEnd}&timeGap=15`, {
              id_device: device_id
            })
            .then(res => {
              let temp = res.data.result
              for (let i = 0; i < temp.length; i++){
                temp[i]["date"] = temp[i]["date"].replace('2020', 2022)
              }
              this.setState({predictData: temp})
            })
        }
        else {
            axios.post(process.env.REACT_APP_SERVER + `/predict?startTime=${timeStart}&endTime=${timeEnd}`, {
              id_device: device_id
            })
            .then(res => {
              let temp = res.data.result
              for (let i = 0; i < temp.length; i++){
                temp[i]["date"] = temp[i]["date"].replace('2020', 2022)
              }
              this.setState({predictData: temp})
            })
        }       
      }
    
    const predictInsetting = []

    for (let i = 0; i < this.state.predictSetting.length ; i++){
        predictInsetting.push({...this.state.predictSetting[i], 
        time_start: <input type="datetime-local" onChange={handleTimeStart} className={i} step={1}></input>, 
        time_end: <input type="datetime-local" onChange={handleTimeEnd}  className={i} step={1} ></input>,
        time_gap:  <input type="number" onChange={handleTimeGap}  className={i}></input>,
        setting:  <Button value={i} onClick={handlePredict} defaultValue={15}>Predict</Button> }) 
    }
    console.log(this.state.predictData)
    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Temperature Prediction
          </h3>
        </div>
        <div className="row"> 
            <div className="col-xl-12 col-lg-12 col-sm-12 grid-margin stretch-card">
                <div className="card">
                    <div className="card-body text-center">
                    <div className="card predict">
                            <div className="card-body text-center">
                            <h5 className="mb-2 text-dark font-weight-normal ">Predict Setting</h5>
                                <BootstrapTable keyField='id' data={ predictInsetting } columns={ columns2 } />
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='row'>
        <div className="col-md-12">
              <div className="justify-content-between align-items-center tab-transparent">
        <Tabs defaultActiveKey="chart" id="uncontrolled-tab-example" className="mb-3">
          <Tab eventKey="chart" title="Chart">
          <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Temperature Chart</h4>
                    <Line data={this.data} options={this.options} />
                </div>
            </div>
          </Tab>
          <Tab eventKey="today" title="Today">
          <div className="card">
          <div className="card-body text-center">
          <h5 className="mb-2 text-dark font-weight-normal">Temperature Stats Today</h5>
            <BootstrapTable bootstrap4 keyField='id' data={ this.state.predictData } columns={ StatColumn }  pagination={paginationFactory({ sizePerPage: 5 })}/>
            </div>
          </div>

          </Tab>
        </Tabs>
        </div>
        </div>
        </div>
      </div>
    );
  }
}

export default Temperature;