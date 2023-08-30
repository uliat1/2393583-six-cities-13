import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FavoritesList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from './favorites-empty/favorites-empty';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ErrorScreen from '../error-page/error-page';
import { useEffect } from 'react';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getErrorStatus } from '../../store/reducers/offer-process/selector';
import { getFavorites } from '../../store/reducers/favorite-process/selector';

function FavoriteScreen(): JSX.Element {
  const favorites = useAppSelector(getFavorites);
  const hasError = useAppSelector(getErrorStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  if (hasError) {
    return <ErrorScreen />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>Шесть городов. Выбранные места</title>
      </Helmet>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          {favorites.length
            ? <FavoritesList offers={favorites}/>
            : <FavoritesEmpty />}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to="/">
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </div>
  );
}

export default FavoriteScreen;
