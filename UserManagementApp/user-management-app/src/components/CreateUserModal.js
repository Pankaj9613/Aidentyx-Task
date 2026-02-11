import { useState } from "react";
import { createUser } from "../api/userApi";

function CreateUserModal({ show, close }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!show) return null;

  const save = () => {

    // validation
    if (!username || !password) {
      setError("Username and Password are required");
      return;
    }

    createUser({
      username,
      password
    })
      .then(() => {
        setUsername("");
        setPassword("");
        setError("");
        close();
      })
      .catch(() => {
        setError("Failed to create user");
      });
  };

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h3>Create New User</h3>

        {error && (
          <p style={{ color: "red", fontSize: "14px" }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <div className="modal-buttons">

          <button
            className="btn btn-success"
            onClick={save}
          >
            Save User
          </button>

          <button
            className="btn btn-danger"
            onClick={close}
          >
            Cancel
          </button>

        </div>

      </div>

    </div>

  );

}

export default CreateUserModal;
