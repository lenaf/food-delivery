import firebase from "firebase";
import { useEffect, useState } from "react";
import { IReview, IReviewInput } from "../types/review";
import { IUser } from "../types/user";

export const useFetchRestaurantReviews = (id: string) => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection("reviews")
      .where("restaurantId", "==", id)
      .onSnapshot(async (snapshot) => {
        const reviews = snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as IReview)
        );
        const reviewerSnapshots = await Promise.all(
          reviews.map((review) =>
            firebase
              .firestore()
              .collection("users")
              .doc(review.reviewerId)
              .get()
          )
        );
        reviewerSnapshots.forEach(
          (snapshot, i) =>
            (reviews[i].reviewer = {
              id: snapshot.id,
              ...snapshot.data(),
            } as IUser)
        );
        setReviews(reviews);
        setLoading(false);
      });
  }, [id]);

  return { reviews, loading };
};

export const useAddReview = () => async (newReview: IReviewInput) => {
  await firebase
    .firestore()
    .collection("reviews")
    .add({ ...newReview });

  await recalculateReview(newReview.restaurantId);
};

export const recalculateReview = async (restaurantId: string) => {
  const allReviews = (
    await firebase
      .firestore()
      .collection("reviews")
      .where("restaurantId", "==", restaurantId)
      .get()
  ).docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as IReview)
  );

  const sumOfReviewScores = allReviews.reduce(
    (sum: number, review: IReview) => sum + (review.score ?? 0),
    0
  );

  firebase
    .firestore()
    .collection("restaurants")
    .doc(restaurantId)
    .update({
      averageScore:
        allReviews.length > 0 ? sumOfReviewScores / allReviews.length : 0,
      numberOfReviews: allReviews.length,
    });
};

export const useDeleteReview = () => async (review: IReview) => {
  await firebase.firestore().collection("reviews").doc(review.id).delete();
  await recalculateReview(review.restaurantId);
};

export const useEditReview = () => async (review: IReview) => {
  await firebase
    .firestore()
    .collection("reviews")
    .doc(review.id)
    .update(review);
  await recalculateReview(review.restaurantId);
};
