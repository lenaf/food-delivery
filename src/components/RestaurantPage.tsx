import React, { useState } from "react";
import { Card, Rate, Button } from "antd";
import {
  useEditRestaurant,
  useFetchRestaurantById,
  useFetchRestaurantReviews,
  useGetPhotoUrl,
} from "../hooks";
import { useParams } from "react-router-dom";
import AddReviewModal from "./AddReviewModal";
import { useEffect } from "react";
import { IReview } from "../types/review";
import RestaurantCard from "./RestaurantCard";

const RestaurantPage: React.FC = () => {
  let { restaurantId } = useParams<{ restaurantId: string }>();
  const { reviews, loading: reviewsLoading } =
    useFetchRestaurantReviews(restaurantId);

  const [showAddReview, setShowAddReview] = useState(false);

  const { restaurant, loading } = useFetchRestaurantById(restaurantId);
  const { url } = useGetPhotoUrl(restaurant?.profilePhotoId ?? "");
  const editRestaurant = useEditRestaurant();

  console.log(restaurant);

  useEffect(() => {
    const sumOfReviewScores = reviews.reduce(
      (sum: number, review: IReview) => sum + review.score,
      0
    );

    if (restaurant) {
      editRestaurant({
        ...restaurant,
        averageScore: sumOfReviewScores / reviews.length,
        numberOfReviews: reviews.length,
      });
    }
  }, [reviews]);

  return (
    <div>
      <Card
        className="w-60 h-80"
        cover={<img alt="example" src={url} className="h-40 " />}
      >
        <Card.Meta title={restaurant?.name} />

        {restaurant && (
          <Rate disabled defaultValue={restaurant?.averageScore ?? 0} />
        )}
        <p>{restaurant?.description}</p>
      </Card>
      <Button type="primary" onClick={() => setShowAddReview(true)}>
        Add Review
      </Button>
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
