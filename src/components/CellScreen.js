import React, { Component } from 'react';
import styled from 'styled-components';

const Cell = styled.div`
border: solid 1px #ecf0f1
height: 50px;
width: 50px;
background-color: ${props =>
  props.isSnake ? '#2ecc71' : props.isFruit ? '#e67e22' : '#ffffff'};
`;

class CellScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: Object.values(props.position),
    };
  }

  render() {
    return <Cell isSnake={this.props.isSnake} isFruit={this.props.isFruit} />;
  }
}

export default CellScreen;
