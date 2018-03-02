import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Board from './components/Board';
import './App.css'

ReactDOM.render(<Board />, document.getElementById('root'));
registerServiceWorker();
