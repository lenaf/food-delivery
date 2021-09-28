import React, { useState } from "react";
import { Rate, Button } from "antd";
import { useFetchRestaurantById, useFetchRestaurantReviews } from "../hooks";
import { useParams } from "react-router-dom";
import AddReviewModal from "./AddReviewModal";
import EditRestaurantModal from "./EditRestaurantModal";

const RestaurantPage: React.FC = () => {
  let { restaurantId } = useParams<{ restaurantId: string }>();
  const { reviews, loading: reviewsLoading } =
    useFetchRestaurantReviews(restaurantId);

  const [showAddReview, setShowAddReview] = useState(false);
  const [showEditRestaurant, setShowEditRestaurant] = useState(false);

  const { restaurant, loading } = useFetchRestaurantById(restaurantId);

  return (
    <div>
      <div className="p-relative h-48 w-100">
        <img
          object-fit="contain"
          alt="example"
          src={restaurant?.profilePhotoUrl}
        />
      </div>
      {restaurant?.name}
      {restaurant && (
        <Rate value={restaurant?.averageScore ?? 0} allowHalf disabled={true} />
      )}
      {restaurant?.averageScore}
      {restaurant?.numberOfReviews}
      <p>{restaurant?.description}</p>
      <Button type="primary" onClick={() => setShowEditRestaurant(true)}>
        Edit
      </Button>
      <div>
        <Button type="primary" onClick={() => setShowAddReview(true)}>
          Add Review
        </Button>
      </div>
      {reviews.map((review) => (
        <div>{review.text}</div>
      ))}
      {restaurant && (
        <EditRestaurantModal
          restaurant={restaurant}
          isOpen={showEditRestaurant}
          onClose={() => setShowEditRestaurant(false)}
        />
      )}
      {restaurant && (
        <AddReviewModal
          isOpen={showAddReview}
          onClose={() => setShowAddReview(false)}
          restaurant={restaurant}
        />
      )}
    </div>
  );
};

export default RestaurantPage;
