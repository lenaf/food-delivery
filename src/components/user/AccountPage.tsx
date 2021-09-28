import React from "react";
import { useEditUser, useFetchCurrentUser } from "../../hooks/user";
import { Button, Card, Row } from "antd";
import UserInputs from "./UserInputs";
import { useState } from "react";
import { useEffect } from "react";
import { isEqual } from "lodash";

const AccountPage: React.FC = () => {
  const { user: savedUser } = useFetchCurrentUser();
  const [user, setUser] = useState(savedUser);

  useEffect(() => {
    setUser(savedUser);
  }, [savedUser]);

  const editUser = useEditUser();
  const isEdited = !isEqual(user, savedUser);

  return (
    <div>
      <Card>
        {user && <UserInputs user={user} updateUser={setUser} />}
        {isEdited && (
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
        )}
      </Card>
    </div>
  );
};

export default AccountPage;
