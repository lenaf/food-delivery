import firebase from "firebase";
import { useEffect, useState } from "react";
import { IRestaurant, IRestaurantInput } from "../types/restaurant";

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
            (doc) =>
              ({
                id: doc.id,
                averageScore: 0,
                ...doc.data(),
              } as unknown as IRestaurant)
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

export const useAddRestaurant = () => (newRestaurant: IRestaurantInput) =>
  firebase
    .firestore()
    .collection("restaurants")
    .add({ ...newRestaurant });

export const useEditRestaurant = () => (restaurant: IRestaurant) =>
  firebase
    .firestore()
    .collection("restaurants")
    .doc(restaurant.id)
    .update(restaurant);

export const useDeleteRestaurant = () => (restaurant: IRestaurant) => {
  firebase.firestore().collection("restaurants").doc(restaurant.id).delete();
  firebase
    .firestore()
    .collection("reviews")
    .where("restaurantId", "==", restaurant.id)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
    });
};
