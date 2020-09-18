import React from 'react';
import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/login/Login';
import Authorization from './containers/Authorization';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" component={Login}/>
          <Authorization>
            <Route path="/dashboard" component={Dashboard} />
            <Route exact path='/' render={() => <Redirect to='/dashboard' />}/>
          </Authorization>
      </BrowserRouter>
    </div>
  );
}

export default App;
