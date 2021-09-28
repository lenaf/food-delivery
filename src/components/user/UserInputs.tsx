import React from "react";
import { Row, Input, Col, Radio } from "antd";
import { IUser } from "../../types/user";
import PhotoUpload from "../shared/PhotoUpload";

interface IProps {
  user: IUser;
  updateUser: (user: IUser) => void;
}

const UserInputs: React.FC<IProps> = ({ user, updateUser }) => {
  return (
    <div>
      <Row className="mb-2 ">
        <Col className="mr-4 flex-grow">
          <Input
            value={user.name}
            placeholder="Name"
            onChange={(e) => updateUser({ ...user, name: e.target.value })}
          />
        </Col>
      </Row>
      <div>Profile Picture (Optional)</div>
      <PhotoUpload
        url={user.profilePhotoUrl}
        onUpload={(profilePhotoUrl) => updateUser({ ...user, profilePhotoUrl })}
      />
      <div>What type of user are you?</div>
      <Radio.Group
        onChange={(e) => updateUser({ ...user, type: e.target.value })}
        value={user.type}
        style={{ marginTop: 16 }}
      >
        <Radio.Button value="Regular">Regular</Radio.Button>
        <Radio.Button value="Owner">Restaurant Owner</Radio.Button>
        <Radio.Button value="Admin">Site Admin</Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default UserInputs;
