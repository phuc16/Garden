import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { Trans } from 'react-i18next';
import './sidebar.css';

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({[menuState] : false});
    } else if(Object.keys(this.state).length === 0) {
      this.setState({[menuState] : true});
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({[i]: false});
      });
      this.setState({[menuState] : true});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({[i]: false});
    });

    const dropdownPaths = [
      {path:'/apps', state: 'appsMenuOpen'},
      {path:'/environment-factors', state: 'basicUiMenuOpen'},
      {path:'/advanced-ui', state: 'advancedUiMenuOpen'},
      {path:'/form-elements', state: 'formElementsMenuOpen'},
      {path:'/tables', state: 'tablesMenuOpen'},
      {path:'/maps', state: 'mapsMenuOpen'},
      {path:'/icons', state: 'iconsMenuOpen'},
      {path:'/charts', state: 'chartsMenuOpen'},
      {path:'/user-pages', state: 'userPagesMenuOpen'},
      {path:'/error-pages', state: 'errorPagesMenuOpen'},
      {path:'/general-pages', state: 'generalPagesMenuOpen'},
      {path:'/ecommerce', state: 'ecommercePagesMenuOpen'},
      {path:'/time-setting', state: 'timeMenuOpen'},
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({[obj.state] : true})
      }
    }));
 
  } 
  render () {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">
          <li className="nav-item nav-category"><Trans>Operation</Trans></li>
          <li className={ this.isPathActive('/dashboard') ? 'nav-item active' : 'nav-item' }>
            <Link className="nav-link" to="/dashboard">
              <span className="icon-bg"><i className="mdi mdi-cube menu-icon"></i></span>
              <span className="menu-title"><Trans>Device Control Center</Trans></span>
            </Link>
          </li>
          <li className="nav-item nav-category"><Trans>Environment Factors</Trans></li>
          <li className={ this.isPathActive('/environment-factors/soil') ? 'nav-item active soil-bar' : 'nav-item soil-bar' }>
            <Link className={ this.isPathActive('/environment-factors/soil') ? 'nav-link active ' : 'nav-link' } to="/environment-factors/soil">
                <span className="icon-bg"><i className="mdi mdi-waves menu-icon"></i></span>
                <span className="menu-title"><Trans>Soil Moisture </Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/environment-factors/air') ? 'nav-item active air-bar' : 'nav-item air-bar' }>
            <Link className={ this.isPathActive('/environment-factors/air') ? 'nav-link active' : 'nav-link' } to="/environment-factors/air">
                <span className="icon-bg"><i className="mdi mdi-weather-rainy menu-icon"></i></span>
                <span className="menu-title"><Trans>Air</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/environment-factors/temperature') ? 'nav-item active temp-bar' : 'nav-item temp-bar' }>
            <Link className={ this.isPathActive('/environment-factors/temperature') ? 'nav-link active' : 'nav-link' } to="/environment-factors/temperature">
                <span className="icon-bg"><i className="mdi mdi-coolant-temperature menu-icon"></i></span>
                <span className="menu-title"><Trans>Temperature</Trans></span>
            </Link>
          </li>
          <li className={ this.isPathActive('/environment-factors/light') ? 'nav-item active light-bar' : 'nav-item light-bar' }>
            <Link className={ this.isPathActive('/environment-factors/light') ? 'nav-link active' : 'nav-link' } to="/environment-factors/light">
              <span className="icon-bg"><i className="mdi mdi-weather-sunny menu-icon"></i></span>
              <span className="menu-title"><Trans>Light Intensity</Trans></span>
            </Link>
          </li>
          

          <li className="nav-item nav-category"><Trans>Control Scheduler</Trans></li>
          <li className={ this.isPathActive('/control-scheduler') ? 'nav-item active' : 'nav-item' }>
            <Link className={ this.isPathActive('/control-scheduler/schedule') ? 'nav-link active' : 'nav-link' } to="/control-scheduler/schedule">
                <span className="icon-bg"><i className="mdi mdi-chart-bar menu-icon"></i></span>
                <span className="menu-title"><Trans>Schedule</Trans></span>
            </Link>
          </li>
          {/* <li className="nav-item sidebar-user-actions">
            <div className="user-details">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="d-flex align-items-center">
                    <div className="sidebar-profile-img">
                      <img src={require("../../assets/images/faces/face28.png")} alt="profile" />
                    </div>
                    <div className="sidebar-profile-text">
                      <p className="mb-1"><Trans>Henry Klein</Trans></p>
                    </div>
                  </div>
                </div>
                <div className="badge badge-danger">3</div>
              </div>
            </div>
          </li> */}
          {/* <li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
              <a href="!#" onClick={event => event.preventDefault()} className="nav-link"><i className="mdi mdi-settings menu-icon"></i>
                <span className="menu-title"><Trans>Settings</Trans></span>
              </a>
            </div>
          </li>
          <li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
              <a href="!#" onClick={event => event.preventDefault()} className="nav-link"><i className="mdi mdi-speedometer menu-icon"></i>
                <span className="menu-title"><Trans>Take Tour</Trans></span></a>
            </div>
          </li>
          <li className="nav-item sidebar-user-actions">
            <div className="sidebar-user-menu">
              <a href="!#" onClick={event => event.preventDefault()} className="nav-link"><i className="mdi mdi-logout menu-icon"></i>
                <span className="menu-title"><Trans>Log Out</Trans></span></a>
            </div>
          </li> */}
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {
      
      el.addEventListener('mouseover', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if(body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);