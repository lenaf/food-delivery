import React, { useState } from "react";
import { useEditRestaurant } from "../hooks";
import { Form, Modal } from "antd";
import { IRestaurant } from "../types/restaurant";
import RestaurantInputs from "./RestaurantInputs";

interface IProps {
  restaurant: IRestaurant;
  isOpen: boolean;

  onClose: () => void;
}

const EditRestaurant: React.FC<IProps> = ({ restaurant, isOpen, onClose }) => {
  const [editedRestaurant, setEditedRestuarant] = useState(restaurant);
  const editRestaurant = useEditRestaurant();

  const handleCancel = () => {
    editRestaurant(restaurant);
    onClose();
  };

  const handleEditRestaurant = () => {
    editRestaurant(editedRestaurant);
    onClose();
  };

  return (
    <Modal
      title="Edit Restaurant"
      visible={isOpen}
      onOk={() => handleEditRestaurant()}
      onCancel={handleCancel}
      okText="Edit"
      cancelText="Cancel"
    >
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
      </Form>
    </Modal>
  );
};

export default EditRestaurant;
