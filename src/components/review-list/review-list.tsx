import ReviewCard from '../review-card/review-card';
import { Reviews } from '../../types/review';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewsList({reviews}: ReviewsListProps): JSX.Element {

  return (
    <ul className='reviews__list'>
      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}
    </ul>
  );
}
export default ReviewsList;
