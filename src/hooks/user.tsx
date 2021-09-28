import firebase from "firebase";
import { useEffect, useState } from "react";
import { IUser } from "../types/user";

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

export const useAddUser = () => (user: IUser) =>
  firebase
    .firestore()
    .collection("users")
    .doc(user.id)
    .set({ ...user });

export const useEditUser = () => (user: IUser) =>
  firebase
    .firestore()
    .collection("users")
    .doc(user.id)
    .update({ ...user });

export const useDeleteUser = () => (user: IUser) => {
  firebase.firestore().collection("users").doc(user.id).delete();
};
