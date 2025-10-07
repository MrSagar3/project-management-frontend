import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TOrganization } from "@/types/organization";
import { TProject } from "@/types/project";

type OrganizationState = {
  organizations: TOrganization[];

  selectedOrganization: TOrganization | null;
  projects: TProject[] | null;
};

const initialState: OrganizationState = {
  organizations: [],
  selectedOrganization: null,
  projects: null,
};

const organizationSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
    setOrganizations: (state, action: PayloadAction<TOrganization[]>) => {
      state.organizations = action.payload;
    },
    setSelectedOrganization: (
      state,
      action: PayloadAction<TOrganization | null>,
    ) => {
      state.selectedOrganization = action.payload;
    },
    clearSelectedOrganization: (state) => {
      state.selectedOrganization = null;
    },

    setProjects: (state, action: PayloadAction<TProject[]>) => {
      state.projects = action.payload;
    },
    clearProjects: (state) => {
      state.projects = null;
    },
  },
});

export const {
  setOrganizations,
  setSelectedOrganization,
  clearSelectedOrganization,
  setProjects,
  clearProjects,
} = organizationSlice.actions;

export default organizationSlice.reducer;
