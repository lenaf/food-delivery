import React, { useState } from "react";
import { Card, Rate, Row, Avatar, Tooltip, Button } from "antd";
import { IReview } from "../../types/review";
import moment from "moment";
import { useFetchCurrentUser } from "../../hooks/user";
import EditReviewModal from "./EditReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import AddReplyModal from "./AddReplyModal";

const ReviewCard: React.FC<{ review: IReview; className?: string }> = ({
  review,
  className,
}) => {
  const { user } = useFetchCurrentUser();
  const [showEditReview, setShowEditReview] = useState(false);
  const [showDeleteReview, setShowDeleteReview] = useState(false);
  const [showReply, setShowReply] = useState(false);

  return (
    <>
      <Card bordered={false} className={`${className} rounded shadow-sm`}>
        <Row align="middle">
          <Avatar src={review.reviewer?.profilePhotoUrl} className="mr-2" />
          <h4 className="font-bold">{review.reviewer?.name ?? "Unknown"}</h4>
          <Row className="ml-auto">
            {user?.isAdmin && (
              <Tooltip title="Edit" className="mr-2">
                <Button shape="circle" onClick={() => setShowEditReview(true)}>
                  <i className="fas fa-pen text-blue-500"></i>
                </Button>
              </Tooltip>
            )}
            {user?.isAdmin && (
              <Tooltip title="Delete" className="mr-2">
                <Button
                  shape="circle"
                  onClick={() => setShowDeleteReview(true)}
                >
                  <i className="fas fa-trash-alt text-blue-500"></i>
                </Button>
              </Tooltip>
            )}
            {user?.isOwner && (
              <Tooltip title="Reply" className="mr-2">
                <Button shape="circle" onClick={() => setShowReply(true)}>
                  <i className="fas fa-reply text-blue-500"></i>
                </Button>
              </Tooltip>
            )}
          </Row>
        </Row>
        <Row align="middle" className="mb-2">
          <Rate disabled value={review.score} className="mr-2" />
          {moment(review.date).format("L")}
        </Row>
        <p className="text-lg">{review.text}</p>
        {review.reply && <p className="text-sm">Replied: {review.reply}</p>}
      </Card>
      <EditReviewModal
        review={review}
        isOpen={showEditReview}
        onClose={() => setShowEditReview(false)}
      />
      <AddReplyModal
        review={review}
        isOpen={showReply}
        onClose={() => setShowReply(false)}
      />
      <DeleteReviewModal
        review={review}
        isOpen={showDeleteReview}
        onClose={() => setShowDeleteReview(false)}
      />
    </>
  );
};

export default ReviewCard;
