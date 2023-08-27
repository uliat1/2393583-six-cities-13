import OfferCard from '../offer-card/offer-card';
import { Offers } from '../../types/offer';
import { useAppSelector } from '../../hooks';
import { getSortedOffers } from '../../utils';
import { getSelectedOption } from '../../store/offer-process/selector';

type OfferCardListProps = {
  offers: Offers | undefined;
  onPlaceCardMouseOver?: (id: number) => void;
  placeListClass: string;
  placeCardClass: string;
}

function OfferCardList({offers, onPlaceCardMouseOver, placeListClass, placeCardClass}: OfferCardListProps): JSX.Element {

  const selectedOption = useAppSelector(getSelectedOption);
  const sortedOffers = getSortedOffers(offers, selectedOption);

  return (
    <div className={placeListClass}>
      {sortedOffers && sortedOffers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          onPlaceCardMouseOver={onPlaceCardMouseOver}
          placeCardClass={placeCardClass}
        />
      ))}
    </div>
  );
}
export default OfferCardList;
