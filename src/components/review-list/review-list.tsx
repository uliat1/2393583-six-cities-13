import ReviewCard from '../review-card/review-card';
import { useAppSelector } from '../../hooks';
import { Reviews } from '../../types/review';
import { sortByDate } from '../../utils';
import LoadingSpinner from '../../pages/loading-spinner/loading-spinner';
import ErrorReview from '../../pages/error-page/error-review/error-revew';
import { getCommentsDataLoadingStatus, getCommentsLoadingErrorStatus } from '../../store/reducers/offer-data-process/selector';

type ReviewListProps = {
    reviews: Reviews[];
}

function ReviewList({reviews}: ReviewListProps): JSX.Element {
  const isReviewsLoading = useAppSelector(getCommentsDataLoadingStatus);
  const hasReviewsLoadingError = useAppSelector(getCommentsLoadingErrorStatus);

  const currentReviews = [...reviews].sort(sortByDate).slice(0,10);

  if (isReviewsLoading) {
    return (
      <LoadingSpinner />
    );
  }

  if (hasReviewsLoadingError) {

    return (
      <ErrorReview />
    );
  }

  return (
    <ul className="reviews__list">
      {currentReviews.map((review) => <ReviewCard key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewList;
