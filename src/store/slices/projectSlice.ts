import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TProject } from "@/types/projects";

type ProjectState = {
  projects: TProject[];
  loading: boolean;
  error: string | null;
};

const initialState: ProjectState = {
  projects: [],
  loading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setProjects: (state, action: PayloadAction<TProject[]>) => {
      state.projects = action.payload;
      state.loading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    addProject: (state, action: PayloadAction<TProject>) => {
      state.projects.push(action.payload);
    },
  },
});

export const { setLoading, setProjects, setError, addProject } =
  projectSlice.actions;

export default projectSlice.reducer;
