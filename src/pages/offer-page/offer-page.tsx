import { Helmet } from 'react-helmet-async';
import OfferCard from '../../components/offer-card/offer-card';
import Map from '../../components/map/map';
//import { useParams } from 'react-router-dom';
//import { fetchNearbyOffersAction, fetchOfferByIdAction } from '../../store/api-actions';
//import { useEffect } from 'react';
import { useAppSelector } from '../../hooks';
//import { useDispatch } from 'react-redux';
import { RequestStatus } from '../../const';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import OfferDetails from '../../components/offer-detailed/offer-detailed';
import NotFound from '../not-found-page/not-found-page';

function OfferScreen():JSX.Element {
// const {id} = useParams();
  //const dispatch = useDispatch();
  const offer = useAppSelector((state) => state.offer);
  const neighbourhoods = useAppSelector((state) => state.nearbyOffers).slice(0,3);
  const fetchingStatus = useAppSelector((state) => state.offerFetchingStatus);

  /* useEffect(() => {
    if (id) {
      dispatch(fetchOfferByIdAction(id));
      dispatch(fetchNearbyOffersAction(id));
    }
  }, [id, dispatch]);
  */

  return (
    <div className="page">
      {fetchingStatus === RequestStatus.Error && <NotFound />}
      {fetchingStatus === RequestStatus.Pending && <LoadingSpinner />}
      {fetchingStatus === RequestStatus.Success && offer && (
        <>
          <Helmet>
            <title>{`${offer.city.name}. ${offer.title}`}</title>
          </Helmet>
          <main className="page__main page__main--offer">
            <section className="offer">
              <OfferDetails offer={offer} />
              <section className="offer__map map">
                <Map offers={neighbourhoods} selectedOffer={offer}/>
              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {neighbourhoods.map((neighbourhood) => <OfferCard key={neighbourhood.id} offer={neighbourhood} />)}
                </div>
              </section>
            </div>
          </main>
        </>)}
    </div>
  );
}

export default OfferScreen;
