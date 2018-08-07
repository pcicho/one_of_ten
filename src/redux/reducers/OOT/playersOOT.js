import falseSoundData from '../../../assets/audio/false.wav';

let playerList = [];
let playerChances = [];
const falseSound = new Audio(falseSoundData);

const playersReducerOOT = (state = {}, action) => {
  const activeState = state.playerList;
  const activeStateChances = state.playerChances;
  playerList = localStorage.getItem('reduxStateOOT') ? JSON.parse(localStorage.getItem('reduxStateOOT')).playersReducerOOT.playerList : [];
  playerChances = localStorage.getItem('reduxStateOOT') ? JSON.parse(localStorage.getItem('reduxStateOOT')).playersReducerOOT.playerChances : [];
  if (action.type === 'INSERT_NAMES_OOT' && action.name !== null) {
    playerList[action.player] = action.name;
    playerChances[action.player] = 3;
    return {
      playerList,
      playerChances,
    };
  }
  if (action.type === 'CHANCE_CHANGE_ADD_OOT' && action.name !== null) {
    if (playerChances[action.player] < 3) {
      playerChances[action.player] += 1;
      return {
        playerList,
        playerChances,
      };
    }
  }
  if (action.type === 'CHANCE_CHANGE_REMOVE_OOT' && action.name !== null) {
    if (playerChances[action.player] > 0) {
      if (falseSound !== undefined) {
        falseSound.play();
      }
      falseSound.play();
      playerChances[action.player] -= 1;
      return {
        playerList,
        playerChances,
      };
    }
  }
  return {
    playerList: activeState || [],
    playerChances: activeStateChances || [],
  };
};

export default playersReducerOOT;
