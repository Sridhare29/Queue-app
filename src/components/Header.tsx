import { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import AddToken from "../layout/addtoken";
import ProfileMenu from "../layout/profileMenu";

function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <div className="app-shell">
      <div className="app-header">
        <div className="header-identity">
          <p className="eyebrow">KANINI QUEUE</p>
        </div>

        <div className="header-actions">
          <Button
            className="button-user"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Add token
          </Button>
          <ProfileMenu onAddToken={showModal} />
          <AddToken open={isModalVisible} onClose={closeModal} />
        </div>
      </div>
    </div>
  );
}

export default Header;