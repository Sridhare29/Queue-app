import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

function TokenCard() {
  const token = useSelector(
    (state: RootState) => state.generateToken.generateToken
  );

  if (!token.tokenNo) {
    return (
      <div className="token-card token-card--empty">
        <p>No token generated yet</p>
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
      <p className="token-card__name">{token.name}</p>
    </div>
  );
}

export default TokenCard;