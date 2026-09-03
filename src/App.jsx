import './App.css'


function App() {
  return (
    <div className="app-shell">
      <div className="app-header">
        <p className="eyebrow">QUEUE CONTROL</p>
        <button className="button-user">Register User</button>
      </div>
        <div className="api-status">
          <span className="status-dot" /> API connected at Queue
        </div>
        <div className="panel queue-panel"><div className="panel-heading"><div><p className="eyebrow">QUEUE</p><h3>Queue actions</h3></div><button className="button button-quiet" >Refresh list</button></div>
            <div className="action-grid"><button className="action-tile primary-action" ><span className="tile-number">01</span><span><strong>Generate token</strong><small>Add a new visitor to the queue</small></span></button><label className="field compact-field"><span>Counter ID</span><input  placeholder="e.g. 1" /></label><button className="action-tile" ><span className="tile-number">02</span><span><strong>Call next</strong><small>Send the next visitor to a counter</small></span></button></div>
            <div className="token-tools"><label className="field"><span>Token ID</span><input placeholder="Paste a token ID" /></label><div className="button-row"><button className="button button-outline" >Check status</button><button className="button button-dark" >Complete token</button></div></div>
          </div>
          {/* <div className="panel user-panel"><div className="panel-heading"><div><p className="eyebrow">CUSTOMERS</p><h3>User CRUD</h3></div><span className="pill">{users.length} saved</span></div>
            <form className="user-form" onSubmit={submitUser}><label className="field"><span>Full name</span><input required value={userForm.name}  placeholder="Jane Smith" /></label><label className="field"><span>Email address</span><input required type="email" value={userForm.email} onChange={(event) => setUserForm({ ...userForm, email: event.target.value })} placeholder="jane@example.com" /></label><label className="field"><span>Phone number</span><input value={userForm.phone} onChange={(event) => setUserForm({ ...userForm, phone: event.target.value })} placeholder="Optional" /></label><div className="button-row"><button className="button button-dark" type="submit" disabled={loading}>{editingUser ? 'Save changes' : 'Create user'}</button>{editingUser && <button className="button button-quiet" type="button" onClick={() => { setEditingUser(null); setUserForm({ name: '', email: '', phone: '' }) }}>Cancel</button>}</div></form>
            <div className="list-heading"><h4>User list</h4><span>Create through API</span></div><div className="user-list">{users.length === 0 ? <p className="empty-state">Created users will appear here.</p> : users.map((user) => <div className="user-row" key={user.localId}><div className="avatar">{user.name?.charAt(0).toUpperCase()}</div><div><strong>{user.name}</strong><small>{user.email}{user.phone && ` · ${user.phone}`}</small></div><div className="row-actions"><button onClick={() => editUser(user)}>Edit</button><button onClick={() => deleteUser(user.localId)}>Delete</button></div></div>)}</div>
          </div> */}

    </div>
  )
}

export default App
