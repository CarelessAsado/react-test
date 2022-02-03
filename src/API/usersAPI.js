import axios from "./axios";
import {
  beginFetchingAllUsers,
  successFetchingAllUsers,
  failureFetchingAllUsers,
  begindeleteUser,
  successdeleteUser,
  failuredeleteUser,
  beginupdateUser,
  successupdateUser,
  failureupdateUser,
  beginPostNewUser,
  successPostNewUser,
  failurePostNewUser,
  beginFetchingOneUser,
  successFetchingOneUser,
  failureFetchingOneUser,
} from "../REDUX/usersSlice";

const fetchAllUsers = async (dispatch) => {
  dispatch(beginFetchingAllUsers());
  try {
    const { data } = await axios.get("/");
    dispatch(successFetchingAllUsers(data));
    return;
  } catch (error) {
    dispatch(failureFetchingAllUsers(error.message));
  }
};
/*-----------------POST NEW USER---------------------------*/
const postNewUser = async (dispatch, newUser, cb) => {
  dispatch(beginPostNewUser());
  try {
    setTimeout(() => {
      dispatch(successPostNewUser(newUser));
      cb(false);
    }, 2000);
    /*FAKE API CALL*/
    /* const { data } = await axios.post(url, newUser); */
  } catch (error) {
    dispatch(failurePostNewUser(error.message));
  }
};

/*-------------------GET SINGLE USER-----------------*/
const getSingleUser = async (dispatch, id) => {
  dispatch(beginFetchingOneUser());
  try {
    const { data } = await axios.get("/");
    const user = data.find((i) => i.id === Number(id));
    if (!user) {
      throw Error("No user found");
    }
    dispatch(successFetchingOneUser(user));
    return user;
  } catch (error) {
    dispatch(failureFetchingOneUser(error.message));
  }
};
const deleteSingleUser = async (dispatch, id, cb) => {
  dispatch(begindeleteUser());
  try {
    setTimeout(() => {
      dispatch(successdeleteUser(id));
      cb(false);
    }, 2000);
    /*FAKE API CALL*/
    /* const { data } = await axios.delete(url, { id: id }); */
  } catch (error) {
    dispatch(failuredeleteUser(error.message));
  }
};
const updateUser = async (dispatch, userToUpdate, navigate) => {
  dispatch(beginupdateUser());
  try {
    setTimeout(() => {
      dispatch(successupdateUser(userToUpdate));
      return navigate("/admin");
    }, 4000);
    /*FAKE API CALL*/
    /* const { data } = await axios.put(url, userToUpdate); */
  } catch (error) {
    dispatch(failureupdateUser(error.message));
  }
};
export {
  fetchAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateUser,
  postNewUser,
};
