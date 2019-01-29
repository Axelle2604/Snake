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
      gameState: 'inGame',
      direction: 'right',
    };
  }

  componentDidMount() {
    this.gridRef.focus();
    setInterval(() => this.moveSnakeInDirection(), 1000);
  }

  moveSnakeInDirection() {
    if (this.state.direction === 'left') {
      this.setState(changeSnakePos(-1, 0));
    } else if (this.state.direction === 'right') {
      this.setState(changeSnakePos(1, 0));
    } else if (this.state.direction === 'down') {
      this.setState(changeSnakePos(0, 1));
    } else if (this.state.direction === 'up') {
      this.setState(changeSnakePos(0, -1));
    }
    this.checkBordersCollision();
  }

  checkDirection(e) {
    if (e.key === 'ArrowLeft') {
      this.setState({ direction: 'left' });
    }
    if (e.key === 'ArrowRight') {
      this.setState({ direction: 'right' });
    }
    if (e.key === 'ArrowDown') {
      this.setState({ direction: 'down' });
    }
    if (e.key === 'ArrowUp') {
      this.setState({ direction: 'up' });
    }
  }

  checkBordersCollision() {
    console.log('check');
    const { snakePosition } = this.state;
    const isOverLeftBorder = snakePosition[0] < 0;
    const isOverRightBorder = snakePosition[0] > NB_CELLS_COLUMN.length - 1;
    const isOverBottomBorder = snakePosition[1] > NB_CELLS_ROW.length - 1;
    const isOverTopBorder = snakePosition[1] < 0;

    if (
      isOverLeftBorder ||
      isOverRightBorder ||
      isOverBottomBorder ||
      isOverTopBorder
    ) {
      this.changeGameState('gameOver');
    }
  }

  changeGameState(gameState) {
    this.setState(
      {
        gameState,
      },
      () => this.checkGameState(this.state.gameState)
    );
  }

  checkGameState(gameState) {
    if (gameState === 'gameOver') {
      console.log('perdu');
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
        onKeyDown={this.checkDirection.bind(this)}
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
