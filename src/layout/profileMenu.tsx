import { useState } from "react";
import { Button, Popover } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  DownOutlined,
  LogoutOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "./profileMenu.css";
import { clearSession, getUserProfile } from "../auth/session";

type ProfileMenuProps = {
  onAddToken: () => void;
};

const getInitials = (name?: string) => {
  const parts = (name || "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "Q";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

function ProfileMenu({ onAddToken }: ProfileMenuProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profile = getUserProfile();
  const navigate = useNavigate();

  const displayName = profile?.name || "Queue user";
  const mobile = profile?.mobileNumber || "";
  const initials = getInitials(profile?.name);

  const close = () => setProfileOpen(false);

  const profileMenu = (
    <div className="profile-popover">
      {/* Ticket stub */}
      <div className="profile-popover__stub">
        <span className="profile-popover__avatar" aria-hidden="true">
          {initials}
        </span>
        <div className="profile-popover__user">
          <strong>{displayName}</strong>
          {mobile && <small>{mobile}</small>}
        </div>
      </div>

      {/* Perforation */}
      <div className="profile-popover__perforation" aria-hidden="true" />

      {/* Actions */}
      <div className="profile-popover__actions" role="menu">
        <Button
          type="text"
          role="menuitem"
          className="profile-popover__item"
          onClick={() => {
            close();
            onAddToken();
          }}
        >
          <span className="profile-popover__item-icon">
            <PlusOutlined />
          </span>
          <span className="profile-popover__item-text">
            <span>Add token</span>
            <small>Issue a new queue token</small>
          </span>
        </Button>

        <Link
          role="menuitem"
          className="profile-popover__item profile-popover__admin"
          to="/admin/login?returnTo=%2Fadmin-counter"
          onClick={close}
        >
          <span className="profile-popover__item-icon">
            <SettingOutlined />
          </span>
          <span className="profile-popover__item-text">
            <span>Admin</span>
            <small>Manage counters</small>
          </span>
        </Link>

        <Button
          type="text"
          role="menuitem"
          className="profile-popover__item profile-popover__item--danger"
          onClick={() => {
            close();
            clearSession();
            navigate("/login", { replace: true });
          }}
        >
          <span className="profile-popover__item-icon">
            <LogoutOutlined />
          </span>
          <span className="profile-popover__item-text">
            <span>Sign out</span>
          </span>
        </Button>
      </div>

      {/* Status */}
      <div className="profile-popover__footer">
        <div className="api-status" role="status">
          <span className="status-dot" /> API active
        </div>
      </div>
    </div>
  );

  return (
    <Popover
      content={profileMenu}
      trigger="click"
      placement="bottomRight"
      arrow={false}
      open={profileOpen}
      onOpenChange={setProfileOpen}
      overlayClassName="profile-popover-overlay"
    >
      <button
        className={`header-profile${profileOpen ? " is-open" : ""}`}
        type="button"
        aria-label="Open account menu"
        aria-haspopup="menu"
        aria-expanded={profileOpen}
      >
        <span className="header-profile__avatar" aria-hidden="true">
          {initials}
        </span>
        <span className="header-profile__details">
          <strong>{displayName}</strong>
          <small>{mobile}</small>
        </span>
        <DownOutlined className="header-profile__chevron" aria-hidden="true" />
      </button>
    </Popover>
  );
}

export default ProfileMenu;