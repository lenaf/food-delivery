import React, { useState } from "react";
import { useEditUser } from "../../hooks/user";
import { Modal } from "antd";
import { IUser } from "../../types/user";
import UserInputs from "./UserInputs";

interface IProps {
  user: IUser;
  isOpen: boolean;

  onClose: () => void;
}

const EditUser: React.FC<IProps> = ({ user, isOpen, onClose }) => {
  const [editedUser, setEditedUser] = useState(user);
  const editUser = useEditUser();

  const handleCancel = () => {
    setEditedUser(user);
    onClose();
  };

  const handleEditUser = () => {
    editUser(editedUser);
    onClose();
  };

  return (
    <Modal
      title="Edit User"
      visible={isOpen}
      onOk={() => handleEditUser()}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      okButtonProps={{ disabled: !editedUser.name || !editedUser.type }}
    >
      <UserInputs user={editedUser} updateUser={setEditedUser} />
    </Modal>
  );
};

export default EditUser;
