import { render } from 'preact';
import './styles/shell.scss';

const root = document.getElementById('root')

const renderRoot = function() {
  const App = require('./views').default;
  render(App, root, root.firstElementChild);
}

renderRoot();

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    navigator.serviceWorker.register('service-worker.js').then(function(reg) {
      reg.onupdatefound = function() {
        const installingWorker = reg.installing;

        installingWorker.onstatechange = function() {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                const event = new Event('app:update');
                document.dispatchEvent(event);
              }
              break;
          }
        };
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }
} else {
  require('preact/devtools');

  // listen for HMR
  if (module.hot) {
    module.hot.accept('./views', renderRoot);
  }
}
