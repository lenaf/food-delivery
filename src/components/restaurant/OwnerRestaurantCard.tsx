import React from "react";
import { Card, Col, Rate, Row } from "antd";
import { IRestaurant } from "../../types/restaurant";
import { useHistory } from "react-router-dom";
import empty from "../../images/empty.jpg";
import { useFetchRestaurantReviews } from "../../hooks/review";
import ReviewCard from "../review/ReviewCard";

const OwnerRestaurantCard: React.FC<{ restaurant: IRestaurant }> = ({
  restaurant,
}) => {
  const history = useHistory();
  const { reviews } = useFetchRestaurantReviews(restaurant.id);
  const unansweredReviews = reviews.filter((r) => !r.reply);

  return (
    <Card
      className="overflow-hidden"
      cover={
        <img
          onClick={() => history.push(`/restaurant/${restaurant.id}`)}
          alt="restaurant profile"
          src={restaurant.profilePhotoUrl ?? empty}
          className="w-100 cursor-pointer"
          style={{
            display: "block",
            maxWidth: "280px",
            maxHeight: "160px",
            width: "auto",
            height: "auto",
          }}
        />
      }
    >
      <h2
        onClick={() => history.push(`/restaurant/${restaurant.id}`)}
        className="cursor-pointer font-bold text-3xl"
      >
        {restaurant.name}
      </h2>
      <Rate disabled value={restaurant.averageScore} className="mb-4" />
      <h3 className={"font-bold text-xl"}>
        {unansweredReviews.length} Unanswered Reviews
      </h3>
      <Row wrap gutter={8}>
        {unansweredReviews.map((review, i) => (
          <Col
            xs={12}
            sm={8}
            md={6}
            lg={6}
            xl={4}
            key={i}
            className="mb-2 items-stretch	h-100"
          >
            <ReviewCard review={review} />
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default OwnerRestaurantCard;
