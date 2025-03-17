import React from "react";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/user/UserSlice";
import { useNavigate } from "react-router-dom";

const UserDropdown: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      dispatch(logout()); 
    }
    if (key === "profile") {
     navigate('/profile') 
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "profile",
      label: "Profile",
      icon: <UserOutlined />,
    },
    {
      key: "logout",
      label: "Logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default UserDropdown;
