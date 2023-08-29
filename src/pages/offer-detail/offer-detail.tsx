import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import Layout from '../../components/layout/layout';
import ReviewsList from '../../components/review-list/review-list';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import OfferCardList from '../../components/offer-card-list/offer-card-list';
//import NotFound from '../not-found-page/not-found-page';
import {Offers, Offer} from '../../types/offer';
import { Reviews } from '../../types/review';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {MAX_REVIEWS_NUMBER, APIRoute, PlaceClasses, AuthorizationStatus} from '../../const';
import {calcRatingWidth, sortDayDown} from '../../utils';
import { getAuthorizationStatus } from '../../store/user-process/selector';
//import { getOffers } from '../../store/offer-data-process/selector';
import {fetchOfferAction, fetchFavoriteOffersAction} from '../../store/api-actions';
import {api} from '../../store';

function OfferDetail(): JSX.Element {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id: urlId } = useParams();

  const [offer, setOffer] = useState<Offer>();
  const [offersNearby, setOffersNearby] = useState<Offers>([]);
  const [reviews, setReviews] = useState<Reviews>([]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = async () => {
        try {
          const offerResult = await api.get<Offer>(`${APIRoute.Offers}/${urlId}`);
        } catch (e) {
          return <Navigate to='*' />;
        }
        const offerResult = await api.get<Offer>(`${APIRoute.Offers}/${urlId}`);
        setOffer(offerResult.data);
        window.scrollTo(0,0);
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };

  }, [urlId]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      const fetchData = async () => {
        const offersNearbyResult = await api.get<Offers>(`${APIRoute.Offers}/${urlId}/nearby`);
        const reviewsResult = await api.get<Reviews>(`${APIRoute.Comments}/${urlId}`);
        setOffersNearby(offersNearbyResult.data);
        setReviews(reviewsResult.data);
      };
      fetchData();
    }
    return () => {
      isMounted = false;
    };

  }, [urlId]);

  //const isOfferId = () => offers?.some((currentOffer) => currentOffer.id === urlId);

  const updateReviews = (data: Reviews) => {
    setReviews(data);
  };

  const sortReviews = reviews.sort(sortDayDown).slice(0, MAX_REVIEWS_NUMBER);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const checkAuthorizationStatus = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('/login');
    }
  };

  const onClickBookmarkButtonHandler = async () => {
    await api.post(
      `${APIRoute.Favorite}/${urlId}/${offer && offer.isFavorite ? 0 : 1}`
    );
    await dispatch(fetchOfferAction());
    await dispatch(fetchFavoriteOffersAction());
  };

  if (!urlId) {
    return <Navigate to="*" />;
  }


  return (
    <div className='page'>
      <Layout />

      <main className='page__main page__main--property'>
        <section className='property'>
          <div className='property__gallery-container container'>
            <div className='property__gallery'>
              {offer && offer.images.map((image) => (
                <div className='property__image-wrapper' key={image}>
                  <img className='property__image' src={image} alt={offer && offer.title} />
                </div>
              ))}
            </div>
          </div>
          <div className='property__container container'>
            <div className='property__wrapper'>
              {offer && offer.isPremium ?
                <div className='property__mark'>
                  <span>Premium</span>
                </div> : null}
              <div className='property__name-wrapper'>
                <h1 className='property__name'>
                  {offer && offer.title}
                </h1>
                <button
                  className={
                    offer && offer.isFavorite ?
                      'property__bookmark-button property__bookmark-button--active button' :
                      'property__bookmark-button button'
                  }
                  type='button'
                  onClick={() => {
                    checkAuthorizationStatus();
                    onClickBookmarkButtonHandler();
                  }}
                >
                  <svg className='property__bookmark-icon' width='31' height='33'>
                    <use xlinkHref='#icon-bookmark'></use>
                  </svg>
                  <span className='visually-hidden'>To bookmarks</span>
                </button>
              </div>
              <div className='property__rating rating'>
                <div className='property__stars rating__stars'>
                  <span style={{'width': calcRatingWidth(offer ? offer.rating : 0)}}></span>
                  <span className='visually-hidden'>Rating</span>
                </div>
                <span className='property__rating-value rating__value'>{offer ? offer.rating : 0}</span>
              </div>
              <ul className='property__features'>
                <li className='property__feature property__feature--entire'>
                  {offer && offer.type}
                </li>
                <li className='property__feature property__feature--bedrooms'>
                  {offer && offer.bedrooms} Bedrooms
                </li>
                <li className='property__feature property__feature--adults'>
                  Max {offer && offer.maxAdults} adults
                </li>
              </ul>
              <div className='property__price'>
                <b className='property__price-value'>&euro;{offer && offer.price}</b>
                <span className='property__price-text'>&nbsp;night</span>
              </div>
              <div className='property__inside'>
                <h2 className='property__inside-title'>What&apos;s inside</h2>
                <ul className='property__inside-list'>
                  {offer && offer.goods.map((good) => (
                    <li className='property__inside-item' key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className='property__host'>
                <h2 className='property__host-title'>Meet the host</h2>
                <div className='property__host-user user'>
                  <div className='property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper'>
                    <img
                      className='property__avatar user__avatar'
                      src={offer ? offer.host.avatarUrl : ''}
                      width='74'
                      height='74'
                      alt={offer ? offer.title : ''}
                    />
                  </div>
                  <span className='property__user-name'>
                    {offer && offer.host.name}
                  </span>
                  <span className='property__user-status'>
                    {offer && offer.host.isPro ? 'Pro' : ''}
                  </span>
                </div>
                <div className='property__description'>
                  <p className='property__text'>
                    {offer && offer.description}
                  </p>
                </div>
              </div>
              <section className='property__reviews reviews'>
                <h2 className='reviews__title'>Reviews &middot; <span className='reviews__amount'>{sortReviews.length}</span></h2>
                <ReviewsList reviews={sortReviews} />
                {
                  authorizationStatus === AuthorizationStatus.Auth ?
                    <ReviewForm id={urlId} updateReviews={updateReviews}/> : null
                }
              </section>
            </div>
          </div>
          <section className='property__map map'>
            <Map
              offers={offer && [...offersNearby, offer]}
              selectedOffer={offer}
            />
          </section>
        </section>
        <div className='container'>
          <section className='near-places places'>
            <h2 className='near-places__title'>Other places in the neighbourhood</h2>
            <OfferCardList
              offers={offersNearby}
              placeListClass={PlaceClasses.NeighbourhoodPlacesListClass}
              placeCardClass={PlaceClasses.NeighbourhoodPlaceCardClass}
            />
          </section>
        </div>
      </main>
    </div>
  );

}

export default OfferDetail;
