import React from "react";
import { Modal } from "antd";
import { useDeleteReview } from "../../hooks/review";
import { IReview } from "../../types/review";

interface IProps {
  review: IReview;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteReview: React.FC<IProps> = ({ review, isOpen, onClose }) => {
  const deleteReview = useDeleteReview();

  return (
    <Modal
      title="Delete Review"
      visible={isOpen}
      onOk={() => {
        deleteReview(review);
        onClose();
      }}
      onCancel={onClose}
      okText="Confirm"
      cancelText="Cancel"
    >
      Are you sure you want to delete this review?
    </Modal>
  );
};

export default DeleteReview;
