import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TMember } from "@/types";

type MemberState = {
  members: TMember[];
  loading: boolean;
  error: string | null;
};

const initialState: MemberState = {
  members: [],
  loading: false,
  error: null,
};

const memberSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setMembers: (state, action: PayloadAction<TMember[]>) => {
      state.members = action.payload;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setMembers, setError } = memberSlice.actions;

export default memberSlice.reducer;
