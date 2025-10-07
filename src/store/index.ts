import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";

import authReducer from "@/store/slices/authSlice";
import inviteReducer from "@/store/slices/inviteSlice";
import memberReducer from "@/store/slices/memberSlice";
import organizationReducer from "@/store/slices/organizationSlice";
import projectReducer from "@/store/slices/projectSlice";
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    organizations: organizationReducer,
    projects: projectReducer,
    members: memberReducer,
    invites: inviteReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
