import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import './assets/fonts/amoreiza-regular.ttf'
import './assets/fonts/Atomsfer.ttf'

const root = ReactDOM.createRoot(
  	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

