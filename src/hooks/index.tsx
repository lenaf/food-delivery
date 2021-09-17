import firebase from "firebase";
import { useEffect, useState } from "react";
import { IRestaurant, IRestaurantInput } from "../types/restaurant";
import { v4 as uuidv4 } from "uuid";

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

export const useGetPhotoUrl = (path: string) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (path) {
      setLoading(true);
      firebase.storage().ref(path).getDownloadURL().then(setUrl);
      setLoading(false);
    } else {
      setUrl("");
    }
  }, [path]);
  return { url, loading };
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

export const useDeleteRestaurant = () => (restaurant: IRestaurant) =>
  firebase.firestore().collection("restaurants").doc(restaurant.id).delete();
