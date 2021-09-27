import React, { useState } from "react";
import firebase from "firebase";
import { Button, Row, Form } from "antd";
import RestaurantInputs from "./RestaurantInputs";
import { IRestaurantInput } from "../types/restaurant";
import { useAddRestaurant } from "../hooks";

const AddRestaurant: React.FC = () => {
  let user = firebase.auth().currentUser;
  const addRestaurant = useAddRestaurant();
  const [newRestaurant, updateNewRestaurant] = useState<IRestaurantInput>({
    ownerId: user?.uid,
  });

  const handleAddRestaurant = () => {
    addRestaurant(newRestaurant);
    updateNewRestaurant({});
  };

  return (
    <Form onFinish={handleAddRestaurant}>
      <RestaurantInputs
        restaurant={newRestaurant}
        updateRestaurant={updateNewRestaurant}
      />
      <Row>
        <Button
          type="ghost"
          className="ml-auto mb-2 mr-2"
          onClick={() => {
            //close modal
            updateNewRestaurant({});
          }}
        >
          Cancel
        </Button>
        <Button
          htmlType="submit"
          disabled={!newRestaurant.name}
          type="primary"
          className="mb-2"
        >
          Save
        </Button>
      </Row>
    </Form>
  );
};

export default AddRestaurant;
