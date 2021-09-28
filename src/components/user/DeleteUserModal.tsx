import React from "react";
import { useDeleteUser } from "../../hooks/user";
import { Modal } from "antd";
import { IUser } from "../../types/user";

interface IProps {
  user: IUser;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteUser: React.FC<IProps> = ({ user, isOpen, onClose }) => {
  const deleteUser = useDeleteUser();

  return (
    <Modal
      title="Delete User"
      visible={isOpen}
      onOk={() => {
        deleteUser(user);
        onClose();
      }}
      onCancel={onClose}
      okText="Confirm"
      cancelText="Cancel"
    >
      Are you sure you want to delete {user.name}?
    </Modal>
  );
};

export default DeleteUser;
