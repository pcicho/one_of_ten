
const stepperReducerFF = (state = {}, action) => {
  const activeState = state.activeStep;
  const activeGame = state.gameStart;
  if (action.type === 'STEP_NEXT_FF') {
    return {
      activeStep: activeState + 1,
      gameStart: false,
    };
  } else if (action.type === 'STEP_BACK_FF') {
    return {
      activeStep: activeState - 1,
      gameStart: false,
    };
  } else if (action.type === 'STEP_RESET_FF') {
    return {
      activeStep: 0,
      gameStart: false,
    };
  }
  if (action.type === 'STEP_FINISH_FF') {
    return {
      activeStep: activeState,
      gameStart: true,
    };
  }
  return {
    activeStep: activeState || 0,
    gameStart: activeGame || false,
  };
};

export default stepperReducerFF;
