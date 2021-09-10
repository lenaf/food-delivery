import React from "react";
import firebase from "firebase";
import { Button, Row, Layout } from "antd";
import Avatar from "antd/lib/avatar/avatar";

interface IProps {
  user?: firebase.User | null;
  signOut: () => void;
}

const TopNav: React.FC<IProps> = ({ user, signOut }) => (
  <Layout.Header className="bg-blue-500">
    <Row align="middle" wrap={false} className="h-full">
      <h4 className="text-white text-2xl">Food Delivery App</h4>
      {user && (
        <Row align="middle" className="ml-auto">
          <Avatar src={user.photoURL} className="mr-2" />
          <h1 className="items-center text-white mr-2">{user.displayName}</h1>
          <Button onClick={signOut}>Sign out</Button>
        </Row>
      )}
    </Row>
  </Layout.Header>
);

export default TopNav;
