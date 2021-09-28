import React from "react";
import { Input } from "antd";
import { IReview } from "../../types/review";

interface IProps {
  review: IReview;
  updateReview: (review: IReview) => void;
}

const ReviewReplyInputs: React.FC<IProps> = ({ review, updateReview }) => {
  return (
    <Input
      placeholder="Reply"
      value={review.reply}
      onChange={(e) => updateReview({ ...review, reply: e.target.value })}
    />
  );
};

export default ReviewReplyInputs;
