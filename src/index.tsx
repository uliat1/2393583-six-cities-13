import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { offerFullCard, offers } from './mocks/offers';
import { reviews } from './mocks/reviews';
import { CITIES } from './const';
import { Provider } from 'react-redux';
import { store } from './store';
import ErrorMessage from './components/error-message/error-message';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        offers={offers}
        offerFullCard={offerFullCard}
        reviews={reviews}
        cities={CITIES}
      />
    </Provider>
  </React.StrictMode>
);
