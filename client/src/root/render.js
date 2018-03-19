import ReactDOM from 'react-dom';
import { getRootElement } from './getRootElement';
import { registerServiceWorker } from './registerServiceWorker';

export const render = (reactEl) => {
  ReactDOM.render(
    reactEl,
    getRootElement(),
  );
  registerServiceWorker();
};
