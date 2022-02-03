import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleUser, updateUser } from "../API/usersAPI";
import { inputData } from "../components/inputData";
import { InputForm } from "../components/InputForm";
import { failureupdateUser } from "../REDUX/usersSlice";

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isUpdating, errorUpd, isFetching, errorOneUser, users } = useSelector(
    (state) => state.users
  );
  const [singleUser, setSingleUser] = useState({
    name: "",
    email: "",
    id: "",
    address: { city: "" },
  });
  function handleChangeInput(e) {
    const name = e.target.name;
    if (name === "city") {
      return setSingleUser({
        ...singleUser,
        address: { ...singleUser.address, [name]: e.target.value },
      });
    }
    setSingleUser({ ...singleUser, [name]: e.target.value });
  }
  /*---------------------GET SINGLE USER API CALL----------------------*/
  useEffect(() => {
    const getUsers = async () => {
      try {
        const user = await getSingleUser(dispatch, id);
        setSingleUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [id, dispatch]);
  /*-----------------------SUBMIT UPDATE----------------------------------------------*/
  const submitUpdate = (e) => {
    e.preventDefault();
    const { name, email, id: Id } = singleUser;
    const errorArray = [];
    if (
      users.some((user) => user.id === Number(Id) && Number(Id) !== Number(id))
    ) {
      errorArray.push(`Id no. ${Id} is already taken by another user. `);
    }
    if (!name || !email) {
      errorArray.push("Email or name cannot be empty. ");
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      errorArray.push("Must provide valid email. ");
    }
    errorArray.length > 0
      ? dispatch(failureupdateUser(errorArray.join(" ")))
      : updateUser(dispatch, singleUser, navigate);
  };

  return (
    <section id="editPageContainer">
      <header>
        <h1>User editor</h1>
      </header>
      {errorOneUser && (
        <div className="errorMessage">{errorOneUser}. Try again later.</div>
      )}
      {isFetching && <div className="loadingMessage">Loading user...</div>}{" "}
      {isFetching ||
        (errorOneUser ? undefined : (
          <form className="editForm">
            {inputData.map((input) => (
              <InputForm
                {...input}
                value={
                  input.id === "city"
                    ? singleUser.address[input.id]
                    : singleUser[input.id]
                }
                handleChangeInput={handleChangeInput}
                key={input.id}
              />
            ))}
            {errorUpd && <div className="errorMessage">{errorUpd}</div>}
            <div className="confirmOrCancelSection">
              <input
                type="submit"
                value={isUpdating ? "Updating..." : "Confirm"}
                onClick={submitUpdate}
                disabled={isUpdating}
              />
              <Link to="/admin">
                <button className="cancelEdit" disabled={isUpdating}>
                  {isUpdating ? "Updating..." : "Cancel"}
                </button>
              </Link>
            </div>
          </form>
        ))}
    </section>
  );
};
