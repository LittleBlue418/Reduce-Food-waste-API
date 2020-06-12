import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import AuthContext from '../context/AuthContext';
import Layout from '../Layout/Layout';
import SearchPage from '../Layout/SearchPage/SearchPage';
import RecipePage from '../components/RecipePage/RecipePage';



class App extends Component {
  state = {
    authenticated: false,
  }


  render() {
      return(
        <Router>

          <div className = "App" >
          <AuthContext.Provider
            value={{
              authenticated: this.state.authenticated,
              login: this.loginHandler
            }}>

            <Layout />

            <Switch>

              <Route path="/recipe/:recipe_id">
                <RecipePage />
              </Route>

              <Route path="/">
                <SearchPage />
              </Route>

            </Switch>

          </AuthContext.Provider>

          </div>

        </Router>
      );
  }

}

export default App;
