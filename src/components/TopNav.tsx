import React from "react";
import { Button, Row, Layout, Menu, Dropdown } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { DownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { IUser } from "../types/user";
import firebase from "firebase";

interface IProps {
  user?: IUser | null;
  signOut: () => void;
}

const TopNav: React.FC<IProps> = ({ user, signOut }) => {
  const history = useHistory();
  let firebaseUser = firebase.auth().currentUser;

  const handleSignout = () => {
    signOut();
    history.push("/");
  };
  return (
    <Layout.Header className="bg-indigo-800 text-white">
      <Row align="middle" wrap={false} className="h-full">
        <Row
          align="middle"
          onClick={() => history.push("/")}
          className="cursor-pointer"
        >
          <i className="fas fa-utensils fa-lg mr-2"></i>
          <h4 className="text-white text-2xl font-bold	">Food Finds</h4>
        </Row>
        {user && (
          <Dropdown
            trigger={["click"]}
            className="ml-auto"
            overlay={
              <Menu className="w-60">
                <Menu.Item className="flex" key="0">
                  <Button
                    onClick={() => history.push("/account")}
                    className="mx-auto"
                  >
                    Manage Account
                  </Button>
                </Menu.Item>
                <Menu.Item className="flex" key="1">
                  <Button onClick={handleSignout} className="mx-auto">
                    Sign out
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Row align="middle" className="cursor-pointer ">
              <Avatar src={user.profilePhotoUrl} className="mr-2" />
              <h1 className="items-center text-white mr-2">{user.name}</h1>
              <DownOutlined color="white" />
            </Row>
          </Dropdown>
        )}
        {!user && firebaseUser && (
          <Button onClick={handleSignout} className="ml-auto">
            Sign out
          </Button>
        )}
      </Row>
    </Layout.Header>
  );
};

export default TopNav;
