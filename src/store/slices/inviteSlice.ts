import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TInvite } from "@/types/invite";

type InviteState = {
  invites: TInvite[];
  loading: boolean;
  error: string | null;
};

const initialState: InviteState = {
  invites: [],
  loading: false,
  error: null,
};

const inviteSlice = createSlice({
  name: "invites",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setInvites: (state, action: PayloadAction<TInvite[]>) => {
      state.invites = action.payload;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addInvite: (state, action: PayloadAction<TInvite>) => {
      state.invites.push(action.payload);
    },
  },
});

export const { setLoading, setInvites, setError, addInvite } =
  inviteSlice.actions;

export default inviteSlice.reducer;
