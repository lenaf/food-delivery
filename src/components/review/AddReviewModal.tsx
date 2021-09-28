import React, { useState } from "react";
import firebase from "firebase";
import { Form, Modal } from "antd";
import { useAddReview } from "../../hooks/review";
import { IReviewInput } from "../../types/review";
import { IRestaurant } from "../../types/restaurant";
import ReviewInputs from "./ReviewInputs";

interface IProps {
  restaurant: IRestaurant;
  isOpen: boolean;
  onClose: () => void;
}

const AddReviewModal: React.FC<IProps> = ({ restaurant, isOpen, onClose }) => {
  let user = firebase.auth().currentUser;
  const reviewerId = user?.uid ?? "";
  const restaurantId = restaurant.id;

  const addReview = useAddReview();
  const [newReview, updateNewReview] = useState<IReviewInput>({
    reviewerId,
    restaurantId,
  });

  const handleClose = () => {
    updateNewReview({ reviewerId, restaurantId });
    onClose();
  };

  const handleAddReview = () => {
    addReview(newReview);
    handleClose();
  };

  return (
    <Modal
      title="Add Review"
      visible={isOpen}
      onOk={() => handleAddReview()}
      onCancel={handleClose}
      okText="Add"
      cancelText="Cancel"
      okButtonProps={{
        disabled: !newReview.date || !newReview.score || !newReview.text,
      }}
    >
      <Form onFinish={handleAddReview}>
        <ReviewInputs review={newReview} updateReview={updateNewReview} />
      </Form>
    </Modal>
  );
};

export default AddReviewModal;
