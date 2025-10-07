import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import TagsInput from "./TagsInput";
import TaskComments from "./TaskComments";

import { DatePicker } from "@/components/ui/DatePicker";
import { Label } from "@/components/ui/label";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { PrimaryInput } from "@/components/ui/PrimaryInput";
import { PrimarySelect } from "@/components/ui/PrimarySelect";
import { Textarea } from "@/components/ui/textarea";
import { useViewMembersByOrganizationQuery } from "@/services/endpoints/memberEndpoints";
import { useGetProjectsByOrgQuery } from "@/services/endpoints/organizationEndpoints";
import { useGetTagsQuery } from "@/services/endpoints/tagEndpoints";
import {
  useStoreTasksMutation,
  useUpdateIndividualTaskMutation,
  useViewTasksQuery,
} from "@/services/endpoints/tasksEndpoints";
import { RootState } from "@/store";
import { TAppContextType } from "@/types";
import { TaskFormProps } from "@/types/components";
import { TTag } from "@/types/tag";
import { generateNextDayDate } from "@/utils/generateInitialDate";
import { formatDateToYMD } from "@/utils/getCurrentDate";
import { showToast } from "@/utils/showToast";
import {
  taskValidationSchema,
  taskValidationSchemaWithProject,
} from "@/validation";

const STATUS_OPTIONS = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "Todo" },
  { value: "in-progress", label: "In progress" },
  { value: "in-review", label: "In review" },
  { value: "done", label: "Done" },
];

