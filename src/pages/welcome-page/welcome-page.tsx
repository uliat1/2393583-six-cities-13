import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '../../hooks';
import { getCity, getSortingType } from '../../store/reducers/offer-process/selector';
import { Offer } from '../../types/offer';
import { sorting } from '../../utils';
import Main from '../../components/main/main';
import CitiesList from '../../components/cities-list/cities-list';
import WelcomeScreenEmpty from './welcome-page-empty/welcome-page-empty';

type WelcomeScreenProps = {
    offers: Offer[];
}

function WelcomeScreen({offers}: WelcomeScreenProps): JSX.Element {
  const city = useAppSelector(getCity);
  const sortingType = useAppSelector(getSortingType);
  const currentOffers = sorting[sortingType](offers.filter((offer) => offer.city.name === city));

  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>Шесть городов</title>
      </Helmet>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        {!currentOffers.length
          ? <WelcomeScreenEmpty city={city} />
          : <Main offers={offers} city={city} currentOffers={currentOffers} />}
      </main>
    </div>
  );
}

export default WelcomeScreen;
