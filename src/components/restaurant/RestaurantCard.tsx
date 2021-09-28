import React from "react";
import { Card, Rate } from "antd";
import { IRestaurant } from "../../types/restaurant";
import { useHistory } from "react-router-dom";
import empty from "../../images/empty.jpg";

const RestaurantCard: React.FC<{ restaurant: IRestaurant }> = ({
  restaurant,
}) => {
  let history = useHistory();

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
      <Card.Meta className="cursor-pointer" title={restaurant.name} />
      <Rate disabled value={restaurant.averageScore} />
    </Card>
  );
};

export default RestaurantCard;
