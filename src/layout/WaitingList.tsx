import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { WaitingToken } from "../Api/Waiting/waiting.api";
import { getWaitingTokens } from "../state/action/waiting.Action";
import type { RootState } from "../state/store";

function WaitingList() {
  const dispatch = useDispatch<any>();
  const waitingTokens = useSelector(
    (state: RootState) => state.generateToken.waitingTokens as WaitingToken[]
  );

  useEffect(() => {
    dispatch(getWaitingTokens()).catch(() => undefined);
  }, [dispatch]);

  return (
    <section className="waiting-list" aria-labelledby="waiting-list-title">
      <div className="waiting-list__header">
        <div>
          <p className="waiting-list__eyebrow">Queue overview</p>
          <h2 id="waiting-list-title">Waiting tokens</h2>
        </div>
        <span className="waiting-list__count">{waitingTokens.length} waiting</span>
      </div>

      {waitingTokens.length === 0 ? (
        <p className="waiting-list__empty">There are no tokens waiting.</p>
      ) : (
        <div className="waiting-list__table-wrap">
          <table className="waiting-list__table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Token</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {waitingTokens.map((waitingToken) => (
                <tr key={waitingToken.id}>
                  <td className="waiting-list__position">{waitingToken.positionInQueue}</td>
                  <td className="waiting-list__token">{waitingToken.tokenNo}</td>
                  <td>{waitingToken.userName}</td>
                  <td><span className="waiting-list__status">{waitingToken.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default WaitingList;