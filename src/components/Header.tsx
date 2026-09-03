import { useState } from "react";
import { Button } from "antd";
import AddToken from "../layout/addtoken";

function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <div className="app-shell">
      <div className="app-header">
        <p className="eyebrow">KANINI QUEUE</p>

        <div className="header-actions">
          <Button className="button-user" onClick={showModal}>
            Token
          </Button>

          <AddToken
            open={isModalVisible}
            onClose={closeModal}
          />

          <div className="api-status">
            <span className="status-dot" /> Active
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;