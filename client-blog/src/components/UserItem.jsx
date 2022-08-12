import { useState } from "react";
import { deleteUserApi, updateUserApi } from "../helpers/apiCalls";
import { useDataContext } from "../context/DataProvider";
import { MdSaveAlt } from "react-icons/md";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";

export const UserItem = ({ user }) => {
  // import variable from context and rename to other variable using :
  // => this prevents conflict with prop "user" which has the same name
  const { user: userLoggedIn, users, setUsers } = useDataContext();
  const [userCopy, setUserCopy] = useState(user);
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    console.log(userCopy);
    console.log(e.target.value);
    // create copy before state update and update in one step
    const updated = { ...userCopy, [e.target.name]: e.target.value };
    setUserCopy(updated);
  };

  const submitUpdate = async () => {
    // send updated user (not saved yet) => to API!
    const userUpdatedApi = await updateUserApi(
      userLoggedIn.token,
      userCopy._id,
      userCopy
    );
    console.log({ userUpdatedApi });

    setEditMode(false);

    // if API saving / updating worked => update user also in Context

    // find user that we updated in our context by id
    // if found => REPLACE by the user from API
    // all other users => dont touch!
    const usersCopy = users.map((_user) => {
      return _user._id === userUpdatedApi._id ? userUpdatedApi : _user;
    });

    setUsers(usersCopy);
  };

  const handleDelete = async () => {
    const response = await deleteUserApi(userLoggedIn.token, user._id);
    console.log("User deleted at API:", response);

    // delete user from frontend state too!
    const usersCopy = users.filter((_user) => {
      return _user._id !== userCopy._id;
    });
    setUsers(usersCopy);
  };

  return (
    <div className="user" key={user._id}>
      {editMode ? (
        // EDIT MODE => input fields + save button
        <div className="edit">
          <input
            className="name"
            name="username"
            value={userCopy.username}
            onChange={handleChange}
          />
          <input
            className="email"
            value={userCopy.email}
            onChange={handleChange}
          />
          <MdSaveAlt className="save" onClick={submitUpdate} />
        </div>
      ) : (
        // view / display mode
        <div className="item">
          <div className="avatar">
            <img
              style={{ width: "30px", borderRadius: "50%" }}
              src={user.avatar}
            />
          </div>
          <div className="name">{userCopy.username}</div>
          <div className="email">{userCopy.email}</div>
        </div>
      )}
      {/* TOGGLE Edit mode by btton */}
      {/* <div className="icons">
          <AiTwotoneEdit className="icon" onClick={() => setEditMode(!editMode)}/>
          <AiFillDelete className="icon" onClick={() => handleDelete()}/>
        </div> */}
    </div>
  );
};
