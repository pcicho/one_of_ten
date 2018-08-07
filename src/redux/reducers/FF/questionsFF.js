import trueSoundData from './../../../assets/audio/trueFF.ogg';
import falseSoundData from './../../../assets/audio/falseFF.ogg';

const trueSound = new Audio(trueSoundData);
const falseSound = new Audio(falseSoundData);

let selectedTeam = localStorage.getItem('reduxStateFF') ? JSON.parse(localStorage.getItem('reduxStateFF')).questionsReducerFF.selectedTeam : null;
let multiply = localStorage.getItem('reduxStateFF') ? JSON.parse(localStorage.getItem('reduxStateFF')).questionsReducerFF.multiply : 1;
let playerList = [];
let totalScore = {};

const questionsReducerFF = (state = {}, action) => {
  const choosedAnswer = localStorage.getItem('reduxStateFF') ? JSON.parse(localStorage.getItem('reduxStateFF')).questionsReducerFF.choosedAnswer : [];
  const { activeEnquiry } = state;
  const answers = localStorage.getItem('reduxStateFF') ? JSON.parse(localStorage.getItem('reduxStateFF')).questionsReducerFF.answers : {};
  totalScore = localStorage.getItem('reduxStateFF') ? JSON.parse(localStorage.getItem('reduxStateFF')).questionsReducerFF.totalScore : {};

  const resetAnswersAll = () => {
    answers[state.playerList[0]] = {
      wrong: 0,
      score: 0,
    };
    answers[state.playerList[1]] = {
      wrong: 0,
      score: 0,
    };
  };

  const resetAnswersScore = () => {
    answers[state.playerList[0]].score = 0;
    answers[state.playerList[1]].score = 0;
  };

  if (action.type === 'CHOOSE_ACTIVE_FF' && action.questions !== undefined) {
    return {
      ...state,
      activeQuestion: action.questions,
    };
  } else if (action.type === 'SET_UP_PLAYERS_FF' && action.name !== null) {
    playerList = localStorage.getItem('reduxStateFF') ? JSON.parse(localStorage.getItem('reduxStateFF')).questionsReducerFF.playerList : [];
    playerList[action.player] = action.name;
    return {
      ...state,
      playerList,
    };
  } else if (action.type === 'CHOOSE_ACTIVE_ENQUIRY') {
    resetAnswersAll();
    return {
      ...state,
      choosedAnswer: [],
      activeEnquiry: action.enquiry,
      answers,
    };
  } else if (action.type === 'CHOSEN_ANSWER') {
    trueSound.play();
    const lastScore = state.answers[selectedTeam].score;
    if (!choosedAnswer.includes(action.answer)) {
      choosedAnswer.push(action.answer);
    }
    answers[selectedTeam] = {
      wrong: state.answers[selectedTeam].wrong,
      score: lastScore + action.score,
    };
    return {
      ...state,
      choosedAnswer,
      activeEnquiry,
      answers,
      selectedTeam,
      totalScore,
    };
  } else if (action.type === 'SELECT_TEAM') {
    selectedTeam = action.team;
    return {
      ...state,
      choosedAnswer,
      activeEnquiry,
      selectedTeam,
      answers,
      totalScore,
    };
  } else if (action.type === 'WRONG_ANSWER') {
    falseSound.play();
    let lastWrong = state.answers[selectedTeam].wrong || 0;
    if (lastWrong < 3) {
      lastWrong += 1;
    }
    answers[selectedTeam] = {
      wrong: lastWrong,
      score: state.answers[selectedTeam].score,
    };
    return {
      ...state,
      choosedAnswer,
      activeEnquiry,
      answers,
      selectedTeam,
      totalScore,
    };
  } else if (action.type === 'PAY_WINNER') {
    totalScore[selectedTeam] = (totalScore[selectedTeam] === null || totalScore[selectedTeam] === undefined)
      ? 0 + ((state.answers[state.playerList[0]].score + state.answers[state.playerList[1]].score) * multiply)
      : totalScore[selectedTeam] + ((state.answers[state.playerList[0]].score + state.answers[state.playerList[1]].score) * multiply);

    resetAnswersScore();
    trueSound.play();

    return {
      ...state,
      choosedAnswer,
      activeEnquiry,
      selectedTeam,
      answers,
      totalScore,
    };
  } else if (action.type === 'MYLTIPLY') {
    multiply = action.pow;
    return {
      ...state,
      choosedAnswer,
      activeEnquiry,
      selectedTeam,
      answers,
      totalScore,
      multiply,
    };
  }
  return {
    ...state,
  };
};

export default questionsReducerFF;
