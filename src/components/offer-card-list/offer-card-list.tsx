import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OfferCardListProps = {
    offers: Offer[];
    onOfferCardHover: (offer: Offer) => void;
}

function OfferCardList({offers, onOfferCardHover}: OfferCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} onCardHover={onOfferCardHover} />)}
    </div>
  );
}

export default OfferCardList;
