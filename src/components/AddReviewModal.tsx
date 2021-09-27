import React, { useState } from "react";
import firebase from "firebase";
import { Form, Modal } from "antd";
import { useAddReview } from "../hooks";
import { IReviewInput } from "../types/review";
import { IRestaurant } from "../types/restaurant";
import ReviewInputs from "./ReviewInputs";

interface IProps {
  restaurant: IRestaurant;
  isOpen: boolean;
  onClose: () => void;
}

const AddRestaurant: React.FC<IProps> = ({ restaurant, isOpen, onClose }) => {
  let user = firebase.auth().currentUser;
  const reviewerId = user?.uid ?? "";
  const restaurantId = restaurant.id;

  const addReview = useAddReview();
  const [newReview, updateNewReview] = useState<IReviewInput>({
    reviewerId,
    restaurantId,
  });

  const handleAddReview = () => {
    addReview(newReview);
    updateNewReview({ reviewerId, restaurantId });
    onClose();
  };

  return (
    <Modal
      title="Add Review"
      visible={isOpen}
      onOk={() => handleAddReview()}
      onCancel={onClose}
      okText="Add"
      cancelText="Cancel"
    >
      <Form onFinish={handleAddReview}>
        <ReviewInputs review={newReview} updateReview={updateNewReview} />
      </Form>
    </Modal>
  );
};

export default AddRestaurant;
