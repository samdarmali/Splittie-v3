import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import NewBill from './containers/NewBill/NewBill';
import PastBills from './containers/PastBills/PastBills';
import Login from './containers/Login/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/pastbills" component={PastBills} />
            <Route path="/login" component={Login} />
            <Route path="/" component={NewBill} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
