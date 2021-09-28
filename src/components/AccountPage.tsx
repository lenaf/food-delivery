import React from "react";
import firebase from "firebase";
import { useFetchUser } from "../hooks";
import { Button, Card, Row } from "antd";
import UserInputs from "./UserInputs";
import { useState } from "react";
import { useEffect } from "react";

const AccountPage: React.FC = () => {
  let firebaseUser = firebase.auth().currentUser;
  const { user: savedUser } = useFetchUser(firebaseUser?.uid ?? "");
  const [user, setUser] = useState(savedUser);

  useEffect(() => {
    setUser(savedUser);
  }, [savedUser]);

  return (
    <div>
      <Card>
        {user && <UserInputs user={user} updateUser={setUser} />}
        <Row>
          <Button
            className="mt-4 ml-auto"
            // onClick={() => addUser(user)}
            type="primary"
            disabled={!user?.name || !user?.type}
          >
            Save
          </Button>
        </Row>
      </Card>
    </div>
  );
};

export default AccountPage;
