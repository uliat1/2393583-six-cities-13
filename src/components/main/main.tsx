import Map from '../map/map';
import OfferCardList from '../offer-card-list/offer-card-list';
import { useState } from 'react';
import { Offer } from '../../types/offer';
import SortingOptions from '../sorting-options/sorting-options';

type MainProps = {
  offers: Offer[];
  city: string;
  currentOffers: Offer[];
}

function Main({offers, city, currentOffers}: MainProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(undefined);

  const handlePlaceCardHover = (point: Offer | undefined) => {
    if (point) {
      const currentPoint = offers.find((offer) => offer.id === point.id);
      setSelectedOffer(currentPoint);
    } else {
      setSelectedOffer(undefined);
    }
  };

  return(
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">{currentOffers.length} place{currentOffers.length !== 1 ? 's' : ''} to stay in {city}</b>
          <SortingOptions />
          <OfferCardList offers={currentOffers} onPlaceCardMouseOver={handlePlaceCardHover}/>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map offers={currentOffers} selectedOffer={selectedOffer} />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Main;
