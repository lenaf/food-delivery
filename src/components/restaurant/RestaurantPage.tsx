import React, { useState } from "react";
import { Rate, Button, Row, Divider, Tooltip, Col } from "antd";
import { useFetchRestaurantById } from "../../hooks/restaurant";
import { useHistory, useParams } from "react-router-dom";
import AddReviewModal from "../review/AddReviewModal";
import EditRestaurantModal from "./EditRestaurantModal";
import DeleteRestaurantModal from "./DeleteRestaurantModal";

import ReviewCard from "../review/ReviewCard";
import empty from "../../images/empty.jpg";
import { orderBy } from "lodash";
import { useFetchCurrentUser } from "../../hooks/user";
import { useFetchRestaurantReviews } from "../../hooks/review";

const RestaurantPage: React.FC = () => {
  const { user } = useFetchCurrentUser();
  let { restaurantId } = useParams<{ restaurantId: string }>();
  const { restaurant } = useFetchRestaurantById(restaurantId);
  const { reviews } = useFetchRestaurantReviews(restaurantId);
  const [showAddReview, setShowAddReview] = useState(false);
  const [showEditRestaurant, setShowEditRestaurant] = useState(false);
  const [showDeleteRestaurant, setShowDeleteRestaurant] = useState(false);

  const reviewsByDate = orderBy(reviews, "date", "desc");
  const reviewsByScore = orderBy(reviews, "score", "asc");
  const lowestReview = reviewsByScore[0];
  const highestReview = reviewsByScore[reviews.length - 1];
  const history = useHistory();

  const canEditOrDeleteRestaurant =
    user?.isAdmin || (user?.isOwner && restaurant?.ownerId === user.id);

  return (
    <div>
      <img
        object-fit="cover"
        className="h-60 w-90 mb-4"
        alt="restaurant profile"
        src={restaurant?.profilePhotoUrl ?? empty}
      />
      <Row>
        <h3 className={"font-bold text-3xl mr-2"}>{restaurant?.name}</h3>
        {canEditOrDeleteRestaurant && (
          <Tooltip title="Edit" className="mr-2">
            <Button shape="circle" onClick={() => setShowEditRestaurant(true)}>
              <i className="fas fa-pen text-blue-500"></i>
            </Button>
          </Tooltip>
        )}
        {canEditOrDeleteRestaurant && (
          <Tooltip title="Delete" className="mr-2">
            <Button
              shape="circle"
              onClick={() => setShowDeleteRestaurant(true)}
            >
              <i className="fas fa-trash-alt text-blue-500"></i>
            </Button>
          </Tooltip>
        )}
      </Row>
      {restaurant && (
        <Rate
          value={restaurant?.averageScore ?? 0}
          allowHalf
          disabled={true}
          className="mr-2"
        />
      )}
      {restaurant?.numberOfReviews} Reviews
      {<div>Average: {restaurant?.averageScore.toFixed(2)}</div>}
      <Divider />
      <Row gutter={8}>
        {highestReview && (
          <Col span={12} className="mb-4">
            <h3 className="font-semi-bold text-xl">Highest Review</h3>
            <ReviewCard review={highestReview} />
          </Col>
        )}
        {lowestReview && (
          <Col span={12} className="mb-4">
            <h3 className="font-semi-bold text-xl">Lowest Review</h3>
            <ReviewCard review={lowestReview} />
          </Col>
        )}
      </Row>
      <Row align="middle" className="my-4">
        <h3 className={"font-semi-bold text-2xl mr-4"}>All Reviews</h3>
        <Button
          className="ml-auto"
          type="primary"
          onClick={() => setShowAddReview(true)}
        >
          Add Review
        </Button>
      </Row>
      {reviewsByDate.map((review, i) => (
        <ReviewCard key={i} review={review} />
      ))}
      {restaurant && (
        <EditRestaurantModal
          restaurant={restaurant}
          isOpen={showEditRestaurant}
          onClose={() => setShowEditRestaurant(false)}
        />
      )}
      {restaurant && (
        <DeleteRestaurantModal
          restaurant={restaurant}
          isOpen={showDeleteRestaurant}
          onClose={() => {
            setShowDeleteRestaurant(false);
            history.push("/");
          }}
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
