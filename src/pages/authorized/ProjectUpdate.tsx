import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  PrimaryButton,
  PrimaryTextArea,
  PrimaryInput,
  PrimarySelect,
  DatePicker,
  ColorPicker,
  Header,
} from "@/components";
import { PrimaryLabel } from "@/components";
import { statusOptions } from "@/components/form/SelectStatusOption";
import { useGetProjectByIdQuery } from "@/services/endpoints/projectEndpoints";
import { useUpdateProjectMutation } from "@/services/endpoints/projectEndpoints";
import { TAppContextType } from "@/types";
import { generateSlug } from "@/utils/generateSlug";
import { showToast } from "@/utils/showToast";
import { validationSchema } from "@/validation";
const projectValidationSchema = validationSchema.pick([
  "title",
  "slug",
  "description",
  "status",
  "color",
  "deadline",
]);

const ProjectUpdate = () => {
  const { setLoading } = useOutletContext<TAppContextType>();
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { data: project, isLoading } = useGetProjectByIdQuery(projectId!, {
    skip: !projectId,
  });
  const [, setIsFormReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setLoading(false);
    }
  }, [isLoading, project]);

  const [updateProject] = useUpdateProjectMutation();

  const initialValues = {
    title: project?.title ?? "",
    slug: project?.slug ?? "",
    description: project?.description ?? "",
    status: project?.status ?? "",
    color: project?.color ?? "#000000",
    deadline: project?.deadline
      ? new Date(project.deadline).toLocaleDateString()
      : null,
  };

  const handleProjectSubmit = async (values: typeof initialValues) => {
    const updatedValues = {
      ...values,
      organization_id: project?.organization_id,
      status: Number(values.status),
    };

    setLoading(true);
    try {
      const response = await updateProject({
        id: projectId,
        updatedData: updatedValues,
      });

      if (response.data) {
        showToast({ type: "success", message: "Project updated successfully" });
        navigate("/dashboard");
      }
      if (response?.error && "data" in response.error && response.error.data) {
        const errorData = response.error.data as { message: string };
        showToast({ type: "error", message: `${errorData.message}` });
      }
    } catch (error) {
      showToast({
        type: "error",
        message: "Something error occurred when updating... ! Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: projectValidationSchema,
    onSubmit: handleProjectSubmit,
  });

  useEffect(() => {
    if (project) {
      setIsFormReady(true);
      setValues(project);
    }
  }, [project]);

  useEffect(() => {
    const slug = generateSlug(values.title);
    setFieldValue("slug", slug);
  }, [values.title, setFieldValue]);

  useEffect(() => {
    if (!isLoading && !project) {
      navigate("/dashboard");
    }
  }, [isLoading, project, navigate]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <Header
          title={project?.title}
          description="Update your project details here."
        />
        <div className="flex gap-4">
          <PrimaryButton
            children="Cancel"
            className="text-secondary-gray bg-white hover:bg-background"
            onClick={() => {
              navigate("/dashboard");
            }}
          />
          <PrimaryButton
            children="Update"
            className="w-fit"
            type="button"
            onClick={() => {
              handleSubmit();
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 mt-6 px-5 ">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-4 border-b">
          <div className="sm:col-span-2 flex items-center">
            <PrimaryLabel labelText="Title" id="title" />
          </div>
          <div className="sm:col-span-7">
            <PrimaryInput
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter project title"
              error={errors.title}
              touched={touched.title}
              className="bg-white"
            />
            {touched.title && errors.title && (
              <p className="text-red-500 text-[12px]">{errors.title}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-4 border-b">
          <div className="sm:col-span-2 flex items-center">
            <PrimaryLabel labelText="Slug" id="slug" />
          </div>
          <div className="sm:col-span-7">
            <PrimaryInput
              id="slug"
              name="slug"
              value={values.slug}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter project slug"
              error={errors.slug}
              touched={touched.slug}
              className="bg-white"
            />
            {touched.slug && errors.slug && (
              <p className="text-red-500 text-[12px]">{errors.slug}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-4 border-b">
          <div className="sm:col-span-2 flex items-center">
            <PrimaryLabel labelText="Description" id="description" />
          </div>
          <div className="sm:col-span-7">
            <PrimaryTextArea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.description}
              touched={touched.description}
              placeholder="Enter project description"
              className="bg-white"
            />
            {touched.description && errors.description && (
              <p className="text-red-500 text-[12px]">{errors.description}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-4 border-b">
          <div className="sm:col-span-2 flex items-center">
            <PrimaryLabel labelText="Choose Color" id="color" />
          </div>
          <div className="sm:col-span-7">
            <ColorPicker
              color={values.color}
              onChange={(color) => setFieldValue("color", color)}
            />
            {touched.color && errors.color && (
              <p className="text-red-500 text-[12px]">{errors.color}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-4 border-b">
          <div className="sm:col-span-2 flex items-center">
            <PrimaryLabel labelText="Choose Status" id="status" />
          </div>
          <div className="sm:col-span-7">
            <PrimarySelect
              id="status"
              options={statusOptions}
              value={String(values.status)}
              onChange={(value) => setFieldValue("status", value)}
              error={errors.status}
              touched={touched.status}
              className="bg-white"
            />
            {touched.status && errors.status && (
              <p className="text-red-500 text-[12px]">{errors.status}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 pb-4">
          <div className="sm:col-span-2 flex items-center">
            <PrimaryLabel labelText="Deadline" id="deadline" />
          </div>
          <div className="sm:col-span-7">
            <DatePicker
              label="Choose a date"
              value={values.deadline ? new Date(values.deadline) : undefined}
              onChange={(date: Date | null) => {
                if (date) {
                  const localDate = new Date(
                    date.getTime() - date.getTimezoneOffset() * 60000,
                  );
                  setFieldValue(
                    "deadline",
                    localDate.toISOString().split("T")[0],
                  );
                } else {
                  setFieldValue("deadline", null);
                }
              }}
              error={Boolean(errors.deadline && touched.deadline)}
              touched={touched.deadline}
            />
            {touched.deadline && errors.deadline && (
              <p className="text-red-500 text-[12px]">{errors.deadline}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProjectUpdate;
