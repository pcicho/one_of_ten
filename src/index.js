import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import registerServiceWorker from './workers/registerServiceWorker';
import reduxStore from './redux/store';

ReactDOM.render(<Provider store={reduxStore}><App /></Provider>, document.getElementById('root'));

registerServiceWorker();
