
const stepperReducerOOT = (state = {}, action) => {
  const activeState = state.activeStep;
  const activeGame = state.gameStart;
  if (action.type === 'STEP_NEXT_OOT') {
    return {
      activeStep: activeState + 1,
      gameStart: false,
    };
  } else if (action.type === 'STEP_BACK_OOT') {
    return {
      activeStep: activeState - 1,
      gameStart: false,
    };
  } else if (action.type === 'STEP_RESET_OOT') {
    return {
      activeStep: 0,
      gameStart: false,
    };
  }
  if (action.type === 'STEP_FINISH_OOT') {
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

export default stepperReducerOOT;
