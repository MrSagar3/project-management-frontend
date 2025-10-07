import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Calendar1 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
  Legend,
} from "recharts";

import { PrimarySelect } from "@/components";
import { Header } from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectSection } from "@/components/ui/ProjectSection";
import {
  useGetAllProjectsOrganizationQuery,
  useGetAllTasksProjectQuery,
  useGetOrganizationMembersQuery,
  useGetOrganizationTasksQuery,
  useGetAllTasksOrgQuery,
} from "@/services/endpoints/homeEndpoints";
import { RootState } from "@/store";
import { TAppContextType } from "@/types";
import {
  TOranizationTasks,
  TMembers,
  TProject,
  PieChartDataItem,
  TaskStatus,
} from "@/types/dashboard";
import { TASKS_NAME_MAP, STATUS_TO_NAME_MAP } from "@/utils/constant";
import { timeRemaining } from "@/utils/timeRemaining";

const initialPieChart: PieChartDataItem[] = [
  { name: "Backlog", value: 0, fill: "#8884d8" },
  { name: "In progress", value: 0, fill: "#82ca9d" },
  { name: "Todo", value: 0, fill: "#ffc658" },
  { name: "In review", value: 0, fill: "#ff7300" },
  { name: "Done", value: 0, fill: "#359de8" },
];

