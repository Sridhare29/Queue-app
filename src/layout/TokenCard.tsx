import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import type { RootState } from "../state/store";
import { getgenerateToken } from "../state/action/generateToken.Action";
import { getUserProfile } from "../auth/session";
import generateTokenImg from "../assets/Addtoken.webp"; // your image

function TokenCard() {
  const dispatch = useDispatch<any>();
  const token = useSelector(
    (state: RootState) => state.generateToken.generateToken
  );
  const [isLoading, setIsLoading] = useState(false);

  const profile = getUserProfile();

  const handleGenerateToken = async () => {
    if (isLoading) return;

    const name = profile?.name?.trim();
    const mobileNo = profile?.mobileNumber?.trim();

    if (!name || !mobileNo) {
      message.error("Profile details missing. Please log in again.");
      return;
    }

    setIsLoading(true);
    try {
      await dispatch(getgenerateToken({ name, mobileNo }));
    } catch (error) {
      console.error("Failed to generate token:", error);
      message.error("Could not generate token. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token?.tokenNo) {
    return (
      <div className="token-card token-card--empty">
        <button
          type="button"
          className="token-btn"
          onClick={handleGenerateToken}
          disabled={isLoading}
          aria-label="Generate token"
        >
          <img src={generateTokenImg} alt="Generate token" />
          <span className="token-btn__text">
            {isLoading ? "Generating..." : "Tap to get your token"}
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="token-card">
      <div className="token-card__glow" />
      <p className="token-card__label">Now Serving</p>
      <h1 className="token-card__number">
        #{String(token.tokenNo).padStart(3, "0")}
      </h1>
      <div className="token-card__divider" />
      <p className="token-card__name">{token.status}</p>
      <p className="token-card__label">{token.userName}</p>
    </div>
  );
}

export default TokenCard;