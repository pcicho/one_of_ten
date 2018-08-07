import { combineReducers } from 'redux';
import stepperReducerOOT from './OOT/stepperOOT';
import playersReducerOOT from './OOT/playersOOT';
import questionsReducerOOT from './OOT/questionsOOT';
import initialStateOOT from './OOT/initialStateOOT';
import stepperReducerFF from './FF/stepperFF';
import questionsReducerFF from './FF/questionsFF';
import initialStateFF from './FF/initialStateFF';


const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case 'STEP_RESET_OOT':
      return {
        ...initialStateOOT,
        questionsReducerFF: state.questionsReducerFF,
        stepperReducerFF: state.stepperReducerFF,
      };
    case 'STEP_RESET_FF':
      return {
        ...initialStateFF,
        questionsReducerOOT: state.questionsReducerOOT,
        stepperReducerOOT: state.stepperReducerOOT,
        playersReducerOOT: state.playersReducerOOT,
      };
    default:
      return combineReducers({
        stepperReducerOOT,
        playersReducerOOT,
        questionsReducerOOT,
        stepperReducerFF,
        questionsReducerFF,
      })(state, action);
  }
};

export default rootReducer;
