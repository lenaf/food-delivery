import React, { useState } from "react";
import { Button, Dropdown, Menu, Row } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { IRestaurant } from "../types/restaurant";
import { useDeleteRestaurant, useGetPhotoUrl } from "../hooks";
import EditRestaurant from "./EditRestaurant";

const Restaurant: React.FC<{ restuarant: IRestaurant }> = ({ restuarant }) => {
  const [isInEditState, setIsInEditState] = useState(false);
  const { url } = useGetPhotoUrl(restuarant.profilePhotoId);
  const deleteRestautant = useDeleteRestaurant();

  return (
    <Row align="middle" className="bg-gray-50 mb-2 p-2 shadow">
      {isInEditState ? (
        <EditRestaurant
          restaurant={restuarant}
          onClose={() => setIsInEditState(false)}
        />
      ) : (
        <Row align="middle" className="flex-grow">
          <div className="text-lg mr-4">{restuarant.name}</div>
          <img src={url} alt="profile" />
          <Dropdown
            className="ml-auto"
            overlay={
              <Menu>
                <Menu.Item
                  onClick={() => {
                    setIsInEditState(true);
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    deleteRestautant(restuarant);
                  }}
                >
                  Delete
                </Menu.Item>
              </Menu>
            }
          >
            <Button
              type="text"
              shape="circle"
              icon={<EllipsisOutlined style={{ verticalAlign: "initial" }} />}
              onClick={(e) => e.preventDefault()}
            />
          </Dropdown>
        </Row>
      )}
    </Row>
  );
};

export default Restaurant;
