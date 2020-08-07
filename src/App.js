import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Form from './module/employee/form';
import List from './module/employee/list';
import Edit from './module/employee/edit';

import FormRole from './module/role/form';
import ListRole from './module/role/list';
import EditRole from './module/role/edit';

import FormState from './module/state/form';
import ListState from './module/state/list';
import EditState from './module/state/edit';

import FormCity from './module/city/form';
import ListCity from './module/city/list';
import EditCity from './module/city/edit';

function App() {
  return (
    <Router>
      <div className="App">
        <nav class="navbar vanbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="https://tutofox.com/" style={{color: 'orange', fontWeight: 'bold'}}>tutofox.com</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="nav nav-pills">
              <li class="nav-item active dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Roles</a>
                <div class="dropdown-menu">
                  <Link class="dropdown-item" to="/role">Role List</Link>
                  <Link class="dropdown-item" to="/role/form">+ Add Role</Link>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Employees</a>
                <div class="dropdown-menu">
                  <Link class="dropdown-item" to="/employee">List</Link>
                  <Link class="dropdown-item" to="/employee/form">+ Add Employee</Link>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">States</a>
                <div class="dropdown-menu">
                  <Link class="dropdown-item" to="/state">State List</Link>
                  <Link class="dropdown-item" to="/state/form">+ Add State</Link>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Cities</a>
                <div class="dropdown-menu">
                  <Link class="dropdown-item" to="/city">City List</Link>
                  <Link class="dropdown-item" to="/City/form">+ Add City</Link>
                </div>                  
              </li>
            </ul>
          </div>
        </nav>
        <div class="container py-4" >
          <div class="row">
            <Route path="/employee" exact component={List} />
            <Route path="/employee/form" component={Form} />
            <Route path="/employee/edit/:id" component={Edit} />
            <Route path="/role" exact component={ListRole} />
            <Route path="/role/form" component={FormRole} />
            <Route path="/role/edit/:id" component={EditRole} />
            <Route path="/state" exact component={ListState} />
            <Route path="/state/form" component={FormState} />
            <Route path="/state/edit/:id" component={EditState} />
            <Route path="/city" exact component={ListCity} />
            <Route path="/city/form" component={FormCity} />
            <Route path="/city/edit/:id" component={EditCity} />
          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;