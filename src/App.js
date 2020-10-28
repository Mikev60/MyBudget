import React, {useEffect}from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './store/actions/index'

// Composants
import Layout from './components/hoc/Layout/Layout'
import BudgetHandler from './components/BudgetHandler/BudgetHandler'
import DashBoard from './components/DashBoard/DashBoard'
import Movements from './components/Movements/Movements'
import Home from './components/Home/Home'
import Logout from './components/Logout/Logout'

import classes from './App.module.css'

const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignup()
  },[])

  let routes = <React.Fragment>
    <Route path="/" exact component={Home} />
    <Redirect to="/" />
    </React.Fragment>

  if(props.isAuthentificated) {
    routes = <React.Fragment>
        <Route path="/movements" component={Movements} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/logout" component={Logout} />
        <Route path="/handler" component={BudgetHandler} />
        <Redirect to="/dashboard" />
    </React.Fragment>
  }

  return (
    <div className={classes.App}>
      <BrowserRouter>
      <Layout>
        {routes}
      </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthentificated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
