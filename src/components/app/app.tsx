import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import WelcomeScreen from '../../pages/welcome-page/welcome-page';
import WelcomeScreenEmpty from '../../pages/welcome-page-empty/welcome-page-empty';
import NotFound from '../../pages/not-found-page/not-found-page';
import LoginScreen from '../../pages/login-page/login-page';
import PrivateRoute from '../private-router/private-router';
import {useAppSelector} from '../../hooks';
import LoadingSpinner from '../../pages/loading-spinner/loading-spinner';
import ErrorScreen from '../../pages/error-page/error-page';
import {isCheckedAuth} from '../../utils';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { getServerErrorStatus, getOffers, getLoadedDataStatus } from '../../store/offer-data-process/selector';
import OfferDetail from '../../pages/offer-detail/offer-detail';
import FavoritesScreen from '../../pages/favorites-page/favorites-page';
import PrivateLoginRoute from '../private-login-route/private-login-route';

function App(): JSX.Element {

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  const isServerError = useAppSelector(getServerErrorStatus);
  const offers = useAppSelector(getOffers);

  if (isServerError) {
    return (
      <ErrorScreen />
    );
  }

  if (isCheckedAuth(authorizationStatus) || isDataLoaded) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={offers && offers.length ? <WelcomeScreen /> : <WelcomeScreenEmpty />}
      />
      <Route
        path={AppRoute.Login}
        element={
          <PrivateLoginRoute authorizationStatus={authorizationStatus}>
            <LoginScreen />
          </PrivateLoginRoute>
        }
      />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <FavoritesScreen />
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.OfferDetail}
        element={
          <OfferDetail />
        }
      />
      <Route
        path='*'
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;