const Home = () => {
  const navigate = useNavigate();
  const { setLoading } = useOutletContext<TAppContextType>();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [pieChartData, setPieChartData] = useState(initialPieChart);

  const organization_id = useSelector(
    (state: RootState) => state.organizations?.selectedOrganization?.id,
  );
  const organizationName = useSelector(
    (state: RootState) => state.organizations?.selectedOrganization?.name,
  );
  const {
    data: organizationTaskData,
    error: organizationTaskError,
    isLoading: organizationTaskLoading,
  } = useGetOrganizationTasksQuery(organization_id, {
    skip: !organization_id,
  });
  const {
    data: organizationMembersData,
    error: organizationMembersError,
    isLoading: organizationMembersLoading,
  } = useGetOrganizationMembersQuery(organization_id, {
    skip: !organization_id,
  });
  const {
    data: organizationProjectsData,
    error: organizationProjectsError,
    isLoading: organizationProjectsLoading,
  } = useGetAllProjectsOrganizationQuery(organization_id, {
    skip: !organization_id,
  });

  const { data: projectTasksData, isLoading: projectTasksLoading } =
    useGetAllTasksProjectQuery(selectedProject, {
      skip: !selectedProject,
    });
  const { data: OrgTasksData, isLoading: allTasksOrgLoading } =
    useGetAllTasksOrgQuery(organization_id, {
      skip: !organization_id,
    });

  useEffect(() => {
    if (
      !organizationTaskLoading &&
      !organizationMembersLoading &&
      !organizationProjectsLoading &&
      !projectTasksLoading &&
      !allTasksOrgLoading
    ) {
      setLoading(false);
    }
  }, [
    organizationTaskLoading,
    organizationMembersLoading,
    organizationProjectsLoading,
    projectTasksLoading,
    allTasksOrgLoading,
  ]);

  useEffect(() => {
    if (selectedProject && projectTasksData?.data.length) {
      const updatedPieChart = initialPieChart.map((item) => ({ ...item }));
      projectTasksData.data.forEach((task: { status: TaskStatus }) => {
        const statusName = STATUS_TO_NAME_MAP[task.status];
        if (statusName) {
          const chartItem = updatedPieChart.find(
            (item) => item.name === statusName,
          );
          if (chartItem) chartItem.value++;
        }
      });

      setPieChartData(updatedPieChart);
    } else {
      setPieChartData(initialPieChart);
    }
  }, [selectedProject, projectTasksData]);

  useEffect(() => {
    if (organizationProjectsData && organizationProjectsData.data.length > 0) {
      setSelectedProject(organizationProjectsData.data[0].id.toString());
    }
  }, [organizationProjectsData]);

  if (
    organizationTaskError &&
    organizationMembersError &&
    organizationProjectsError
  )
    return <div>An unknown error has occured</div>;
  if (
    !organizationTaskData ||
    !organizationMembersData ||
    !organizationProjectsData
  )
    return;

  const tasksData: TOranizationTasks = organizationTaskData;
  const membersData: TMembers = organizationMembersData;
  const totalMembers = membersData.data.length;
  const allOrgTask = OrgTasksData?.data || [];
  const organizationProjects: TProject[] = organizationProjectsData.data.map(
    (project: TProject) => ({
      id: project.id,
      title: project.title,
      color: project.color,
    }),
  );

  return (
    <main className=" mx-auto ">
      <Header
        title={organizationName}
        description="View all of your tasks here"
      />
      {/* // TASKS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 min-[1260px]:grid-cols-5 gap-5 mb-6">
        {Object.entries(tasksData).map(([key, value]) => (
          <Card
            key={key}
            className="shadow-none  rounded-[6px] border-[1px] bg-[#FFFFFF]">
            <CardContent className="p-5">
              <div className="flex flex-col space-y-[10px]">
                <p className="text-[13px] text-gray-500">
                  {TASKS_NAME_MAP[key]}
                </p>
                <div className="flex justify-between items-end">
                  <p className="text-[40px] font-[200] leading-none">{value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="relative">
        <div className="grid-layout min-[1100px]:fb-grid-layout">
          {/*  MEMBERS SECTION */}
          <Card className="area-member gap-5 p-5 bg-[#FFFFFF] shadow-none  rounded-[6px] border-[1px] ">
            <CardHeader className="p-0 mb-5">
              <div className="flex justify-between items-center ">
                <CardTitle className="text-base font-normal">
                  Members - {totalMembers}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="mb-5 flex items-center">
                {membersData.data.map(
                  (member, index) =>
                    index < 3 && (
                      <Avatar
                        key={index}
                        className="w-8 h-8 text-white bg-[#9F9F9F] rounded-full  flex justify-center items-center">
                        <AvatarImage src="" />
                        <AvatarFallback className="text-[14px]">
                          {member.name.slice(0, 1).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ),
                )}
                <p className="ml-[16px]">
                  Total {totalMembers} {totalMembers > 1 ? "members" : "member"}
                </p>
              </div>

              <Button
                variant="secondary"
                className="w-full bg-[#4D4D4D] text-[#FFFFFF]"
                onClick={() => navigate("/members")}>
                View Members
              </Button>
            </CardContent>
          </Card>
          {/*  STATUS OVERVIEW SECTION */}
          <Card className="area-status  bg-[#FFFFFF] shadow-none  rounded-[6px] border-[1px] p-5">
            <CardHeader className="p-0 mb-[3px]">
              <div className="flex justify-between items-center gap-[76px]">
                <CardTitle className="text-base font-normal">
                  Status Overview
                </CardTitle>

                <PrimarySelect
                  id="project"
                  placeholder="Select a project"
                  value={
                    !selectedProject ? "Select a project" : selectedProject
                  }
                  onChange={(value: string) => {
                    setSelectedProject(value);
                  }}
                  options={organizationProjects.map((project) => ({
                    value: project.id.toString(),
                    label: project.title,
                  }))}
                  selectValue={
                    selectedProject
                      ? organizationProjects?.find(
                          (project) =>
                            project.id.toString() === selectedProject,
                        )?.title || "Select Project"
                      : "Select Project"
                  }
                  className="w-[200px]"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0 w-full">
              <ResponsiveContainer width="100%" height={250}>
                {!projectTasksData?.data.length || !selectedProject ? (
                  <div className="w-full h-full flex justify-center items-center">
                    No tasks found to show the status
                  </div>
                ) : (
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={pieChartData}
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}>
                      <Label
                        position="center"
                        fontSize="14"
                        fontWeight="medium"
                        content={({ viewBox }: any) => {
                          const { cx, cy } = viewBox;
                          return (
                            <>
                              <text
                                x={cx}
                                y={cy - 10}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="20"
                                fontWeight="medium">
                                {projectTasksData?.data.length}
                              </text>
                              <text
                                x={cx}
                                y={cy + 15}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                fontSize="14"
                                fill="#888">
                                Total Issues
                              </text>
                            </>
                          );
                        }}
                      />
                      {pieChartData.map((item, index) => (
                        <>
                          <Cell key={`cell-${index}`} fill={item.fill} />
                        </>
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      verticalAlign="middle"
                      align="right"
                      layout="vertical"
                      iconSize={15}
                      iconType="square"
                    />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </CardContent>
          </Card>
          {/*  RECENT TASKS SECTION */}
          <Card className="area-tasks shadow-none p-5 rounded-[6px] border-[1px] bg-[#FFFFFF]">
            <CardHeader className="p-0 mb-5">
              <CardTitle className="text-base font-normal">
                Recent Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[450px] p-0">
              {allOrgTask
                .slice(-6)
                .sort(
                  (a: { id: number }, b: { id: number }) =>
                    Number(b.id) - Number(a.id),
                )
                .map((task: any) => (
                  <div
                    key={task.id}
                    className="space-y-[5px] p-[15px] pt-[10px] ">
                    <div className="text-[16px] text-[#000000] font-[500]">
                      {task.title}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="w-[240px] truncate">
                        {task.description}
                      </span>
                      <div className="flex flex-row w-30 ">
                        <Calendar1
                          className={`w-3 h-3 mx-2 ${timeRemaining(task.due_date) === "The due date has passed!" ? "text-red-500" : "text-black"}`}
                        />
                        <span
                          className={
                            timeRemaining(task.due_date) ===
                            "The due date has passed!"
                              ? "text-red-500"
                              : "text-black"
                          }>
                          {timeRemaining(task.due_date)}
                        </span>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
            </CardContent>
          </Card>

          <ProjectSection organizationProjects={organizationProjects} />
        </div>
      </div>
    </main>
  );
};

export default Home;
