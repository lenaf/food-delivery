import React, { useState } from "react";
import { Card, Rate, Row, Avatar, Tooltip, Button } from "antd";
import { IReview } from "../../types/review";
import moment from "moment";
import { useFetchUser } from "../../hooks/user";
import firebase from "firebase";
import EditReviewModal from "./EditReviewModal";
import DeleteReviewModal from "./DeleteReviewModal";
import AddReplyModal from "./AddReplyModal";

const ReviewCard: React.FC<{ review: IReview }> = ({ review }) => {
  let firebaseUser = firebase.auth().currentUser;
  const { user } = useFetchUser(firebaseUser?.uid ?? "");
  const [showEditReview, setShowEditReview] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [showDeleteReview, setShowDeleteReview] = useState(false);
  const isAdmin = user?.type === "Admin";
  const isOwner = user?.type === "Owner";

  return (
    <div>
      <Card>
        <Row align="middle">
          <Avatar src={review.reviewer?.profilePhotoUrl} className="mr-2" />
          <h4 className="font-bold">{review.reviewer?.name ?? "Unknown"}</h4>
          <Row className="ml-auto">
            {isAdmin && (
              <Tooltip title="Edit" className="mr-2">
                <Button shape="circle" onClick={() => setShowEditReview(true)}>
                  <i className="fas fa-pen text-blue-500"></i>
                </Button>
              </Tooltip>
            )}
            {isAdmin && (
              <Tooltip title="Delete" className="mr-2">
                <Button
                  shape="circle"
                  onClick={() => setShowDeleteReview(true)}
                >
                  <i className="fas fa-trash-alt text-blue-500"></i>
                </Button>
              </Tooltip>
            )}
            {isOwner && (
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
    </div>
  );
};

export default ReviewCard;
