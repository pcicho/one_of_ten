import { createStore } from 'redux';
import rootReducer from './reducers/root';
import initialStateOOT from './reducers/OOT/initialStateOOT';
import initialStateFF from './reducers/FF/initialStateFF';

let persistedState;
if (localStorage.getItem('reduxStateOOT') && localStorage.getItem('reduxStateFF')) {
  persistedState = { ...JSON.parse(localStorage.getItem('reduxStateOOT')), ...JSON.parse(localStorage.getItem('reduxStateFF')) };
} else {
  persistedState = { ...initialStateOOT, ...initialStateFF };
}

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer, persistedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // Redux DevTools
);
/* eslint-enable */

store.subscribe(() => {
  const storeReasign = {
    oneOfTen: {
      playersReducerOOT: { ...store.getState().playersReducerOOT },
      questionsReducerOOT: { ...store.getState().questionsReducerOOT },
      stepperReducerOOT: { ...store.getState().stepperReducerOOT },
    },
    familyFeud: {
      stepperReducerFF: { ...store.getState().stepperReducerFF },
      questionsReducerFF: { ...store.getState().questionsReducerFF },
    },
  };

  localStorage.setItem('reduxStateOOT', JSON.stringify(storeReasign.oneOfTen));
  localStorage.setItem('reduxStateFF', JSON.stringify(storeReasign.familyFeud));
});

export default store;
