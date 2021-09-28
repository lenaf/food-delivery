import React from "react";
import firebase from "firebase";
import { useEditUser, useFetchUser } from "../../hooks/user";
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

  const editUser = useEditUser();

  return (
    <div>
      <Card>
        {user && <UserInputs user={user} updateUser={setUser} />}
        <Row>
          <Button
            className="mt-4 ml-auto"
            onClick={() => user && editUser(user)}
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
