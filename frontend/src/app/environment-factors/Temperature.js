import React, { Component } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import BootstrapTable from 'react-bootstrap-table-next';
import { Tabs, Tab } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';

class Temperature extends Component {

  constructor(props){
    super(props);
    this.state = {
      allTemp: [],
      todayTemp : [],
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
        if (res.data[i]['category'] == 'Temp'){
          temp.push(res.data[i])
        }
      }
      this.setState({allTemp: temp})
    })
    console.log('x')

    await axios.get(process.env.REACT_APP_SERVER + `/data/last`)
    .then(res => {
      var x = 0
      for (let i = 0; i < res.data.length; i++){
        if (res.data[i]['category'] == 'Temp'){
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
        if (res.data[i]['category'] == 'Temp'){
         temp.push(res.data[i])
        }
      }
      this.setState({todayTemp: temp})
    })

    await axios.get(process.env.REACT_APP_SERVER +  `/data/before-last`)
    .then(res => {
      let x = res.data
      this.setState({nearestData: x['Temp']})
    })
  }

  data = {
    labels: [],
    datasets: [{
      label: 'Today Temporature',
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
    
    for (let i = 0; i< this.state.todayTemp.length; i++){
      todayDataChart.push(this.state.todayTemp[i]['value'])
      todayColumn.push(this.state.todayTemp[i]['time'].slice(11, this.state.todayTemp[i]['time'].length).replace('.000Z', ''))
    }

    for (let i = 0; i< this.state.allTemp.length; i++){
      allDataChart.push(this.state.allTemp[i]['value'])
      allColumn.push(this.state.allTemp[i]['time'].slice(0, 11).replace('T', ''))
    }
    this.data.labels = todayColumn
    this.data.datasets[0].data = todayDataChart
    console.log(todayColumn)
  }

  render () {
    console.log('render')
    var sumTemp = 0
    var todayTemp = [];
    var timeMax = ''
    var timeMin = ''
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var changeData = [this.state.lastData - this.state.nearestData]
    this.showChart()

    for (let i = 0; i < this.state.allTemp.length; i++){
      sumTemp += this.state.allTemp[i]['value']
    }

    if (this.state.todayTemp.length > 0){
      var temp = []
      temp.push(...this.state.todayTemp.map(o => o.value))
      timeMax = this.state.todayTemp[temp.indexOf(Math.max(...this.state.todayTemp.map(o => o.value)))]['time']
      timeMax = timeMax.replace('T', ', ').replace('.000Z', '')
      timeMin = this.state.todayTemp[temp.indexOf(Math.min(...this.state.todayTemp.map(o => o.value)))]['time']
      timeMin = timeMin.replace('T', ', ').replace('.000Z', '')
    }

    const products = [
      {'id': 'Max', 'temp': Math.max(...this.state.todayTemp.map(o => o.value)), 'time': timeMax},
      {'id': 'Min', 'temp': Math.min(...this.state.todayTemp.map(o => o.value)), 'time': timeMin},
      {'id': 'Avarage', 'temp': Math.round((sumTemp/this.state.todayTemp.length)*100)/100 , 'time': date}
    ];

    const columns = [{
      dataField: 'id',
      text: '', 
      sort: true
    }, {
      dataField: 'temp',
      text: 'Temp',
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
            Temperature
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to='/dashboard'>Device Control Center</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Temperature</li>
            </ol>
          </nav>
        </div>
        <div className="row"> 
          <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="mb-2 text-dark font-weight-normal">Temperature</h5>
                <h2 className="mb-4 text-dark font-weight-bold">{this.state.lastData}</h2>
                  <div className="px-4 d-flex align-items-center">
                    <svg width="0" height="0">
                      <defs>
                        <linearGradient id="progress-impressions" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#fad961"/>
                          <stop offset="100%" stopColor="#f76b1c"/>
                        </linearGradient>
                      </defs>
                    </svg>
                    <CircularProgressbarWithChildren className="progress-impressions"
                    value={this.state.lastData}>
                      <div>
                        <i className="mdi mdi-coolant-temperature icon-md absolute-center text-dark"></i>
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
          <h5 className="mb-2 text-dark font-weight-normal">Temperature Overview</h5>
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
                    <h4 className="card-title">Temperature Chart</h4>
                    <Line data={this.data} options={this.options} />
                </div>
            </div>
          </Tab>
          <Tab eventKey="today" title="Today">
          <div className="card">
          <div className="card-body text-center">
          <h5 className="mb-2 text-dark font-weight-normal">Temperature Stats Today</h5>
            <BootstrapTable bootstrap4 keyField='id' data={ this.state.todayTemp } columns={ StatColumn } />
            </div>
          </div>

          </Tab>
          <Tab eventKey="data" title="Data">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="mb-2 text-dark font-weight-normal">Temperature Stats</h5>
                <BootstrapTable
                  bootstrap4 
                  keyField='id' 
                  data={ this.state.allTemp } 
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

export default Temperature;