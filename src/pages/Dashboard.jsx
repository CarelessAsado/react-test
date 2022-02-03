import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteSingleUser, fetchAllUsers, deleteAll } from "../API/usersAPI";
import { sortAlphabetically } from "../Utils/sortAlphabetically";
import { AddDeletePopUp } from "../components/AddOrDeleteUserPopUp";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { isFetching, users, error } = useSelector((state) => state.users);
  const [showOverlay, setshowOverlay] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filter, setFilter] = useState("");
  /*-----------------FETCH ALL USERS------------------*/
  useEffect(() => {
    const getUsers = async () => {
      fetchAllUsers(dispatch);
    };
    getUsers();
  }, [dispatch]);
  /*--------------DELETE SINGLE USER-----------------*/
  async function handleDelete(id) {
    await deleteSingleUser(dispatch, id, setshowOverlay);
  }
  /*--------------------FILTER--------------------------*/
  const handleFilter = (e) => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    setFilteredUsers(sortAlphabetically(users, filter));
  }, [filter, users]);
  /*----------------------------------------------------*/

  return (
    <>
      {showOverlay === "Add" && (
        <AddDeletePopUp setshowOverlay={setshowOverlay} />
      )}
      {typeof showOverlay === "number" && (
        <AddDeletePopUp
          setshowOverlay={setshowOverlay}
          showOverlay={showOverlay}
          erase
          handleDelete={handleDelete}
        />
      )}
      <section id="dashboard">
        <header>
          <h1>Dashboard</h1>
        </header>

        <main>
          <div className="userHeader">
            <h4>UserList</h4>
            {!error && (
              <div className="functionality">
                <div className="filterSection">
                  <label htmlFor="filters">ORDER USERS</label>
                  <select
                    id="filters"
                    onChange={handleFilter}
                    defaultValue={""}
                  >
                    <option value="">No filter</option>
                    <option value="a-z">A -- Z</option>
                    <option value="z-a">Z -- A</option>
                  </select>
                </div>

                <button
                  className="addUserBtn"
                  onClick={() => setshowOverlay("Add")}
                >
                  Add user
                </button>
              </div>
            )}
          </div>

          <div className="tableColumns">
            <div className="column">id</div>
            <div className="column">Name</div>
            <div className="column">Username</div>
            <div className="column">Email</div>
            <div className="column">City</div>
            <div className="column">Edit</div>
            <div className="column">Delete</div>
          </div>
          {isFetching && <div className="loadingMessage">Loading...</div>}
          {error && (
            <div className="errorMessage">{error}. Try again later.</div>
          )}
          {isFetching || error || users.length > 0 ? (
            filteredUsers.map((user) => {
              const {
                id,
                name,
                email,
                username = "No info",
                address: { city = "No info" },
              } = user;
              return (
                <div className="userRow" key={id}>
                  <div className="row">{id}</div>
                  <div className="row">{name}</div>
                  <div className="row">{username}</div>
                  <div className="row">{email}</div>
                  <div className="row">{city}</div>

                  <div className="row">
                    <Link to={`/admin/edit/${id}`}>
                      <button className="btn edit">edit</button>
                    </Link>
                  </div>

                  <div className="row">
                    <button
                      className="btn delete"
                      onClick={() => setshowOverlay(id)}
                    >
                      delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>No users at the moment</h2>
          )}
          <button className="deleteAllBtn" onClick={() => deleteAll(dispatch)}>
            Delete all users
          </button>
        </main>
      </section>
    </>
  );
};
