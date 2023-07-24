import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AppRoute, AuthorizationStatus } from '../../const';
import WelcomeScreen from '../../pages/main/main';
import LoginScreen from '../../pages/login-page/login-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import OfferScreen from '../../pages/offer-page/offer-page';
import FavoritesScreen from '../../pages/favorites-page/favorites-page';
import PrivateRoute from '../private-router/private-router';
import { Offer } from '../../types/offer';

type AppProps = {
    placesCount: number;
    offers: Offer[];
}

function App({placesCount, offers}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={
              <WelcomeScreen placesCount={placesCount} offers={offers} />
            }
          />
        </Routes>
        <Routes>
          <Route path={AppRoute.Login} element={<LoginScreen />} />
        </Routes>
        <Routes>
          <Route
            path={AppRoute.Favotites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <FavoritesScreen offers={offers}/>
              </PrivateRoute>
            }
          />
        </Routes>
        <Routes>
          <Route path={AppRoute.Offer} element={<OfferScreen />} />
        </Routes>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
