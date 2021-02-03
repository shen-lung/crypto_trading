import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './css/index.css';

const SW_URL = process.env.NODE_ENV === 'production' ? '/react/service-worker.js' : '/service-worker.js';

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register(SW_URL).then(registration => {
//             console.log('SW registered: ', registration);
//         }).catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }

ReactDOM.render(<App />, document.getElementById('root'));
