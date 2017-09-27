import React, { Component } from 'react'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider' // esse cara lida com a customização

import { muiTheme } from './app/themes' // nosso metodo com estilo proprio

import './App.css';

import Home from './app/containers/homeContainer' // o container header que criamos

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Home />
      </MuiThemeProvider>
    );
  }
}

export default App;