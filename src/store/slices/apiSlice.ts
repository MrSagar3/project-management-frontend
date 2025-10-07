import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "@/config/apiConfig";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [
    "Organizations",
    "Projects",
    "Tasks",
    "Comments",
    "Tags",
    "Members",
    "Invites",
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  endpoints: () => ({}),
});
