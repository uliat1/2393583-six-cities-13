import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import WelcomeScreen from '../../pages/main/main';
import LoginScreen from '../../pages/login-page/login-page';
import FavoritesScreen from '../../pages/favorites-page/favorites-page';
import OfferScreen from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-router/private-router';
import { Offer, OfferCard } from '../../types/offer';
import { Review } from '../../types/review';

type AppProps = {
  offers: Offer[];
  offerFullCard: OfferCard;
  reviews: Review[];
  cities: string[];
};

function App(props: AppProps): JSX.Element {
  const {offers, offerFullCard, reviews, cities} = props;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <WelcomeScreen
                offers={offers}
                cities={cities}
              />
            }
          />
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route
            path={AppRoute.Favotites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesScreen offers={offers} />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen offers={offers} offerFullCard={offerFullCard} reviews={reviews} />}
          />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
export default App;
