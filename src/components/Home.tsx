import React, { useState } from "react";
import { useFetchRestaurants } from "../hooks";
import { Button, Empty, Spin } from "antd";
import RestaurantCard from "./RestaurantCard";
import AddRestaurantModal from "./AddRestaurantModal";

const Home: React.FC = () => {
  const { restaurants, loading } = useFetchRestaurants();
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);

  return (
    <div>
      <Button
        type="primary"
        className="mb-4"
        onClick={() => setShowAddRestaurant(true)}
      >
        Add Restaurant
      </Button>

      <AddRestaurantModal
        isOpen={showAddRestaurant}
        onClose={() => setShowAddRestaurant(false)}
      />
      <div className="flex flex-row mb-2">
        {restaurants.map((r, i) => (
          <div className="mr-2" key={i}>
            <RestaurantCard restaurant={r} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
