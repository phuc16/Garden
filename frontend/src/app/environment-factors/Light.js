import React, { Component } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import BootstrapTable from 'react-bootstrap-table-next';
import { Tabs, Tab } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';
import './factor.css'

class Light extends Component {
  constructor(props){
    super(props);
    this.state = {
      allLight: [],
      todayLight : [],
      lastData: 0,
    };
  }
  async componentDidMount(){
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var nextDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+(today.getDate() + 1);
    // console.log(nextDate)

    await axios.get(process.env.REACT_APP_SERVER + `/data`)
    .then(res => {
      let temp = []
      for (let i = 0; i<res.data.length; i++){
        if (res.data[i]['category'] == 'Light'){
          temp.push(res.data[i])
        }
      }
      this.setState({allLight: temp})
    })

    await axios.get(process.env.REACT_APP_SERVER + `/data/last`)
    .then(res => {
      var x = 0
      for (let i = 0; i < res.data.length; i++){
        if (res.data[i]['category'] == 'Light'){
          x = res.data[i]['value']
        }
      }
      console.log(x)
      this.setState({lastData: x})
    })

    await axios.get(process.env.REACT_APP_SERVER + `/data/search?idGarden=1&startDay=${date}&endDay=${nextDate}`)
    .then(res => {
      let temp = []
      for (let i = 0; i<res.data.length; i++){
        if (res.data[i]['category'] == 'Light'){
         temp.push(res.data[i])
        }
      }
      this.setState({todayLight: temp})
    })

    await axios.get(process.env.REACT_APP_SERVER +  `/data/before-last`)
    .then(res => {
      let x = res.data
      this.setState({nearestData: x['Light']})
    })
  }

  data = {
    labels: [],
    datasets: [{
      label: 'Today Light Intensity',
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
    var todayDataChart = []
    var todayColumn = []
    var allDataChart = []
    var allColumn = []
    
    for (let i = 0; i< this.state.todayLight.length; i++){
      todayDataChart.push(this.state.todayLight[i]['value'])
      todayColumn.push(this.state.todayLight[i]['time'].slice(11, this.state.todayLight[i]['time'].length).replace('.000Z', ''))
    }

    for (let i = 0; i< this.state.todayLight.length; i++){
      allDataChart.push(this.state.todayLight[i]['value'])
      allColumn.push(this.state.todayLight[i]['time'].slice(0, 11).replace('T', ''))
    }
    this.data.labels = todayColumn
    this.data.datasets[0].data = todayDataChart
    console.log(todayColumn)
  }

  render () {
    console.log('render')
    var sumLight = 0
    var todayLight = [];
    var timeMax = ''
    var timeMin = ''
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var changeData = [this.state.lastData - this.state.nearestData]
    this.showChart()


    for (let i = 0; i < this.state.todayLight.length; i++){
      sumLight += this.state.todayLight[i]['value']
    }

    if (this.state.todayLight.length > 0){
      var temp = []
      temp.push(...this.state.todayLight.map(o => o.value))
      timeMax = this.state.todayLight[temp.indexOf(Math.max(...this.state.todayLight.map(o => o.value)))]['time']
      timeMax = timeMax.replace('T', ', ').replace('.000Z', '')
      timeMin = this.state.todayLight[temp.indexOf(Math.min(...this.state.todayLight.map(o => o.value)))]['time']
      timeMin = timeMin.replace('T', ', ').replace('.000Z', '')
    }

    const products = [
      {'id': 'Max', 'light': this.state.todayLight.length >0 ?Math.max(...this.state.todayLight.map(o => o.value)) : 'No data', 'time': timeMax},
      {'id': 'Min', 'light': this.state.todayLight.length >0 ?Math.min(...this.state.todayLight.map(o => o.value)) : 'No data', 'time': timeMin},
      {'id': 'Avarage', 'light': this.state.todayLight.length>0? Math.round((sumLight/this.state.todayLight.length)*100)/100 : 'No data', 'time': date}
    ];


    const columns = [{
      dataField: 'id',
      text: '', 
      sort: true
    }, {
      dataField: 'light',
      text: 'Light',
      sort: true
    }, {
      dataField: 'time',
      text: 'Time',
      sort: true
    }
    ];

    const StatColumn = [{
      dataField: 'id',
      text: 'ID', 
      sort: true
    }, {
      dataField: 'value',
      text: 'Value',
      sort: true
    }, {
      dataField: 'time',
      text: 'Time',
      sort: true
    }
    ]

    return (
      <div>
        <div className="page-header">
          <h3 className="page-title">
            Light Intensity
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to='/dashboard'>Device Control Center</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Light</li>
            </ol>
          </nav>
        </div>
        <div className="row"> 
          <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="mb-2 text-dark font-weight-normal">Light intensity</h5>
                <h2 className="mb-4 text-dark font-weight-bold">{this.state.lastData}</h2>
                  <div className="px-4 d-flex align-items-center">
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient id="progress-followers" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f5515f"/>
                          <stop offset="100%" stopColor="#9f041b"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <CircularProgressbarWithChildren className="progress-followers"
                    value={this.state.lastData/10}>
                      <div>
                        <i className="mdi mdi-weather-sunny icon-md absolute-center text-dark"></i>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>  
                  <p className="mt-4 mb-0">{changeData >= 0 ? 'Increased since' : 'Decreased since' } last time</p>
                  <h3 className="mb-0 font-weight-bold mt-2 text-dark">{Math.floor(Math.abs(changeData)/this.state.nearestData*100)} %</h3>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-6 col-sm-6 grid-margin stretch-card">
          <div className="card">
          <div className="card-body text-center">
          <h5 className="mb-2 text-dark font-weight-normal">Light Intensity Overview</h5>
            <BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } />
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
                    <h4 className="card-title">Light Intensity Chart</h4>
                    <Line data={this.data} options={this.options} />
                </div>
            </div>
          </Tab>
          <Tab eventKey="today" title="Today">
          <div className="card">
          <div className="card-body text-center">
          <h5 className="mb-2 text-dark font-weight-normal">Light Intensity Stats Today</h5>
            <BootstrapTable bootstrap4 keyField='id' data={ this.state.todayLight } columns={ StatColumn } 
            pagination={paginationFactory({ sizePerPage: 5 })}/>
            </div>
          </div>

          </Tab>
          <Tab eventKey="data" title="Data">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="mb-2 text-dark font-weight-normal">Light Intensity Stats</h5>
                <BootstrapTable
                  bootstrap4 
                  keyField='id' 
                  data={ this.state.allLight } 
                  columns={ StatColumn } 
                  pagination={paginationFactory({ sizePerPage: 5 })}/>
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

export default Light;