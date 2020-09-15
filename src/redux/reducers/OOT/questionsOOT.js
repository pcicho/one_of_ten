import questionsMap from '../../../assets/data/OneOfTen/data';

let questionNumber = localStorage.getItem('reduxStateOOT') ? JSON.parse(localStorage.getItem('reduxStateOOT')).questionsReducerOOT.questionNumber : 0;

const questionsReducerOOT = (state = {}, action) => {
  const activeState = state.activeQuestion;
  if (action.type === 'CHOOSE_ACTIVE_OOT' && action.questions !== undefined) {
    return {
      questionNumber: state.questionNumber || 0,
      askingPlayer: state.askingPlayer || 0,
      activeQuestion: action.questions,
      questions: state.questions,
    };
  }
  if (action.type === 'ASK_QUESTION_OOT') {
    if (questionsMap[state.activeQuestion].length - 1 > state.questionNumber) {
      questionNumber = state.questionNumber + 1;
    } else {
      questionNumber = 0;
    }
    return {
      questionNumber,
      askingPlayer: action.player,
      activeQuestion: state.activeQuestion || 0,
      questions: state.questions,
    };
  }
  if (action.type === 'START_AGAIN_OOT') {
    questionNumber = 0;
    return {
      questionNumber,
      askingPlayer: action.player,
      activeQuestion: state.activeQuestion || 0,
      questions: state.questions,
    };
  }
  if (action.type === 'LOAD_OOT_QUESTION_DATA') {
    return {
      questionNumber: state.questionNumber || 0,
      askingPlayer: state.askingPlayer || 0,
      activeQuestion: activeState || 0,
      questions: action.questions,
    };
  }
  if (action.type === 'REMOVE_OOT_QUESTION_DATA') {
    return {
      questionNumber: state.questionNumber || 0,
      askingPlayer: state.askingPlayer || 0,
      activeQuestion: activeState || 0,
      questions: action.questions,
    };
  }
  return {
    questionNumber: state.questionNumber || 0,
    askingPlayer: state.askingPlayer || 0,
    activeQuestion: activeState || 0,
    questions: state.questions,
  };
};

export default questionsReducerOOT;
