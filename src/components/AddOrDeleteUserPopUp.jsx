import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { postNewUser } from "../API/usersAPI";
import { failurePostNewUser } from "../REDUX/usersSlice";
import { InputForm } from "./InputForm";
import { addNewUser } from "./inputData";

export const AddDeletePopUp = ({
  erase,
  setshowOverlay,
  handleDelete,
  showOverlay,
}) => {
  const dispatch = useDispatch();
  const { isDeleting, errorD, errorPosting, isFetching } = useSelector(
    (state) => state.users
  );
  const [inputNewUser, setInputNewUser] = useState({});
  /*------------VALIDATION + API CALL TO POST NEW USER---------------------*/
  function submitNewUser(e) {
    e.preventDefault();
    const { name, username, email, city } = inputNewUser;
    if (!name || !email) {
      return dispatch(
        failurePostNewUser("Email or name can't be empty values.")
      );
    }
    const newUser = { name, username, email, address: { city } };
    postNewUser(dispatch, newUser, setshowOverlay);
  }
  /*---------------INPUT HANDLING------------------------------------*/
  function handleChangeInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setInputNewUser({ ...inputNewUser, [name]: value });
  }
  /*------------------------------------------------------*/
  if (erase) {
    return (
      <section id="confirmDeletePopUp">
        <div className="deleteUserPopUp">
          <div className="closeIcon" onClick={() => setshowOverlay(false)}>
            <CloseIcon sx={{ fontSize: 40 }} />
          </div>
          <h2>Are you sure you want to delete this user?</h2>

          <div className="bannerBorrarUser">
            This action is not reversible. The user and their data will be
            erased.
          </div>
          <div className="confirmOrCancelSection">
            <button
              id="confirmarDelete"
              onClick={() => handleDelete(showOverlay)}
            >
              {isDeleting ? "deleting..." : "Confirm"}
            </button>
            <button
              className="cancelEdit"
              onClick={() => setshowOverlay(false)}
            >
              {isDeleting ? "deleting..." : "Cancel"}
            </button>
          </div>
          {errorD && <div className="errorMessage">{errorD}</div>}
        </div>
      </section>
    );
  }
  return (
    <section id="addUserPageContainer">
      <div className="addUserFormAndHeader">
        <div className="closeIcon" onClick={() => setshowOverlay(false)}>
          <CloseIcon sx={{ fontSize: 40 }} />
        </div>

        <header>
          <h1>Add user</h1>
        </header>
        <form className="addUserForm">
          {addNewUser.map((input) => (
            <InputForm
              key={input.id}
              {...input}
              handleChangeInput={handleChangeInput}
            ></InputForm>
          ))}
          {errorPosting && <div className="errorMessage">{errorPosting}</div>}
          <div className="confirmOrCancelSection">
            <input
              type="submit"
              value={isFetching ? "Loading..." : "Confirm"}
              onClick={submitNewUser}
              disabled={isFetching}
            />
            <button
              className="cancelEdit"
              onClick={() => setshowOverlay(false)}
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Cancel"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
