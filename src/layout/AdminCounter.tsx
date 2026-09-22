import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { services } from "../Api";
import type { WaitingToken } from "../Api/Waiting/waiting.api";
import { getWaitingTokens } from "../state/action/waiting.Action";
import type { RootState } from "../state/store";

function AdminCounter() {
  const dispatch = useDispatch<any>();

  const waitingTokens = useSelector(
    (state: RootState) => state.generateToken.waitingTokens as WaitingToken[]
  );

  const [selectedToken, setSelectedToken] = useState<WaitingToken | null>(null);
  const [activeToken, setActiveToken] = useState<WaitingToken | null>(null);
  const [counterId, setCounterId] = useState("1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const refreshQueue = () => dispatch(getWaitingTokens());

  useEffect(() => {
    refreshQueue();
  }, []);

  const onSelectToken = (token: WaitingToken) => {
    setSelectedToken(token);
    setError("");
  };

  const handleCallNext = async (token: WaitingToken) => {
    const counter = Number(counterId);

    if (counter < 1) {
      setError("Enter a valid counter ID.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await services.queueApi.callNext(
        token.tokenNo,
        counter
      );
      console.log("Call next response:", response.data);
      setActiveToken(response.data || token);
      setSelectedToken(null);
      await refreshQueue();
    } catch {
      setError(`Unable to call token ${token.tokenNo}.`);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async () => {
    if (!activeToken) return;

    setLoading(true);
    setError("");

    try {
      await services.queueApi.complete(
        activeToken.tokenNo,
      );

      setActiveToken(null);
      await refreshQueue();
    } catch {
      setError(`Unable to complete token ${activeToken.tokenNo}.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App admin-app">
      <header className="admin-header app-shell">
        <div>
          <p className="eyebrow">KANINI QUEUE / ADMIN</p>
          <h1>Counter control</h1>
          <p className="admin-header__description">
            Move waiting visitors through the counter.
          </p>
        </div>

        <Link className="admin-header__back" to="/">
          Public queue
        </Link>
      </header>

      <main className="admin-content">
        <section
          className="admin-active"
          aria-labelledby="active-token-title"
        >
          <p className="waiting-list__eyebrow">Current counter</p>

          <h2 id="active-token-title">Now serving</h2>

          <label className="admin-counter-id">
            Counter ID
            <input
              type="number"
              min="1"
              step="1"
              value={counterId}
              onChange={(e) => setCounterId(e.target.value)}
            />
          </label>

          {activeToken ? (
            <>
              <p className="admin-active__state">Currently serving</p>

              <p className="admin-active__token">
                {activeToken.tokenNo}
              </p>

              <p className="admin-active__name">
                {activeToken.userName}
              </p>

              <button
                className="admin-action admin-action--complete"
                type="button"
                onClick={handleComplete}
                disabled={loading}
              >
                {loading ? "Completing..." : "Complete token"}
              </button>
            </>
          ) : selectedToken ? (
            <>
              <p className="admin-active__state">Ready to call</p>

              <p className="admin-active__token">
                {selectedToken.tokenNo}
              </p>

              <p className="admin-active__name">
                {selectedToken.userName}
              </p>

              <button
                className="admin-action"
                type="button"
                onClick={() => handleCallNext(selectedToken)}
                disabled={loading}
              >
                {loading ? "Calling..." : "Call next"}
              </button>
            </>
          ) : (
            <p className="admin-active__empty">
              Select a waiting token to call it to the counter.
            </p>
          )}
        </section>

        <section
          className="admin-queue waiting-list"
          aria-labelledby="admin-queue-title"
        >
          <div className="waiting-list__header">
            <div>
              <p className="waiting-list__eyebrow">
                Queue management
              </p>

              <h2 id="admin-queue-title">
                Waiting queue
              </h2>
            </div>

            <span className="waiting-list__count">
              {waitingTokens.length} waiting
            </span>
          </div>

          {error && (
            <p className="admin-error" role="alert">
              {error}
            </p>
          )}

          {waitingTokens.length === 0 ? (
            <p className="waiting-list__empty">
              There are no tokens waiting.
            </p>
          ) : (
            <div className="waiting-list__table-wrap">
              <table className="waiting-list__table">
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Token</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {waitingTokens.map((token) => (
                    <tr key={token.id}>
                      <td className="waiting-list__position">
                        {token.positionInQueue}
                      </td>

                      <td className="waiting-list__token">
                        {token.tokenNo}
                      </td>

                      <td>{token.userName}</td>

                      <td>
                        <span className="waiting-list__status">
                          {token.status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="admin-action"
                          type="button"
                          onClick={() => onSelectToken(token)}
                          disabled={loading || activeToken !== null}
                        >
                          {selectedToken?.id === token.id ? "Selected" : "Select"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminCounter;