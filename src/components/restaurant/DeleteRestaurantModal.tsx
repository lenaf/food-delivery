import React from "react";
import { useDeleteRestaurant } from "../../hooks/restaurant";
import { Modal } from "antd";
import { IRestaurant } from "../../types/restaurant";

interface IProps {
  restaurant: IRestaurant;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteRestaurant: React.FC<IProps> = ({
  restaurant,
  isOpen,
  onClose,
}) => {
  const deleteRestaurant = useDeleteRestaurant();

  return (
    <Modal
      title="Delete Restaurant"
      visible={isOpen}
      onOk={() => {
        deleteRestaurant(restaurant);
        onClose();
      }}
      onCancel={onClose}
      okText="Confirm"
      cancelText="Cancel"
    >
      Are you sure you want to delete {restaurant.name}?
    </Modal>
  );
};

export default DeleteRestaurant;
