import { Reviews } from '../../types/review';
import {calcRatingWidth} from '../../utils';
import dayjs from 'dayjs';
import { DateFormat } from '../../const';

type ReviewCardProps = {
  review: Reviews;
}

function ReviewCard({review}: ReviewCardProps): JSX.Element {
  const {
    user,
    rating,
    comment,
    date
  } = review;

  return (
    <li className='reviews__item'>
      <div className='reviews__user user'>
        <div className='reviews__avatar-wrapper user__avatar-wrapper'>
          <img className='reviews__avatar user__avatar' src={user.avatarUrl} width='54' height='54' alt={`${user.name} avatar`} />
        </div>
        <span className='reviews__user-name'>
          {user.name}
        </span>
      </div>
      <div className='reviews__info'>
        <div className='reviews__rating rating'>
          <div className='reviews__stars rating__stars'>
            <span style={{width: calcRatingWidth(rating)}}></span>
            <span className='visually-hidden'>{rating}</span>
          </div>
        </div>
        <p className='reviews__text'>
          {comment}
        </p>
        <time className='reviews__time' dateTime={dayjs(date).format(DateFormat.DATE_FORMAT)}>{dayjs(date).format(DateFormat.REVIEW_DATE_FORMAT)}</time>
      </div>
    </li>
  );
}
export default ReviewCard;
