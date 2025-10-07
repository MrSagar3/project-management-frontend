import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

import { RoleOptions } from "./RoleOptions";

import {
  PrimaryLabel,
  PrimarySelect,
  PrimaryButton,
  PrimaryInput,
} from "@/components";
import { useStoreInviteMutation } from "@/services/endpoints/inviteEndpoints";
import { RootState } from "@/store";
import { TAppContextType } from "@/types";
import { FormProps } from "@/types/components";
import { showToast } from "@/utils/showToast";
import { validationSchema } from "@/validation";

const invitationValidationSchema = validationSchema.pick(["email"]);

const Invitation = ({ setOpen }: FormProps) => {
  const { setLoading } = useOutletContext<TAppContextType>();
  const [storeInvite] = useStoreInviteMutation();
  const organization_id = useSelector(
    (state: RootState) => state.organizations?.selectedOrganization?.id,
  );

  const initialValues = {
    email: "",
    role: "member",
  };

  const handleInvitationSubmit = async (values: typeof initialValues) => {
    setLoading(true);
    try {
      const formData = {
        ...values,
        organization_id,
      };
      const response = await storeInvite(formData);

      if (response.data) {
        showToast({ type: "success", message: "Invitation sent successfully" });
        setOpen(false);
      }

      if (response?.error && "data" in response.error && response.error.data) {
        const errorData = response.error.data as {
          message: string;
        };
        showToast({ type: "error", message: `${errorData.message}` });
      }
    } catch (error: any) {
      showToast({ type: "error", message: "Oops... something went wrong" });
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
    validationSchema: invitationValidationSchema,
    onSubmit: handleInvitationSubmit,
  });

  return (
    <>
      <div className="flex items-center justify-center font-primary font-[12px] relative">
        <div className="rounded-lg w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <PrimaryLabel labelText="Member email" id="email" />
            <PrimaryInput
              id="email"
              name="email"
              value={values.email}
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.email}
              touched={touched.email}
              placeholder="Enter the email for an invitation"
            />
            {touched.email && errors.email && (
              <p className="text-red-500 text-[12px]">{errors.email}</p>
            )}
            <div className="mt-2">
              <PrimaryLabel labelText="Choose role" id="role" />
            </div>
            <PrimarySelect
              id="select"
              options={RoleOptions}
              value={values.role}
              onChange={(value) => setFieldValue("role", value)}
              error={errors.role}
              touched={touched.role}
              placeholder="Select role"
            />
            {touched.role && errors.role && (
              <p className="text-red-500 text-[12px]">{errors.role}</p>
            )}
            <PrimaryButton className="w-full" type="submit" children="Add" />
          </form>
        </div>
      </div>
    </>
  );
};

export default Invitation;
