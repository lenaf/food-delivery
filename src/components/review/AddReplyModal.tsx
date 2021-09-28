import React, { useEffect, useState } from "react";
import { useEditReview } from "../../hooks/review";
import { Form, Modal } from "antd";
import ReviewReplyInputs from "./ReviewReplyInputs";
import { IReview } from "../../types/review";

interface IProps {
  review: IReview;
  isOpen: boolean;
  onClose: () => void;
}

const AddReplyModal: React.FC<IProps> = ({ review, isOpen, onClose }) => {
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

  useEffect(() => setEditedReview(review), [review]);

  return (
    <Modal
      title="Reply to Review"
      visible={isOpen}
      onOk={() => handleEditReview()}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{
        disabled: !editedReview.reply,
      }}
    >
      <Form
        onFinish={() => {
          editReview(editedReview);
          onClose();
        }}
      >
        <ReviewReplyInputs
          review={editedReview}
          updateReview={(r) => setEditedReview(r as IReview)}
        />
      </Form>
    </Modal>
  );
};

export default AddReplyModal;
