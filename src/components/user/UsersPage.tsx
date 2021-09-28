import React from "react";
import { Row, Col } from "antd";

import { useFetchUsers } from "../../hooks/user";
import UserCard from "./UserCard";

const Home: React.FC = () => {
  const { users } = useFetchUsers();

  return (
    <Row wrap gutter={8}>
      {users.map((user, i) => (
        <Col xs={24} sm={12} md={12} lg={8} xl={6} key={i} className="mb-2">
          <UserCard user={user} />
        </Col>
      ))}
    </Row>
  );
};

export default Home;
