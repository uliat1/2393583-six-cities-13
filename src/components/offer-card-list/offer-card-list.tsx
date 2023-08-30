import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types/offer';

type OfferCardListProps = {
  offers: Offer[];
  onPlaceCardMouseOver: (offer: Offer | undefined) => void;
}

function OfferCardList({offers, onPlaceCardMouseOver}: OfferCardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <OfferCard key={offer.id} offer={offer} onPlaceCardMouseOver={onPlaceCardMouseOver} />)}
    </div>
  );
}
export default OfferCardList;
