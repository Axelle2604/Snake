import React, { Component } from 'react';
import styled from 'styled-components';
import CellScreen from './CellScreen.js';

const NB_CELLS_COLUMN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const NB_CELLS_ROW = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Grid = styled.div`
  display: flex;
`;

const changeSnakePos = (cellX, cellY) => (prevState, props) => ({
  snakePosition: [
    prevState.snakePosition[0] + cellX,
    prevState.snakePosition[1] + cellY,
  ],
});

class GridScreen extends Component {
  constructor(props) {
    super(props);
    this.gridRef = null;
    this.state = {
      snakePosition: [1, 0],
    };
  }

  componentDidMount() {
    this.gridRef.focus();
  }

  moveSnake(e) {
    console.log('coucou');
    if (e.key === 'ArrowLeft') {
      this.setState(changeSnakePos(-1, 0));
    }
    if (e.key === 'ArrowRight') {
      this.setState(changeSnakePos(1, 0));
    }
    if (e.key === 'ArrowDown') {
      this.setState(changeSnakePos(0, 1));
    }
    if (e.key === 'ArrowUp') {
      this.setState(changeSnakePos(0, -1));
    }
  }

  isSnake(cellColumn, cellRow) {
    if (
      this.state.snakePosition[0] === cellColumn &&
      this.state.snakePosition[1] === cellRow
    ) {
      return true;
    }
    return false;
  }

  render() {
    return (
      <Grid
        tabIndex="-1"
        ref={gridRef => (this.gridRef = gridRef)}
        onKeyDown={this.moveSnake.bind(this)}
      >
        {NB_CELLS_COLUMN.map(cellColumn => {
          return (
            <div>
              {NB_CELLS_ROW.map(cellRow => {
                return (
                  <CellScreen
                    position={{ cellColumn, cellRow }}
                    value={this.isSnake(cellColumn, cellRow)}
                  />
                );
              })}
            </div>
          );
        })}
      </Grid>
    );
  }
}
export default GridScreen;
