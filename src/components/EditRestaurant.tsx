import React, { useState } from "react";
import { useEditRestaurant } from "../hooks";
import { Button, Row, Form } from "antd";
import { IRestaurant } from "../types/restaurant";
import RestaurantInputs from "./RestaurantInputs";

interface IProps {
  restaurant: IRestaurant;
  onClose: () => void;
}

const EditRestaurant: React.FC<IProps> = ({ restaurant, onClose }) => {
  const [editedRestaurant, setEditedRestuarant] = useState(restaurant);
  const editRestaurant = useEditRestaurant();

  return (
    <Form
      onFinish={() => {
        editRestaurant(editedRestaurant);
        onClose();
      }}
    >
      <RestaurantInputs
        restaurant={editedRestaurant}
        updateRestaurant={(r) => setEditedRestuarant(r as IRestaurant)}
      />

      <Row>
        <Button
          type="ghost"
          className="ml-auto mb-2 mr-2"
          onClick={() => {
            setEditedRestuarant(restaurant);
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          htmlType="submit"
          disabled={!restaurant.name}
          type="primary"
          className="mb-2"
        >
          Save
        </Button>
      </Row>
    </Form>
  );
};

export default EditRestaurant;
