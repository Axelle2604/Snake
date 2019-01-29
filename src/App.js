import React, { Component } from 'react';
import GridScreen from './components/GridScreen.js';
import styled from 'styled-components';

const AppScreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e74c3c;
`;

class App extends Component {
  render() {
    return (
      <AppScreen>
        <GridScreen />
      </AppScreen>
    );
  }
}

export default App;
