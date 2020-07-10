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
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <Link clas="nav-link" to="/role">Role List</Link>
                <Link clas="nav-link" to="/employee">Employee List</Link>
              </li>
            </ul>
            <Link class="btn btn-info" to="/employee/form">Add Employee</Link>
            <Link class="btn btn-info" to="/role/form">Add Role</Link>
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
          </div>
        </div>

      </div>
    </Router>
  );
}

export default App;