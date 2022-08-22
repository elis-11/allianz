import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserList } from "../components/UserList";
import { useDataContext } from "../context/DataProvider";
import { getUsersApi } from "../helpers/apiCalls";
import "../styles/Auth.scss";

export const Dashboard = () => {
  const navigate = useNavigate();
  const inputRef = useRef();

  const { user, users, setUsers, errors, setErrors } = useDataContext();
  const [search, setSearch] = useState("");

  // useEffect
  // fetch me data I dont have so far from backend on LOAD
  // and afterwards store them in context
  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
    // not logged in?
    // stop here / dont load protected data

    // only fetch data if user is there (=logged in)
    const loadData = async () => {
      // get protected data from backend using token
      const result = await getUsersApi(user.token);

      // if error from backend (e.g. no valid token) => show the error in UI
      if (result.error) {
        return setErrors(result.error);
      }

      // store received users in our central data state
      setErrors("");
      setUsers(result);
    };
    loadData();
  }, [user]); // useEffect should just act if user logged in

  const filteredUser = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="Dashboard">
      <h2>Dashboard</h2>
      <div className="search">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            autoFocus
            ref={inputRef}
            id="search"
            type="text"
            role="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>

      {/* DISPLAY LIST OF USERS */}
      <UserList users={filteredUser} />

      {/* SHOW ERRORS */}
      <div className="errors">{errors}</div>
    </div>
  );
};
