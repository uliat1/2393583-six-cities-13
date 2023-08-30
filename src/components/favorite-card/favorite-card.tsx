import { Offer } from '../../types/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';
import { useAppDispatch } from '../../hooks';
import { fetchChangeStatusFavoriteAction } from '../../store/api-actions';

type FavoriteCardProps = {
  offer: Offer;
}

function FavoriteCard({offer}: FavoriteCardProps): JSX.Element {
  const {
    price,
    previewImage,
    title,
    isPremium,
    type,
    isFavorite,
    id
  } = offer;

  const dispatch = useAppDispatch();
  const status = Number(!isFavorite);
  const isOfferFullCard = false;

  const handleFavoriteClick = () => {
    dispatch(fetchChangeStatusFavoriteAction({status, id}));
  };

  return (
    <article className="favorites__card place-card">
      {isPremium
        ? <div className="place-card__mark"><span>Premium</span></div>
        : null}
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width={150}
            height={110}
            alt="Place image"
          />
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">
                    &#47;&nbsp;night
            </span>
          </div>
          <BookmarkButton isBookmarkOffer={isFavorite} onBookmarkClick={handleFavoriteClick} isOfferFullCard={isOfferFullCard} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{
                width: '100%',
              }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default FavoriteCard;
