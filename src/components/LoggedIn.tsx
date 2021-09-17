import React, { useState } from "react";
import firebase from "firebase";
import { useFetchRestaurants } from "../hooks";
import { Button, Empty, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddRestaurant from "./AddRestaurant";
import Restaurant from "./Restaurant";

const LoggedIn: React.FC<{ user: firebase.User }> = ({ user }) => {
  const { restaurants, loading } = useFetchRestaurants();
  const [showNewRestaurantForm, setShowNewRestuarantForm] = useState(false);
  return (
    <div className="mx-auto" style={{ maxWidth: "400px" }}>
      <Button
        icon={<PlusOutlined style={{ verticalAlign: "initial" }} />}
        type="primary"
        onClick={() => setShowNewRestuarantForm(true)}
        className="mb-2 ml-auto"
      >
        Add Restaurant
      </Button>
      {showNewRestaurantForm && <AddRestaurant className="mb-4" user={user} />}
      {loading && <Spin />}
      {!loading && !restaurants.length && <Empty />}
      {restaurants.map((r, i) => (
        <Restaurant restuarant={r} key={i} />
      ))}
    </div>
  );
};

export default LoggedIn;