const TaskForm = ({ id, status, setOpen }: TaskFormProps) => {
  const userId = useSelector((state: RootState) => state.auth.user.id);
  const [storeTasks] = useStoreTasksMutation();
  const [updateTasks] = useUpdateIndividualTaskMutation();

  const { setLoading } = useOutletContext<TAppContextType>();
  useEffect(() => {
    if (id) {
      setLoading(true);
    }
  }, [id]);

  const organizationId = useSelector(
    (state: RootState) => state.organizations?.selectedOrganization?.id,
  );
  const { data: individualTask, isLoading } = useViewTasksQuery(id, {
    skip: !id,
  });

  const { data: members, isLoading: loadingMembers } =
    useViewMembersByOrganizationQuery(organizationId, {
      skip: !organizationId,
    });

  const { data: fetchedTags } = useGetTagsQuery(
    {
      taskId: individualTask?.id,
    },
    { skip: !individualTask?.id },
  );

  const [tags, setTags] = useState<TTag[]>([]);
  const memberOptions =
    members?.map((member) => ({
      value: String(member.id),
      label: member.name,
    })) || [];

  const { data: projects } = useGetProjectsByOrgQuery(
    {
      organizationId: organizationId,
      userToken: localStorage.getItem("token"),
    },
    { skip: !organizationId },
  );

  useEffect(() => {
    if (fetchedTags) {
      setTags(fetchedTags);
    }
  }, [fetchedTags, setTags]);

  const projectOptions =
    projects?.map((project) => ({
      value: String(project.id),
      label: project.title,
    })) || [];

  const initialValue = {
    title: "",
    description: "",
    status,
    dueDate: generateNextDayDate(),
    assignedTo: "",
    tags: "",
    comment: "",
    projectId: "",
    assignee_name: "",
    assigner_name: "",
  };

  useEffect(() => {
    if (individualTask) {
      setValues({
        title: individualTask.title,
        description: individualTask.description,
        status: individualTask.status,
        dueDate: individualTask.due_date.split("T")[0],
        assignedTo: String(individualTask.assigned_to),
        tags: "",
        comment: "",
        projectId: "",
        assignee_name: individualTask.assignee_name,
        assigner_name: individualTask.assigner_name,
      });
    }
  }, [individualTask]);

  useEffect(() => {
    if (!isLoading && individualTask && !loadingMembers && members) {
      setLoading(false);
    }
  }, [isLoading, individualTask, loadingMembers, members]);

  const handleAddTask = async (values: typeof initialValue) => {
    setLoading(true);
    try {
      const taskData = {
        title: values.title,
        description: values.description,
        project_id: Number(values.projectId),
        status: values.status,
        due_date: values.dueDate,
        order: 1,
        assigned_by: userId,
        assigned_to: Number(values.assignedTo),
        tags: tags.map((tag) => tag.label),
      };
      const response = await storeTasks(taskData);

      if ("data" in response) {
        showToast({
          type: "success",
          message: "Task Created Successfully.",
        });
        setOpen(false);
      }

      if ("error" in response) {
        showToast({
          type: "error",
          message:
            (response.error as any)?.data?.message || "Error updating task",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (values: typeof initialValue) => {
    setLoading(true);
    try {
      const taskData = {
        title: values.title,
        description: values.description,
        project_id: individualTask?.project_id,
        status: values.status,
        due_date: values.dueDate,
        order: 1,
        assigned_to: Number(values.assignedTo),
        tags: tags.map((tag) => tag.label),
      };

      const response = await updateTasks({
        id: individualTask?.id,
        taskData: taskData,
      });

      if ("data" in response) {
        showToast({
          type: "success",
          message: "Task Updated Successfully.",
        });
        setOpen(false);
      }

      if ("error" in response) {
        showToast({
          type: "error",
          message:
            (response.error as any)?.data?.message || "Error updating task",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: initialValue,
    validationSchema: id
      ? taskValidationSchema
      : taskValidationSchemaWithProject,
    onSubmit: async (values: typeof initialValue) => {
      id ? handleUpdateTask(values) : handleAddTask(values);
    },
  });

  return (
    <>
      <div className="flex items-center justify-center relative">
        <div className="rounded-lg w-full">
          <form className=" bg-white p-4 " onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {!id ? (
                  <>
                    <div>
                      <Label>Project</Label>
                      <PrimarySelect
                        id="project"
                        value={String(values.projectId)}
                        onChange={(value) => setFieldValue("projectId", value)}
                        options={projectOptions}
                        error={errors.projectId}
                        touched={touched.projectId}
                      />
                      {errors.projectId && touched.projectId && (
                        <div className="text-red-500 text-[12px]">
                          {errors.projectId}
                        </div>
                      )}
                    </div>
                    <div>
                      <Label>Status</Label>
                      <PrimarySelect
                        id="status"
                        value={values.status}
                        onChange={(value) => setFieldValue("status", value)}
                        options={STATUS_OPTIONS}
                        error={errors.status}
                        touched={touched.status}
                      />
                      {errors.status && touched.status && (
                        <div className="text-red-500 text-[12px]">
                          {errors.status}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="col-span-2">
                    <Label>Status</Label>
                    <PrimarySelect
                      id="status"
                      value={values.status}
                      onChange={(value) => setFieldValue("status", value)}
                      options={STATUS_OPTIONS}
                      error={errors.status}
                      touched={touched.status}
                    />
                    {errors.status && touched.status && (
                      <div className="text-red-500 text-[12px]">
                        {errors.status}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div>
                <PrimaryInput
                  id="title"
                  name="title"
                  placeholder="Task Title"
                  value={values.title}
                  onChange={handleChange}
                  error={errors.title}
                  touched={touched.title}
                  className="w-full"
                />
                {errors.title && touched.title && (
                  <div className="text-red-500 text-[12px]">{errors.title}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Assigned to</Label>
                  <PrimarySelect
                    id="assignedTo"
                    value={String(values.assignedTo)}
                    onChange={(value) => setFieldValue("assignedTo", value)}
                    options={memberOptions}
                    error={errors.assignedTo}
                    touched={touched.assignedTo}
                  />
                  {errors.assignedTo && touched.assignedTo && (
                    <div className="text-red-500 text-[12px]">
                      {errors.assignedTo}
                    </div>
                  )}
                </div>

                <div>
                  <Label>Due Date</Label>
                  <DatePicker
                    label="date"
                    value={new Date(values.dueDate)}
                    onChange={(date: Date | null) => {
                      setFieldValue(
                        "dueDate",
                        date ? formatDateToYMD(date) : null,
                      );
                    }}
                    className="w-full border-secondary-gray rounded-[3px]"
                  />
                </div>
              </div>

              <div>
                <TagsInput
                  tags={tags}
                  setTags={setTags}
                  taskId={individualTask?.id!}
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Task description"
                  value={values.description}
                  onChange={(e) => setFieldValue("description", e.target.value)}
                  className="min-h-[100px] w-full border-secondary-gray"
                />
              </div>

              <div className="flex justify-end mt-4">
                <PrimaryButton type="submit">
                  {id ? "Update " : "Add "}
                </PrimaryButton>
              </div>
              <div className="mt-4">
                <TaskComments
                  taskId={individualTask?.id!}
                  currentUserId={userId}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default TaskForm;
