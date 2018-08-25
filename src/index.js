import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Amplify from 'aws-amplify';
import configuration from './aws-exports';

Amplify.configure(configuration);
Amplify.Analytics.disable();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
