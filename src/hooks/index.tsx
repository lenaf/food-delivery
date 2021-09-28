import firebase from "firebase";
import { useEffect, useState } from "react";
import { IRestaurant, IRestaurantInput } from "../types/restaurant";
import { IReview, IReviewInput } from "../types/review";
import { IUser } from "../types/user";

export const useFetchRestaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    firebase
      .firestore()
      .collection("restaurants")
      .onSnapshot((snapshot) =>
        setRestaurants(
          snapshot.docs.map(
            (doc) => ({ id: doc.id, ...doc.data() } as unknown as IRestaurant)
          )
        )
      );
    setLoading(false);
  }, []);
  return { restaurants, loading };
};

export const useFetchRestaurantById = (id: string) => {
  const [restaurant, setRestaurant] = useState<IRestaurant | undefined>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection("restaurants")
      .doc(id)
      .onSnapshot((snapshot) =>
        setRestaurant({
          id: snapshot.id,
          ...snapshot.data(),
        } as unknown as IRestaurant)
      );
    setLoading(false);
  }, [id]);
  return { restaurant, loading };
};

export const useFetchUser = (id: string) => {
  const [user, setUser] = useState<IUser | undefined>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (id) {
      setLoading(true);
      firebase
        .firestore()
        .collection("users")
        .doc(id)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            setUser({
              id: snapshot.id,
              ...snapshot.data(),
            } as unknown as IUser);
          }
          setLoading(false);
        });
    } else {
      setUser(undefined);
    }
  }, [id]);
  return { user, loading };
};

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
        const reviews = snapshot.docs.map((doc) => {
          const review = {
            id: doc.id,
            ...doc.data(),
          } as IReview;

          return review;
        });
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

export const useAddRestaurant = () => (newRestaurant: IRestaurantInput) =>
  firebase
    .firestore()
    .collection("restaurants")
    .add({ ...newRestaurant });

export const useAddUser = () => (user: IUser) =>
  firebase
    .firestore()
    .collection("users")
    .doc(user.id)
    .set({ ...user });

export const useEditRestaurant = () => (restaurant: IRestaurant) =>
  firebase
    .firestore()
    .collection("restaurants")
    .doc(restaurant.id)
    .update(restaurant);

export const useDeleteRestaurant = () => (restaurant: IRestaurant) =>
  firebase.firestore().collection("restaurants").doc(restaurant.id).delete();

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
      averageScore: sumOfReviewScores / allReviews.length,
      numberOfReviews: allReviews.length,
    });
};

const googleProvider = new firebase.auth.GoogleAuthProvider();

// const signInWithGoogle = async () => {
//   try {
//     const res = await auth.signInWithPopup(googleProvider);
//     const user = res.user;
//     const query = await db
//       .collection("users")
//       .where("uid", "==", user.uid)
//       .get();
//     if (query.docs.length === 0) {
//       await db.collection("users").add({
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };
