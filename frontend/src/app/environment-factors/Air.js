import React, { Component } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import BootstrapTable from 'react-bootstrap-table-next';
import { Tabs, Tab } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import paginationFactory from 'react-bootstrap-table2-paginator';
import axios from 'axios';



// some position using allAir data instead of todayAir because todayAir now still dont have any data
class Air extends Component {
  constructor(props){
    super(props);
    this.state = {
      allAir: [],
      todayAir : [],
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
        if (res.data[i]['category'] == 'Humidity'){
          temp.push(res.data[i])
        }
      }
      this.setState({allAir: temp})
    })
    console.log('x')

    await axios.get(process.env.REACT_APP_SERVER + `/data/last`)
    .then(res => {
      var x = 0
      for (let i = 0; i < res.data.length; i++){
        if (res.data[i]['category'] == 'Humidity'){
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
        if (res.data[i]['category'] == 'Humidity'){
         temp.push(res.data[i])
        }
      }
      this.setState({todayAir: temp})
    })

    await axios.get(process.env.REACT_APP_SERVER +  `/data/before-last`)
    .then(res => {
      let x = res.data
      this.setState({nearestData: x['Humidity']})
    })

    
  }

  data = {
    labels: [],
    datasets: [{
      label: 'Today Humidity',
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
    
    for (let i = 0; i< this.state.todayAir.length; i++){
      todayDataChart.push(this.state.todayAir[i]['value'])
      todayColumn.push(this.state.todayAir[i]['time'].slice(11, this.state.todayAir[i]['time'].length).replace('.000Z', ''))
    }

    for (let i = 0; i< this.state.allAir.length; i++){
      allDataChart.push(this.state.allAir[i]['value'])
      allColumn.push(this.state.allAir[i]['time'].slice(0, 11).replace('T', ''))
    }
    this.data.labels = todayColumn
    this.data.datasets[0].data = todayDataChart
    console.log(todayColumn)
  }


  

  render () {
    console.log('render')
    var sumAir = 0
    var todayAir = [];
    var timeMax = ''
    var timeMin = ''
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var changeData = [this.state.lastData - this.state.nearestData]
    this.showChart()

      // for (let i = 0; i<this.state.allData.length; i++){
      //   if (this.state.allData[i]['category'] == 'Humidity'){
      //     allAir.push(this.state.allData[i])
      //   }
      // }
      // for (let i = 0; i<this.state.todayData.length; i++){
      //   if (this.state.todayData[i]['category'] == 'Humidity'){
      //     todayAir.push(this.state.todayData[i])
      //   }
      // }
  
      
      
      for (let i = 0; i < this.state.allAir.length; i++){
        sumAir += this.state.allAir[i]['value']
      }

      if (this.state.todayAir.length > 0){
        var temp = []
        temp.push(...this.state.todayAir.map(o => o.value))
        timeMax = this.state.todayAir[temp.indexOf(Math.max(...this.state.todayAir.map(o => o.value)))]['time']
        timeMax = timeMax.replace('T', ', ').replace('.000Z', '')
        timeMin = this.state.todayAir[temp.indexOf(Math.min(...this.state.todayAir.map(o => o.value)))]['time']
        timeMin = timeMin.replace('T', ', ').replace('.000Z', '')
      }
  
      console.log(this.state.lastData)
      
      const products = [
        {'id': 'Max', 'air': Math.max(...this.state.todayAir.map(o => o.value)), 'time': timeMax},
        {'id': 'Min', 'air': Math.min(...this.state.todayAir.map(o => o.value)), 'time': timeMin},
        {'id': 'Avarage', 'air': Math.round((sumAir/this.state.todayAir.length)*100)/100 , 'time': date}
      ];
  
      const columns = [{
        dataField: 'id',
        text: '', 
        sort: true
      }, {
        dataField: 'air',
        text: 'Air',
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
            Air
          </h3>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to='/dashboard'>Device Control Center</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Air</li>
            </ol>
          </nav>
        </div>
        <div className="row"> 
          <div className="col-xl-3 col-lg-6 col-sm-6 grid-margin stretch-card">
          <div className="card">
            <div className="card-body text-center">
                <h5 className="mb-2 text-dark font-weight-normal">Air</h5>
                <h2 className="mb-4 text-dark font-weight-bold">{this.state.lastData}</h2>
                <div className="px-4 d-flex align-items-center">
                  <svg width="0" height="0">
                    <defs>
                      <linearGradient id="progress-visitors" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#b4ec51"/>
                        <stop offset="100%" stopColor="#429321"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <CircularProgressbarWithChildren className="progress-visitors"
                  value={this.state.lastData}>
                    <div>
                      <i className="mdi mdi-weather-rainy icon-md absolute-center text-dark"></i>
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
          <h5 className="mb-2 text-dark font-weight-normal">Air Overview</h5>
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
                    <h4 className="card-title">Air Chart</h4>
                    <Line data={this.data} options={this.options} />
                </div>
            </div>
          </Tab>
          <Tab eventKey="today" title="Today">
          <div className="card">
          <div className="card-body text-center">
          <h5 className="mb-2 text-dark font-weight-normal">Air Stats Today</h5>
            <BootstrapTable bootstrap4 keyField='id' data={ this.state.todayAir} columns={ StatColumn } />
            </div>
          </div>

          </Tab>
          <Tab eventKey="data" title="Data">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="mb-2 text-dark font-weight-normal">Air Stats</h5>
                <BootstrapTable
                  bootstrap4 
                  keyField='id' 
                  data={ this.state.allAir } 
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

export default Air;