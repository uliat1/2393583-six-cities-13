import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import WelcomeScreen from '../../pages/main/main';
import LoginScreen from '../../pages/login-page/login-page';
import FavoritesScreen from '../../pages/favorites-page/favorites-page';
import OfferScreen from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-router/private-router';
import { OfferCard } from '../../types/offer';
import { Review } from '../../types/review';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import LoadingScreen from '../../pages/loading-page/loading-page';
import { useAppSelector } from '../../hooks';

type AppProps = {
  offerFullCard: OfferCard;
  reviews: Review[];
  cities: string[];
};

function App(props: AppProps): JSX.Element {
  const {offerFullCard, reviews, cities} = props;

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers = useAppSelector((state) => state.offers);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <WelcomeScreen
                offers={offers}
                cities={cities}
                authorizationStatus={authorizationStatus}
              />
            }
          />
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route
            path={AppRoute.Favotites}
            element={
              <PrivateRoute authorizationStatus={authorizationStatus}>
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route
            path={AppRoute.Offer}
            element={<OfferScreen offers={offers} offerFullCard={offerFullCard} reviews={reviews} />}
          />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
export default App;
