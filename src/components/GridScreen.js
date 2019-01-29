import React, { Component } from 'react';
import styled from 'styled-components';
import CellScreen from './CellScreen.js';

const NB_CELLS_COLUMN = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const NB_CELLS_ROW = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const START_GAME = 'startGame';
const IN_GAME = 'inGame';
const END_GAME = 'endGame';

const Grid = styled.div`
  display: flex;
  border: ${props => (props.isLose === END_GAME ? 'solid 10px red' : null)};
`;

const LoseScreen = styled.div`
  background-color: #282828;
`;

const changeSnakePos = (cellX, cellY) => (prevState, props) => {
  const isSameSize = prevState.snakeSize === prevState.snakePositions.length;
  const setBehavior = isSameSize
    ? prevState.snakePositions.slice(0, prevState.snakePositions.length - 1)
    : prevState.snakePositions;
  return {
    snakePositions: [
      [
        prevState.snakePositions[0][0] + cellX,
        prevState.snakePositions[0][1] + cellY,
      ],
      ...setBehavior,
    ],
  };
};

const increasesSnakeSize = () => (prevState, props) => ({
  snakeSize: prevState.snakeSize + 1,
});

class GridScreen extends Component {
  constructor(props) {
    super(props);
    this.gridRef = null;
    this.state = {
      snakePositions: [[3, 0], [2, 0], [1, 0]],
      fruitPosition: [0, 0],
      gameState: IN_GAME,
      direction: 'right',
      snakeSize: 3,
    };
  }

  componentDidMount() {
    const { gameState } = this.state;
    this.gridRef.focus();
    this.displayFruit();
    if (gameState === IN_GAME)
      this.intervalID = setInterval(() => this.moveSnakeInDirection(), 1000);
  }

  moveSnakeInDirection() {
    const { direction } = this.state;

    if (direction === 'left') {
      this.setState(changeSnakePos(-1, 0));
    } else if (direction === 'right') {
      this.setState(changeSnakePos(1, 0));
    } else if (direction === 'down') {
      this.setState(changeSnakePos(0, 1));
    } else if (direction === 'up') {
      this.setState(changeSnakePos(0, -1));
    }
    this.checkBordersCollision();
    this.checkFruitCollision();
    //this.checkCollisionWithMyself();
  }

  checkDirection(e) {
    const { direction } = this.state;
    if (e.key === 'ArrowLeft' && direction !== 'right') {
      this.setState({ direction: 'left' });
    }
    if (e.key === 'ArrowRight' && direction !== 'left') {
      this.setState({ direction: 'right' });
    }
    if (e.key === 'ArrowDown' && direction !== 'up') {
      this.setState({ direction: 'down' });
    }
    if (e.key === 'ArrowUp' && direction !== 'down') {
      this.setState({ direction: 'up' });
    }
  }

  checkBordersCollision() {
    const { snakePositions } = this.state;
    const isOverLeftBorder = snakePositions[0][0] < 0;
    const isOverRightBorder = snakePositions[0][0] > NB_CELLS_COLUMN.length - 1;
    const isOverBottomBorder = snakePositions[0][1] > NB_CELLS_ROW.length - 1;
    const isOverTopBorder = snakePositions[0][1] < 0;

    if (
      isOverLeftBorder ||
      isOverRightBorder ||
      isOverBottomBorder ||
      isOverTopBorder
    ) {
      console.log('check');

      this.changeGameState(END_GAME);
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
    if (gameState === END_GAME) {
      clearInterval(this.intervalID);
    }
  }

  isSnake(cellColumn, cellRow) {
    const { snakePositions } = this.state;
    return snakePositions.find(member => {
      return member[0] === cellColumn && member[1] === cellRow ? true : false;
    });
  }

  isFruit(cellColumn, cellRow) {
    const { fruitPosition } = this.state;
    if (fruitPosition[0] === cellColumn && fruitPosition[1] === cellRow) {
      return true;
    }
    return false;
  }

  displayFruit() {
    const fruitPosX = Math.floor(Math.random() * (NB_CELLS_COLUMN.length - 1));
    const fruitPosY = Math.floor(Math.random() * (NB_CELLS_ROW.length - 1));
    this.setState({
      fruitPosition: [fruitPosX, fruitPosY],
    });
  }

  checkFruitCollision() {
    const { snakePositions, fruitPosition } = this.state;

    if (
      snakePositions[0][0] === fruitPosition[0] &&
      snakePositions[0][1] === fruitPosition[1]
    ) {
      this.setState(increasesSnakeSize(), this.displayFruit());
      this.props.incrementScore();
    }
  }

  checkCollisionWithMyself() {
    const { snakePositions } = this.state;

    const bodySnake = () => snakePositions.slice(1, snakePositions.length - 1);
    console.log(bodySnake);

    const checkCollision = () =>
      bodySnake.find(position => {
        return position === snakePositions[0];
      });

    if (checkCollision) {
      console.log('collision');
      return this.changeGameState(END_GAME);
    }
    return null;
  }

  render() {
    return (
      <Grid
        tabIndex="-1"
        ref={gridRef => (this.gridRef = gridRef)}
        onKeyDown={this.checkDirection.bind(this)}
        isLose={this.state.gameState}
      >
        {NB_CELLS_COLUMN.map(cellColumn => {
          return (
            <div>
              {NB_CELLS_ROW.map(cellRow => {
                return (
                  <CellScreen
                    position={{ cellColumn, cellRow }}
                    isSnake={this.isSnake(cellColumn, cellRow)}
                    isFruit={this.isFruit(cellColumn, cellRow)}
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
