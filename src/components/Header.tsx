function Header() {
  return (
    <div className="app-shell">
      <div className="app-header">
        <p className="eyebrow">KANINI QUEUE</p>
        <div className="header-actions">
          <button className="button-user" onClick={() => console.log('Token button clicked')}>
            + Token
          </button>
          <div className="api-status">
            <span className="status-dot" /> Active
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
