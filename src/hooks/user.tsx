import firebase from "firebase";
import { useEffect, useState } from "react";
import { IUser } from "../types/user";

export const useFetchCurrentUser = () => {
  let firebaseUser = firebase.auth().currentUser;
  const [user, setUser] = useState<IUser | undefined>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (firebaseUser?.uid) {
      setLoading(true);
      firebase
        .firestore()
        .collection("users")
        .doc(firebaseUser?.uid)
        .onSnapshot((snapshot) => {
          if (snapshot.exists) {
            setUser({
              id: snapshot.id,
              ...snapshot.data(),
              isAdmin: snapshot.data()?.type === "Admin",
              isOwner: snapshot.data()?.type === "Owner",
            } as IUser);
          }
          setLoading(false);
        });
    } else {
      setUser(undefined);
    }
  }, [firebaseUser?.uid]);
  return { user, loading };
};

export const useFetchUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    firebase
      .firestore()
      .collection("users")
      .onSnapshot((snapshot) =>
        setUsers(
          snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as IUser)
          )
        )
      );
    setLoading(false);
  }, []);
  return { users, loading };
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
