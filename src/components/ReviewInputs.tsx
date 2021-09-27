import React from "react";
import { Row, Input, Col, Rate } from "antd";
import { IReview, IReviewInput } from "../types/review";

interface IProps {
  review: IReview | IReviewInput;
  updateReview: (review: IReview | IReviewInput) => void;
}

const ReviewInputs: React.FC<IProps> = ({ review, updateReview }) => {
  return (
    <div>
      <Row className="mb-2 ">
        <Col className="mr-4 flex-grow">
          <Input
            value={review.text}
            onChange={(e) => updateReview({ ...review, text: e.target.value })}
          />
        </Col>
      </Row>
      <Rate
        count={review.score}
        onChange={(score) => updateReview({ ...review, score })}
      />
    </div>
  );
};

export default ReviewInputs;
