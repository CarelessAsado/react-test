import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    isFetching: false,
    error: false,
    errorOneUser: false,
    isDeleting: false,
    errorD: false,
    errorPosting: false,
  },
  reducers: {
    beginFetchingAllUsers: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    successFetchingAllUsers: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    failureFetchingAllUsers: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    /*-------------------SINGLE USER------------------*/
    beginFetchingOneUser: (state) => {
      state.isFetching = true;
      state.errorOneUser = false;
    },
    successFetchingOneUser: (state, action) => {
      state.isFetching = false;
      state.users = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
    },
    failureFetchingOneUser: (state, action) => {
      state.isFetching = false;
      state.errorOneUser = action.payload;
    },
    /*--------------------POST USER-------------*/
    beginPostNewUser: (state) => {
      state.isFetching = true;
      state.errorPosting = false;
    },
    successPostNewUser: (state, action) => {
      state.isFetching = false;

      state.users.push({
        ...action.payload,
        id: state.users[state.users.length - 1].id + 1,
      });
    },
    failurePostNewUser: (state, action) => {
      state.isFetching = false;
      state.errorPosting = action.payload;
    },
    /*-----------------------DELETE SINGLE USER ---------------------------*/
    begindeleteUser: (state) => {
      state.isDeleting = true;
      state.errorD = false;
    },
    successdeleteUser: (state, action) => {
      state.isDeleting = false;
      const index = state.users.findIndex((i) => i.id === action.payload);
      state.users.splice(index, 1);
    },
    failuredeleteUser: (state, action) => {
      state.isDeleting = false;
      state.errorD = action.payload;
    },
    /*------------------------------UPDATE  USER------------------------*/
    beginupdateUser: (state) => {
      state.isUpdating = true;
      state.errorUpd = false;
    },
    successupdateUser: (state, action) => {
      state.isUpdating = false;
      const newUsersArray = state.users.map((user) => {
        if (user.id === action.payload.id) {
          return action.payload;
        }
        return user;
      });
      state.users = newUsersArray;
    },
    failureupdateUser: (state, action) => {
      state.isUpdating = false;
      state.errorUpd = action.payload;
    },
  },
});
export const {
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
} = userSlice.actions;
export default userSlice.reducer;
