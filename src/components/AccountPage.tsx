import React from "react";
import firebase from "firebase";

const AccountPage: React.FC = () => {
  let user = firebase.auth().currentUser;
  return <div>{user?.email}</div>;
};

export default AccountPage;
