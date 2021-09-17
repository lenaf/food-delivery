import React from "react";
import { Row, Input, Col } from "antd";
import { IRestaurant, IRestaurantInput } from "../types/restaurant";
import PhotoUpload from "./PhotoUpload";
import firebase from "firebase";

interface IProps {
  restaurant: IRestaurant | IRestaurantInput;
  updateRestaurant: (restuarant: IRestaurant | IRestaurantInput) => void;
}

const RestaurantInputs: React.FC<IProps> = ({
  restaurant,
  updateRestaurant,
}) => {
  return (
    <div>
      <Row className="mb-2 ">
        <Col className="mr-4 flex-grow">
          <Input
            value={restaurant.name}
            placeholder="Name"
            onChange={(e) =>
              updateRestaurant({ ...restaurant, name: e.target.value })
            }
          />
        </Col>
      </Row>
      <PhotoUpload
        photoId={restaurant.profilePhotoId}
        onUpload={(profilePhotoId) =>
          updateRestaurant({ ...restaurant, profilePhotoId })
        }
      />
      <Input
        value={restaurant.description}
        placeholder="Description"
        onChange={(e) =>
          updateRestaurant({ ...restaurant, description: e.target.value })
        }
        className="mb-2"
      />
    </div>
  );
};

export default RestaurantInputs;
