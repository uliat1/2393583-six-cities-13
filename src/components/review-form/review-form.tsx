import { useAppDispatch, useAppSelector } from '../../hooks';
import { FormEvent } from 'react';
import { useState, ChangeEvent } from 'react';
import { isReviewFormValid } from '../../utils';
import { MIN_COMMENT_LENGTH } from '../../const';
import ErrorReview from '../../pages/error-page/error-review/error-revew';
import { fetchSendCommentAction } from '../../store/api-actions';
import { getCommentDataSendingStatus, getCommentSendingErrorStatus } from '../../store/reducers/offer-data-process/selector';

type ReviewFormProps = {
  id: string;
}

function ReviewForm({id}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const errorOccurred = useAppSelector(getCommentSendingErrorStatus);
  const isCommentSending = useAppSelector(getCommentDataSendingStatus);

  const [formState, setFormState] = useState({
    ratingData: 0,
    comment: '',
  });

  const handleRatingFieldChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    let parsedValue: string | number = value;

    if (name === 'ratingData') {
      parsedValue = Number(value);
    }

    setFormState({...formState, [name]: parsedValue});
  };

  const isDisabled = isCommentSending || !isReviewFormValid(formState.ratingData, formState.comment);


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const rating = Number(formState.ratingData);
    const comment = formState.comment;

    if (rating !== null && comment !== null) {
      dispatch(fetchSendCommentAction({rating, comment, id, cb: () => {
        setFormState({
          ratingData: 0,
          comment: '',
        });
      }}));
    }
  };

  return (
    <form
      className='reviews__form form'
      action='#'
      method='post'
      onSubmit={handleSubmit}
    >
      <label className='reviews__label form__label' htmlFor='review'>Your review</label>
      <div className='reviews__rating-form form__rating'>
        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='5'
          id='5-stars'
          type='radio'
          checked={formState.ratingData === 5}
          onChange={handleRatingFieldChange}
        />
        <label htmlFor='5-stars' className='reviews__rating-label form__rating-label' title='perfect'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='4'
          id='4-stars'
          type='radio'
          checked={formState.ratingData === 4}
          onChange={handleRatingFieldChange}
        />
        <label htmlFor='4-stars' className='reviews__rating-label form__rating-label' title='good'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='3'
          id='3-stars'
          type='radio'
          checked={formState.ratingData === 3}
          onChange={handleRatingFieldChange}
        />
        <label htmlFor='3-stars' className='reviews__rating-label form__rating-label' title='not bad'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='2'
          id='2-stars'
          type='radio'
          checked={formState.ratingData === 2}
          onChange={handleRatingFieldChange}
        />
        <label htmlFor='2-stars' className='reviews__rating-label form__rating-label' title='badly'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>

        <input
          className='form__rating-input visually-hidden'
          name='rating'
          value='1'
          id='1-star'
          type='radio'
          checked={formState.ratingData === 1}
          onChange={handleRatingFieldChange}
        />
        <label htmlFor='1-star' className='reviews__rating-label form__rating-label' title='terribly'>
          <svg className='form__star-image' width='37' height='33'>
            <use xlinkHref='#icon-star'></use>
          </svg>
        </label>
      </div>
      <textarea
        className='reviews__textarea form__textarea'
        id='review'
        name='review'
        placeholder='Tell how was your stay, what you like and what can be improved'
        onChange={handleRatingFieldChange}
        value={formState.comment}
        minLength={MIN_COMMENT_LENGTH}
      />
      {errorOccurred && <ErrorReview />}
      <div className='reviews__button-wrapper'>
        <p className='reviews__help'>
        To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className='reviews__submit form__submit button'
          type='submit'
          disabled={isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
export default ReviewForm;
