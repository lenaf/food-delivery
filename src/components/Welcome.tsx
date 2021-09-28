import React from "react";
import firebase from "firebase";
import { useState } from "react";
import UserInputs from "./UserInputs";
import { IUser } from "../types/user";
import { Card, Button, Row } from "antd";
import { useAddUser } from "../hooks";

interface IProps {
  firebaseUser: firebase.User;
}

const Welcome: React.FC<IProps> = ({ firebaseUser }) => {
  const [user, setUser] = useState({
    id: firebaseUser.uid,
    name: firebaseUser?.displayName ?? "",
    profilePhotoUrl: firebaseUser?.photoURL,
    type: "Regular",
  } as IUser);

  const addUser = useAddUser();

  return (
    <div>
      <h1 className="mb-8 text-6xl font-bold	">
        Welcome
        {firebaseUser?.displayName ? " " + firebaseUser?.displayName : ""}!
      </h1>
      <h4 className="mb-8 text-3xl">
        Before continuing on to the site, we need to gather just a bit of
        information.
      </h4>
      <Card>
        <UserInputs user={user} updateUser={setUser} />
        <Row>
          <Button
            className="mt-4 ml-auto"
            onClick={() => addUser(user)}
            type="primary"
            disabled={!user.name || !user.type}
          >
            Continue
          </Button>
        </Row>
      </Card>
    </div>
  );
};

export default Welcome;
