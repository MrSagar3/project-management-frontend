import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";

import ProfileLayout from "./ProfileLayout";
import { AddOrganization } from "../form/AddOrganization";
import AddProject from "../form/AddProject";

import {
  LoadingMessage,
  PrimarySelect,
  ProjectButton,
  SidebarButton,
} from "@/components";
import {
  useGetOrganizationsQuery,
  useGetProjectsByOrganizationQuery,
} from "@/services/endpoints/organizationEndpoints";
import { RootState } from "@/store";
import {
  setSelectedOrganization,
  setProjects,
} from "@/store/slices/organizationSlice";
import { TAppContextType } from "@/types";
import { LOGO_NAME } from "@/utils/constant";
import { menuItems } from "@/utils/sidebarMenu";

const Sidebar = () => {
  const { setLoading } = useOutletContext<TAppContextType>();
  const navigate = useNavigate();
  const location = useLocation();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const dispatch = useDispatch();
  const userToken = useSelector((state: RootState) => state.auth.token);
  const [searchParams] = useSearchParams();
  const urlOrgId = searchParams.get("org");

  const { data: organizations, isLoading: isLoadingOrganizations } =
    useGetOrganizationsQuery();
  const selectedOrganization = useSelector(
    (state: RootState) => state.organizations.selectedOrganization,
  );

  const { data: projects, isLoading: isLoadingProjects } =
    useGetProjectsByOrganizationQuery(
      {
        organizationId: selectedOrganization?.id?.toString() || "",
        userToken: userToken || "",
      },
      { skip: !selectedOrganization || !userToken },
    );

  const [prevOrgCount, setPrevOrgCount] = useState(organizations?.length || 0);
  useEffect(() => {
    if (organizations?.length) {
      const prevSelectedOrgId = selectedOrganization?.id;

      const urlSelectedOrg = organizations.find(
        (org) => org.id.toString() === urlOrgId,
      );
      if (urlSelectedOrg) {
        dispatch(setSelectedOrganization(urlSelectedOrg));
        setPrevOrgCount(organizations.length);
        return;
      }
      if (organizations.length > prevOrgCount) {
        const newOrg = organizations[organizations.length - 1];
        dispatch(setSelectedOrganization(newOrg));
        setPrevOrgCount(organizations.length);
        return;
      }
      const prevSelectedOrg = organizations.find(
        (org) => org.id === prevSelectedOrgId,
      );
      const activeOrg = organizations.find((org) => org.status === 1);
      const orgToSelect = prevSelectedOrg || activeOrg || organizations[0];

      dispatch(setSelectedOrganization(orgToSelect));
      setPrevOrgCount(organizations.length);
    }
  }, [organizations, dispatch]);

  useEffect(() => {
    if (projects) {
      dispatch(setProjects(projects));
    }
  }, [projects, dispatch]);

  useEffect(() => {
    if (!isLoadingOrganizations && !isLoadingProjects) {
      setLoading(false);
    }
  }, [projects, isLoadingOrganizations, isLoadingProjects, setLoading]);

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      setLoading(true);
      navigate(path);
    }
  };

  return (
    <div className="bg-white border-r shadow-sm sticky top-0 flex flex-col w-60 md:max-w-[20rem] lg:max-w-[15rem]0 xl:w-80 h-screen transition-all duration-300">
      <div className="px-6 md:px-4 py-5 pb-3">
        <button
          onClick={() => handleNavigation("/dashboard")}
          className="text-xl font-bold text-blue-600 hover:text-blue-800 md:block md:text-2xl">
          &lt;{LOGO_NAME}&gt;
        </button>
      </div>

      <div className="px-6 md:px-4 pt-6">
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-bold text-gray-700  md:block">
            ORGANISATIONS
          </label>
          <AddOrganization />
        </div>

        <div className="relative   md:block">
          {isLoadingOrganizations ? (
            <LoadingMessage message="Loading organisations..." />
          ) : organizations?.length ? (
            <PrimarySelect
              id="organization-select"
              options={organizations.map((org) => ({
                value: org.id.toString(),
                label: (
                  <div className="flex items-center w-[250px]">
                    <div className=" w-6 h-6 mr-2  rounded-full border border-gray-300 overflow-hidden flex-shrink-0">
                      <img
                        src={org.logo}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                      {org.name}
                    </div>
                  </div>
                ),
              }))}
              value={selectedOrganization?.id?.toString() || ""}
              onChange={(value) => {
                const orgId = Number(value);
                const selectedOrg = organizations.find(
                  (org) => org.id === orgId,
                );
                setLoading(true);
                if (selectedOrg) {
                  dispatch(setSelectedOrganization(selectedOrg));
                  handleNavigation("/dashboard");
                }
              }}
              placeholder="Select an organization"
              className="w-full h-[44px] pl-12 p-2 border rounded-md"
            />
          ) : (
            <LoadingMessage message="No organizations found." />
          )}
        </div>
      </div>

      <nav className="px-8  md:px-8 pt-6 space-y-4">
        {menuItems.map((item) => (
          <SidebarButton
            key={item.path}
            onClick={() => handleNavigation(item.path)}
            path={item.path}
            icon={item.icon}
            label={item.label}
            activePath={location.pathname}
          />
        ))}
      </nav>

      <div className="px-6 md:px-4 pt-8">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-gray-700  md:block">
            PROJECTS
          </label>
          <AddProject />
        </div>
      </div>

      <div className="pl-8 pr-5 md:px-8 md:pr-5 pt-3">
        <div
          className={`space-y-4 ${showAllProjects ? "overflow-y-auto" : ""}`}
          style={{
            maxHeight: showAllProjects ? "calc(98vh - 32rem)" : "auto",
          }}>
          {isLoadingProjects ? (
            <LoadingMessage message="Loading projects..." />
          ) : projects && projects.length > 0 ? (
            projects
              .slice(0, showAllProjects ? projects.length : 3)
              .map((item: any) => (
                <ProjectButton
                  key={item.id}
                  onClick={() => handleNavigation(`/projects/${item.id}`)}
                  path={`/projects/${item.id}`}
                  color={item.color}
                  label={item.title}
                  activePath={location.pathname}
                />
              ))
          ) : (
            <LoadingMessage message="No projects found." />
          )}

          {projects && projects.length > 3 && !showAllProjects && (
            <button
              onClick={() => setShowAllProjects(true)}
              className="flex text-gray-600  hover:underline">
              <MoreHorizontal />
              <span className="px-2">More</span>
            </button>
          )}
        </div>
      </div>

      <div className="mt-auto p-2">
        <ProfileLayout />
      </div>
    </div>
  );
};

export default Sidebar;
