import ReviewCard from '../review-card/review-card';
import { Review } from '../../types/review';

type ReviewsListProps = {
    reviews: Review[];
}

function ReviewList({reviews}: ReviewsListProps): JSX.Element {
  return (
    <ul className="reviews__list">
      <ReviewCard reviews={reviews} />
    </ul>
  );
}

export default ReviewList;
