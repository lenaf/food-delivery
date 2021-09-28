import React, { useState } from "react";
import { useEditReview } from "../../hooks/review";
import { Divider, Form, Modal } from "antd";
import ReviewInputs from "./ReviewInputs";
import { IReview } from "../../types/review";
import ReviewReplyInputs from "./ReviewReplyInputs";

interface IProps {
  review: IReview;
  isOpen: boolean;
  onClose: () => void;
}

const EditReview: React.FC<IProps> = ({ review, isOpen, onClose }) => {
  const [editedReview, setEditedReview] = useState(review);
  const editReview = useEditReview();

  const handleCancel = () => {
    editReview(review);
    onClose();
  };

  const handleEditReview = () => {
    editReview(editedReview);
    onClose();
  };

  return (
    <Modal
      title="Edit Review"
      visible={isOpen}
      onOk={() => handleEditReview()}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{ disabled: !editedReview.score || !editedReview.date }}
    >
      <ReviewInputs
        review={editedReview}
        updateReview={(r) => setEditedReview(r as IReview)}
      />
      <Divider />
      Reply
      <ReviewReplyInputs
        review={editedReview}
        updateReview={(r) => setEditedReview(r as IReview)}
      />
    </Modal>
  );
};

export default EditReview;
