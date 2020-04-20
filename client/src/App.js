import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import HomePage from './pages/home.component';
import SignInPage from './pages/signin.component';
import DashboardPage from './pages/dashboard.component.jsx';
//import { _404}  from './pages/error/errorpage.component';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.action';

import Header from './components/header.component';

const App = ({ checkUserSession, currentUser }) => {
  
  useEffect(() => {
    checkUserSession() }, [checkUserSession]
  );

  return (
    <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/dashboard"  render={() =>
            currentUser ? (
              <DashboardPage />
            ) : ( 
              <Redirect to='/' />
              )
          }
          />
          <Route exact path="/signin" render={() =>
              currentUser ? (
                <Redirect to='/dashboard' />
              ) : (
                <SignInPage />
              )
            } 
          />
        </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
