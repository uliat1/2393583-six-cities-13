import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { fetchNearbyOffersAction, fetchOfferByIdAction } from '../../store/api-actions';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import OfferDetail from '../offer-detail/offer-detail';
import NotFound from '../not-found-page/not-found-page';
import OfferCard from '../../components/offer-card/offer-card';
import Map from '../../components/map/map';
import {
  getOfferById,
  getNearbyErrorStatus,
  getNearbyOffers,
  getOfferDataLoadingStatus,
  getOfferErrorStatus,
} from '../../store/reducers/offer-data-process/selector';
import ErrorReview from '../error-page/error-review/error-revew';

function OfferScreen():JSX.Element {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector(getOfferById);
  const isOfferDataLoading = useAppSelector(getOfferDataLoadingStatus);
  const hasOfferError = useAppSelector(getOfferErrorStatus);
  const neighbourhoods = useAppSelector(getNearbyOffers).slice(0,3);
  const hasNearbyError = useAppSelector(getNearbyErrorStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id));
      dispatch(fetchNearbyOffersAction(id));
    }
  }, [id, dispatch]);

  if (isOfferDataLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (hasOfferError) {
    return (
      <NotFound />
    );
  }

  return (
    <div className="page" data-testid="offer-container">
      {offer && (
        <>
          <Helmet>
            <title>{`${offer.city.name}. ${offer.title}`}</title>
          </Helmet>
          <main className="page__main page__main--offer">
            <section className="offer">
              <OfferDetail offer={offer} />
              <section className="offer__map map">
                <Map offers={neighbourhoods} selectedOffer={offer} isDetailPage />
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {hasNearbyError && <ErrorReview />}
                  {neighbourhoods.map((neighbourhood) => <OfferCard key={neighbourhood.id} offer={neighbourhood} isNearbyCard />)}
                </div>
              </section>
            </div>
          </main>
        </>)}
    </div>
  );
}

export default OfferScreen;
