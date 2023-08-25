import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import Layout from '../layout/layout';
import WelcomeScreen from '../../pages/main/main';
import LoginScreen from '../../pages/login-page/login-page';
import FavoritesScreen from '../../pages/favorites-page/favorites-page';
import OfferScreen from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-router/private-router';
import { useAppSelector } from '../../hooks';
import LoadingSpinner from '../../pages/loading-spinner/loading-spinner';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

type AppProps = {
  cities: string[];
};

function App(props: AppProps): JSX.Element {
  const {cities} = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const offers = useAppSelector((state) => state.offers);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<Layout authorizationStatus={authorizationStatus} />}>
            <Route
              index element={
                <WelcomeScreen
                  offers={offers}
                  cities={cities}
                />
              }
            />
            <Route element={<PrivateRoute authorizationStatus={authorizationStatus} />}>
              <Route
                element={<FavoritesScreen />}
                path={AppRoute.Favotites}
              />
            </Route>
            <Route
              path={`${AppRoute.Offer}:id`}
              element={<OfferScreen />}
            />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path={AppRoute.Login} element={<LoginScreen />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
