import React from 'react';
import styled from 'styled-components';

const ScoreScreen = styled.div`
  color: white;
  padding: 10px;
  font-size: 18px;
`;

export default function Header(props) {
  return (
    <div>
      <ScoreScreen>Score : {props.score}</ScoreScreen>
    </div>
  );
}
