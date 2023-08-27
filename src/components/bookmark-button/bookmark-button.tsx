import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { APIRoute, AuthorizationStatus } from '../../const';
import {api} from '../../store';
import {useAppDispatch, useAppSelector} from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selector';
import { fetchOfferAction, fetchFavoriteOffersAction } from '../../store/api-actions';

type BookmarkButtonProps = {
 isFavorite: boolean | undefined;
 id: number | undefined;
}

function BookmarkButton({isFavorite, id}: BookmarkButtonProps): JSX.Element {

  const initialStatus = isFavorite ? 1 : 0;

  const [status, setStatus] = useState<0 | 1>(initialStatus);

  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkAuthorizationStatus = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate('../login');
    }
  };

  const onClickHandler = async (currentStatus: 0 | 1) => {
    await api.post(
      `${APIRoute.Favorite}/${id ?? 0}/${currentStatus ?? 0}`
    );
    await Promise.resolve(setStatus((prevStatus) => prevStatus === 0 ? 1 : 0));
    await dispatch(fetchOfferAction());
    await dispatch(fetchFavoriteOffersAction());
  };

  return (
    <button
      className={
        isFavorite ?
          'place-card__bookmark-button place-card__bookmark-button--active button' :
          'place-card__bookmark-button button'
      }
      type='button'
      onClick={() => {
        checkAuthorizationStatus();
        onClickHandler(status === 0 ? 1 : 0);
      }}
    >
      <svg
        className='place-card__bookmark-icon'
        width='18'
        height='19'
      >
        <use xlinkHref ='#icon-bookmark'></use>
      </svg>
      <span className='visually-hidden'>To bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
