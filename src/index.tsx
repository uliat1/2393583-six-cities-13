import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import HistoryRoute from '../src/components/history-route/history-route';
import {store} from './store';
import {checkAuthAction, fetchOffersAction} from './store/api-actions';
import browserHistory from './browser-history';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRoute history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRoute>
    </Provider>
  </React.StrictMode>,
);
