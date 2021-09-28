import React, { useState } from "react";
import { useFetchRestaurants } from "../hooks/restaurant";
import { Button, Row, Col, Select, Rate } from "antd";
import RestaurantCard from "./restaurant/RestaurantCard";
import AddRestaurantModal from "./restaurant/AddRestaurantModal";
import { orderBy } from "lodash";
import { useFetchCurrentUser } from "../hooks/user";

const Home: React.FC = () => {
  const { user } = useFetchCurrentUser();
  const { restaurants } = useFetchRestaurants();
  const [showAddRestaurant, setShowAddRestaurant] = useState(false);
  const [minimumRating, setMinimumRating] = useState<number | undefined>();
  const restaurantsFeed = orderBy(restaurants, "averageScore", "desc").filter(
    (r) => !minimumRating || r.averageScore > minimumRating
  );

  return (
    <div>
      <Row>
        <div className="mr-4 ml-auto">
          <Select
            placeholder="Minimum Stars"
            value={minimumRating}
            style={{ width: 180 }}
            onChange={setMinimumRating}
            allowClear
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <Select.Option key={num} value={num}>
                <Rate disabled value={num} />
              </Select.Option>
            ))}
          </Select>
        </div>
        {(user?.isAdmin || user?.isOwner) && (
          <Button
            type="primary"
            className="mb-4 mr-4"
            onClick={() => setShowAddRestaurant(true)}
          >
            Add Restaurant
          </Button>
        )}
      </Row>
      <AddRestaurantModal
        isOpen={showAddRestaurant}
        onClose={() => setShowAddRestaurant(false)}
      />
      <Row wrap gutter={8}>
        {restaurantsFeed.map((r, i) => (
          <Col xs={12} sm={8} md={6} lg={6} xl={4} key={i} className="mb-2">
            <RestaurantCard restaurant={r} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
