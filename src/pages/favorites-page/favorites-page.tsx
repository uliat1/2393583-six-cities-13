import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import FavoritesList from '../../components/favorite-list/favorite-list';
import FavoritesEmpty from '../../components/favorite-empty/favorite-empty';
import { useAppSelector } from '../../hooks';

function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);

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

export default FavoritesScreen;
