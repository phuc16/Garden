import React, { Component } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import BootstrapTable from 'react-bootstrap-table-next';
import { Tabs, Tab } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import paginationFactory from 'react-bootstrap-table2-paginator';

const products = [
  {'id': 'Max', 'temp': '31', 'time': 11111111},
  {'id': 'Min', 'temp': '31', 'time': 11111111},
  {'id': 'Avarage', 'temp': '31', 'time': 11111111}
];
const columns = [{
  dataField: 'id',
  text: '',
  sort: true
}, {
  dataField: 'temp',
  text: 'Temperature',
  sort: true
}, {
  dataField: 'time',
  text: 'Time',
  sort: true
}
];




class Temperature extends Component {
  data = {
    labels: ["2013", "2014", "2014", "2015", "2016", "2017"],
    datasets: [{
      label: '# of Votes',
      data: [10, 19, 3, 5, 2, 3],
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
      fill: false
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
        display: false
      },
      elements: {
        point: {
          radius: 0
        }
      }

  };

  render () {
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
                <h2 className="mb-4 text-dark font-weight-bold">100,38</h2>
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
                    value={90}>
                      <div>
                        <i className="mdi mdi-coolant-temperature icon-md absolute-center text-dark"></i>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>                              
                <p className="mt-4 mb-0">Increased since yesterday</p>
                <h3 className="mb-0 font-weight-bold mt-2 text-dark">35%</h3>
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
            <BootstrapTable bootstrap4 keyField='id' data={ products } columns={ columns } />
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
                  data={ products } 
                  columns={ columns } 
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