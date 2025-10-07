import { useFormik } from "formik";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import { Heading } from "./Heading";

import {
  PrimaryButton,
  PrimaryTextArea,
  PrimaryInput,
  PrimarySelect,
  ColorPicker,
  DatePicker,
} from "@/components";
import { PrimaryLabel } from "@/components";
import { statusOptions } from "@/components/form/SelectStatusOption";
import { useStoreProjectMutation } from "@/services/endpoints/projectEndpoints";
import { RootState } from "@/store";
import { TAppContextType } from "@/types";
import { FormProps } from "@/types/components";
import { generateHexColor } from "@/utils/generateHexColor";
import { generateNextDayDate } from "@/utils/generateInitialDate";
import { generateSlug } from "@/utils/generateSlug";
import { formatDateToYMD } from "@/utils/getCurrentDate";
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

const ProjectForm = ({ setOpen }: FormProps) => {
  const navigate = useNavigate();
  const { setLoading } = useOutletContext<TAppContextType>();
  const [storeProject] = useStoreProjectMutation();
  const organization_id = useSelector(
    (state: RootState) => state.organizations?.selectedOrganization?.id,
  );

  const created_by = useSelector((state: RootState) => state.auth.user.id);

  const initialValues = {
    title: "",
    slug: "",
    description: "",
    status: "1",
    color: generateHexColor(),
    deadline: generateNextDayDate(),
  };

  const handleProjectSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        organization_id,
        created_by,
        status: parseInt(values.status, 10),
      };

      const response = await storeProject(formData);

      if (response.data) {
        showToast({ type: "success", message: "Project added successfully" });
        setOpen(false);
        navigate("/dashboard");
      }

      if (response?.error && "data" in response.error && response.error.data) {
        const errorData = response.error.data as { message: string };
        showToast({
          type: "error",
          message: `${errorData.message}`,
        });
      }
    } catch (error: any) {
      showToast({
        type: "error",
        message: "Oops... something went wrong",
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
  } = useFormik({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: projectValidationSchema,
    onSubmit: handleProjectSubmit,
  });

  useEffect(() => {
    const slug = generateSlug(values.title);
    setFieldValue("slug", slug);
  }, [values.title, setFieldValue]);

  return (
    <>
      <div className="flex items-center justify-center  font-[12px] relative">
        <div className="rounded-lg w-full">
          <Heading headingText="Add project" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full">
              <PrimaryLabel labelText="Project title" id="title" />
              <PrimaryInput
                id="title"
                name="title"
                value={values.title}
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                error={errors.title}
                touched={touched.title}
                placeholder="Enter project name"
              />

              {touched.title && errors.title && (
                <p className="text-red-500 text-[12px]">{errors.title}</p>
              )}
            </div>

            <div className="w-full">
              <PrimaryLabel labelText="Project slug" id="slug" />
              <PrimaryInput
                id="slug"
                name="slug"
                value={values.slug}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter project slug"
                error={errors.title}
                touched={touched.title}
              />
              {touched.slug && errors.slug && (
                <p className="text-red-500 text-[12px]">{errors.slug}</p>
              )}
            </div>

            <div className="w-full">
              <PrimaryLabel labelText="Project description" id="description" />
              <PrimaryTextArea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.description}
                touched={touched.description}
                placeholder="Enter project description"
              />
              {touched.description && errors.description && (
                <p className="text-red-500 text-[12px]">{errors.description}</p>
              )}
            </div>

            <div className="w-full">
              <PrimaryLabel labelText="Choose color" id="color" />
              <ColorPicker
                color={values.color}
                onChange={(color) => setFieldValue("color", color)}
              />
              {touched.color && errors.color && (
                <p className="text-red-500 text-[12px] mt-1">{errors.color}</p>
              )}
            </div>

            <div className="w-full">
              <PrimaryLabel labelText="Choose status" id="select" />
              <PrimarySelect
                id="select"
                options={statusOptions}
                value={values.status}
                onChange={(value) => setFieldValue("status", value)}
                error={errors.status}
                touched={touched.status}
                placeholder="Select one"
              />
              {touched.status && errors.status && (
                <p className="text-red-500 text-[12px]">{errors.status}</p>
              )}
            </div>

            <div className="w-full">
              <PrimaryLabel labelText="Deadline" id="deadline" />
              <div className="w-full">
                <DatePicker
                  label="Choose deadline"
                  value={
                    values.deadline ? new Date(values.deadline) : undefined
                  }
                  onChange={(date: Date) => {
                    setFieldValue("deadline", formatDateToYMD(date));
                  }}
                  error={Boolean(errors.deadline && touched.deadline)}
                  touched={touched.deadline}
                />
              </div>
              {touched.deadline && errors.deadline && (
                <p className="text-red-500 text-[12px]">{errors.deadline}</p>
              )}
            </div>

            <div className="w-full">
              <PrimaryButton className="w-full" type="submit">
                Add
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProjectForm;
