import React, { useState } from "react";
import { Card, Row, Avatar, Tooltip, Button } from "antd";
import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";
import { IUser } from "../../types/user";
import { UserOutlined } from "@ant-design/icons";

const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
  const [showEditUser, setShowEditUser] = useState(false);
  const [showDeleteUser, setShowDeleteUser] = useState(false);
  return (
    <div>
      <Card bordered={false} className="rounded shadow-sm ">
        <Row>
          <Avatar
            src={user.profilePhotoUrl}
            className="mr-2"
            icon={<UserOutlined />}
          />
          <div>
            <h4 className="font-bold">{user.name}</h4>
            <small>{user.type}</small>
          </div>
          <Row className="ml-auto">
            <Tooltip title="Edit" className="mr-2">
              <Button shape="circle" onClick={() => setShowEditUser(true)}>
                <i className="fas fa-pen text-blue-500"></i>
              </Button>
            </Tooltip>
            <Tooltip title="Delete" className="mr-2">
              <Button shape="circle" onClick={() => setShowDeleteUser(true)}>
                <i className="fas fa-trash-alt text-blue-500"></i>
              </Button>
            </Tooltip>
          </Row>
        </Row>
      </Card>
      <EditUserModal
        user={user}
        isOpen={showEditUser}
        onClose={() => setShowEditUser(false)}
      />
      <DeleteUserModal
        user={user}
        isOpen={showDeleteUser}
        onClose={() => setShowDeleteUser(false)}
      />
    </div>
  );
};

export default UserCard;
