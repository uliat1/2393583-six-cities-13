import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Layout from '../layout/layout';
import WelcomeScreen from '../../pages/main/main';
import LoginScreen from '../../pages/login-page/login-page';
import FavoritesScreen from '../../pages/favorites-page/favorites-page';
import OfferScreen from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-router/private-router';
import { useAppSelector } from '../../hooks';
import LoadingSpinner from '../../pages/loading-spinner/loading-spinner';
import { getOffers, getOffersDataLoadingStatus, getErrorStatus } from '../../store/offer-process/selector';
import ErrorScreen from '../../pages/error-page/error-page';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);
  const offers = useAppSelector(getOffers);

  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (hasError) {
    return (<ErrorScreen />);
  }

  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element={offers && offers.length ? <WelcomeScreen /> : <MainEmpty />}
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
        path={AppRoute.Room}
        element={
          <Room />
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
