import React, { Component } from 'react';
import GridScreen from './components/GridScreen.js';
import Header from './components/Header.js';

import styled from 'styled-components';

const AppScreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #e74c3c;
`;

const incrementScore = () => (prevState, props) => ({
  score: prevState.score + 1,
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
    };
  }

  incrementScore() {
    console.log('inc');
    this.setState(incrementScore());
  }

  render() {
    return (
      <AppScreen>
        <Header score={this.state.score} />
        <GridScreen incrementScore={this.incrementScore.bind(this)} />
      </AppScreen>
    );
  }
}

export default App;
