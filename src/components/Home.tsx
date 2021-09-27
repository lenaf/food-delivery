import React from "react";
import { useFetchRestaurants } from "../hooks";
import { Empty, Spin } from "antd";
import RestaurantCard from "./RestaurantCard";

const Home: React.FC = () => {
  const { restaurants, loading } = useFetchRestaurants();
  return (
    <div>
      {loading && <Spin />}
      {!loading && !restaurants.length && <Empty />}
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
