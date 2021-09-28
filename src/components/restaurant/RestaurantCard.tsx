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
      onClick={() => history.push(`/restaurant/${restaurant.id}`)}
      bordered={false}
      className="rounded shadow-sm overflow-hidden cursor-pointer"
      cover={
        <img
          alt="restaurant profile"
          src={restaurant.profilePhotoUrl ?? empty}
          className="w-100 "
          style={{
            display: "block",
            maxWidth: "290px",
            maxHeight: "180px",
            width: "auto",
            height: "auto",
          }}
        />
      }
    >
      <Card.Meta title={restaurant.name} />
      <Rate disabled value={restaurant.averageScore} />
    </Card>
  );
};

export default RestaurantCard;
