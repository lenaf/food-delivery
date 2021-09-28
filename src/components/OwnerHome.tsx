import React, { useState } from "react";
import { useFetchOwnerRestaurants } from "../hooks/restaurant";
import { Button, Row } from "antd";
import OwnerRestaurantCard from "./restaurant/OwnerRestaurantCard";
import AddRestaurantModal from "./restaurant/AddRestaurantModal";
import { useFetchCurrentUser } from "../hooks/user";

const OwnerHome: React.FC = () => {
  const { user } = useFetchCurrentUser();
  const { restaurants } = useFetchOwnerRestaurants(user?.id);
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);

  return (
    <div>
      <Row>
        <Button
          type="primary"
          className="mb-4 "
          onClick={() => setShowAddRestaurant(true)}
        >
          Add Restaurant
        </Button>
      </Row>
      <AddRestaurantModal
        isOpen={showAddRestaurant}
        onClose={() => setShowAddRestaurant(false)}
      />
      {restaurants.map((r, i) => (
        <OwnerRestaurantCard key={i} restaurant={r} />
      ))}
    </div>
  );
};

export default OwnerHome;
