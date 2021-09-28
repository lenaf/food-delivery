import React from "react";
import { Card, Rate } from "antd";
import { IRestaurant } from "../types/restaurant";
import { useHistory } from "react-router-dom";

const RestaurantCard: React.FC<{ restaurant: IRestaurant }> = ({
  restaurant: restaurant,
}) => {
  let history = useHistory();

  return (
    <Card
      className="w-60 h-80"
      cover={
        <img
          onClick={() => history.push(`/restaurant/${restaurant.id}`)}
          alt="example"
          src={restaurant.profilePhotoUrl}
          className="h-40 cursor-pointer"
        />
      }
    >
      <Card.Meta className="cursor-pointer" title={restaurant.name} />

      <Rate disabled defaultValue={restaurant.averageScore} />
      <p>{restaurant.description}</p>
    </Card>
  );
};

export default RestaurantCard;
