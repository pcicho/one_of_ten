import React from 'react';
import PlayerInput from './PlayerInput';

const StepOne = (props) => {
  const getPlayers = () => {
    const players = [];
    for (let i = 0; i < props.playerNumber; i += 1) {
      players.push(<PlayerInput key={i} playerNumber={i} inputPlaceholder={props.inputPlaceholder} reducerName={props.reducerName} />);
    }
    return players;
  };
  return (
    <div>
      {getPlayers()}
    </div>
  );
};

export default StepOne;
