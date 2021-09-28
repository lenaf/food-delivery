import React from "react";
import { Row, Input, Col, Rate, DatePicker } from "antd";
import { IReview, IReviewInput } from "../../types/review";
import moment from "moment";

interface IProps {
  review: IReview | IReviewInput;
  updateReview: (review: IReview | IReviewInput) => void;
}

const ReviewInputs: React.FC<IProps> = ({ review, updateReview }) => {
  return (
    <div>
      <DatePicker
        placeholder="Date"
        value={review.date ? moment(review.date) : undefined}
        onChange={(date, dateString) =>
          updateReview({ ...review, date: dateString })
        }
        className="mb-2"
      />
      <Row className="mb-2 ">
        <Col className="mr-4 flex-grow">
          <Input
            placeholder="Comment"
            value={review.text}
            onChange={(e) => updateReview({ ...review, text: e.target.value })}
          />
        </Col>
      </Row>
      <Rate
        value={review.score}
        onChange={(score) => updateReview({ ...review, score })}
      />
    </div>
  );
};

export default ReviewInputs;
