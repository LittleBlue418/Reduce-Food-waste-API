import React, { Component } from 'react';
import './App.css';

import AuthContext from '../context/AuthContext';
import Layout from '../Layout/Layout';
import SearchPage from '../Layout/SearchPage/SearchPage';



class App extends Component {
  state = {
    authenticated: false,
  }

  recipes = [
    { id: 'sbv7a', name: 'test recipe 1', ingredients: ['sausages', 'carrots'] },
    { id: 'sbv7a', name: 'test recipe 2', ingredients: ['sausages', 'carrots'] },
    { id: 'sbv7a', name: 'test recipe 3', ingredients: ['sausages', 'carrots'] },
  ]

  tips = [
    {message: "If you cook too much rice put the leftover into the fridge straight away to prevent bacteria forming. Never eat rice that's been left out."},
    {message: "You can re-cook leftover rice, but make sure you heat it thoroughly to kill off any harmful bacteria."},
    {message: "You can eat cold leftover rice as long as it was refrigerated straight way and not left out."},
    {message: "Buy one get one free? Put the second one in the freezer for another day!"},
    {message: "Buying a large peice of meat and cutting it into portions is often cheaper than buying pre-cut. Just freeze the rest for another day."}
  ]

  loginHandler = () => {
    this.setState({ authenticated: true})
    console.log('hey')
  }

  randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  }

  randomTip = () => {
    return this.tips[this.randomNumber(0, (this.tips.length -1))]
  }

  render() {
      return(
        <div className = "App" >
          <AuthContext.Provider
            value={{
              authenticated: this.state.authenticated,
              login: this.loginHandler
            }}>

            <Layout />
            <SearchPage
              tipFunc={this.randomTip}/>

          </AuthContext.Provider>

        </div>
      );
  }

}

export default App;
