import { Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthCheckedStatus, getAuthorizationStatus } from '../../store/reducers/user-process/selector';
import { getOffersDataLoadingStatus, getOffers, getErrorStatus } from '../../store/reducers/offer-process/selector';
import Layout from '../layout/layout';
import WelcomeScreen from '../../pages/welcome-page/welcome-page';
import LoginScreen from '../../pages/login-page/login-page';
import FavoritesScreen from '../../pages/favorites-page/favorites-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-router/private-router';
import LoadingSpinner from '../../pages/loading-spinner/loading-spinner';
import ErrorScreen from '../../pages/error-page/error-page';
import { useEffect } from 'react';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';
import OfferScreen from '../../pages/offer-page/offer-page';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  const errorOccurred = useAppSelector(getErrorStatus);
  const offers = useAppSelector(getOffers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffersAction());
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (errorOccurred) {
    return (<ErrorScreen />);
  }

  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Layout authorizationStatus={authorizationStatus} />}
        >
          <Route
            index element={
              <WelcomeScreen
                offers={offers}
              />
            }
          />
          <Route
            element={<PrivateRoute authorizationStatus={authorizationStatus} />}
          >
            <Route
              element={<FavoritesScreen />}
              path={AppRoute.Favorites}
            />
          </Route>
          <Route
            path={`${AppRoute.Offer}:id`}
            element={<OfferScreen />}
          />
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
        <Route
          path={AppRoute.Login}
          element={<LoginScreen />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
