import React from "react";
import { Link } from "react-router-dom";
import avatar from "../../assets/img/avatar.png";
import useAuth from "../../hooks/useAuth";
import useUser from "../../hooks/useUser";
import { profileImagePath } from "../../api/client";

const Navbar = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <div className="navbar bg-base-100 shadow-sm shadow-gray-200">
      {/* Navbar logo */}
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          budgetApp
        </Link>
      </div>
      {/* Navbar links */}
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex="0" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  user?.profileImage
                    ? `${profileImagePath}${user.profileImage}`
                    : avatar
                }
              />
            </div>
          </label>
          <ul
            tabIndex="0"
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/budget">Budget</Link>
            </li>
            <li>
              <button onClick={signOut}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
