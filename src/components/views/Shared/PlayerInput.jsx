import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const handleChangeInput = (ev) => {
  const event = ev;
  return {
    type: 'INSERT_NAMES_OOT',
    player: event.target.name,
    name: event.target.value,
  };
};

const handleSetUpPlayers = (ev) => {
  const event = ev;
  return {
    type: 'SET_UP_PLAYERS_FF',
    player: event.target.name,
    name: event.target.value,
  };
};

const PlayerInput = props => (
  <div className="player-field">
    <input
      className="playerName"
      name={props.playerNumber}
      value={
        props.reducerName === 'OOT' ?
        props.playersReducerOOT.playerList[props.playerNumber] || '' :
        props.questionsReducerFF.playerList[props.playerNumber] || ''
      }
      placeholder={`${props.inputPlaceholder} ${props.playerNumber + 1}`}
      onChange={ev => (
        props.reducerName === 'OOT' ? props.handleChangeInput(ev) : props.handleSetUpPlayers(ev)
      )}
      type="text"
      required
    />
  </div>
);

const mapStateToProps = state => ({
  playersReducerOOT: state.playersReducerOOT,
  questionsReducerFF: state.questionsReducerFF,
});

const matchDispatchToProps = dispatch => bindActionCreators({
  handleChangeInput,
  handleSetUpPlayers,
}, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(PlayerInput);
