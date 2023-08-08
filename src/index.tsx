import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import {Setting} from './const';
import { offerFullCard, offers } from './mocks/offers';
import { store } from './store';
import { reviews } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        placesCount = {Setting.PlacesCount}
        offers={offers}
        offerFullCard={offerFullCard}
        reviews = {reviews}
      />
    </Provider>
  </React.StrictMode>
);
