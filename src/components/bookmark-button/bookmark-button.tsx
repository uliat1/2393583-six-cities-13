import classNames from 'classnames';

type BookmarkButtonProps = {
  isBookmarkOffer: boolean;
  onBookmarkClick: () => void;
  isOfferFullCard: boolean;
}

function BookmarkButton({isBookmarkOffer, onBookmarkClick, isOfferFullCard}: BookmarkButtonProps):JSX.Element {
  return (
    <button
      className={
        classNames(`${isOfferFullCard ? 'offer' : 'place-card'}__bookmark-button button`,
          {'place-card__bookmark-button--active': isBookmarkOffer && !isOfferFullCard},
          {'offer__bookmark-button--active': isBookmarkOffer && isOfferFullCard})
      }
      type="button"
      onClick={onBookmarkClick}
    >
      <svg className={`${isOfferFullCard ? 'offer' : 'place-card'}__bookmark-icon`} width={isOfferFullCard ? 31 : 18} height={isOfferFullCard ? 33 : 19}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
