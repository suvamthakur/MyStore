import ReviewBox from "./ReviewBox";

const ReviewsContainer = ({ reviews }) => {
  return (
    <div className="bg-white p-2 md:p-4">
      <div className="border p-2 md:p-4">
        <h1 className="text-xl lg:text-2xl font-semibold">Customer Reviews</h1>

        {reviews.map((review, i) => (
          <ReviewBox key={i} reviewData={review} />
        ))}
      </div>
    </div>
  );
};
export default ReviewsContainer;
