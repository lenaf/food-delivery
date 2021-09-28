import React, { useState } from "react";
import firebase from "firebase";
import { Form, Modal } from "antd";
import RestaurantInputs from "./RestaurantInputs";
import { IRestaurantInput } from "../types/restaurant";
import { useAddRestaurant } from "../hooks";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddRestaurantModal: React.FC<IProps> = ({ isOpen, onClose }) => {
  let user = firebase.auth().currentUser;
  const addRestaurant = useAddRestaurant();
  const [newRestaurant, updateNewRestaurant] = useState<IRestaurantInput>({
    ownerId: user?.uid,
  });

  const handleClose = () => {
    updateNewRestaurant({
      ownerId: user?.uid,
    });
    onClose();
  };

  const handleAddRestaurant = () => {
    addRestaurant(newRestaurant);
    handleClose();
  };

  return (
    <Modal
      title="Add Restaurant"
      visible={isOpen}
      onOk={() => handleAddRestaurant()}
      onCancel={handleClose}
      okText="Add"
      cancelText="Cancel"
    >
      <Form onFinish={handleAddRestaurant}>
        <RestaurantInputs
          restaurant={newRestaurant}
          updateRestaurant={updateNewRestaurant}
        />
      </Form>
    </Modal>
  );
};

export default AddRestaurantModal;
