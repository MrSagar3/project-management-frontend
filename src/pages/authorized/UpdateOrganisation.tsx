import { useFormik } from "formik";
import { useEffect, useState } from "react";
import PhoneInput, { CountryData } from "react-phone-input-2";
import { useSelector } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom";

import "react-phone-input-2/lib/style.css";
import {
  PrimaryButton,
  PrimaryInput,
  PrimaryTextArea,
  UploadImage,
  PrimarySelect,
  PrimaryLabel,
  Header,
} from "@/components";
import { statusOptions } from "@/components/form/SelectStatusOption";
import {
  useUpdateOrganizationMutation,
  useViewOrganizationByIdQuery,
} from "@/services/endpoints/organizationEndpoints";
import { RootState } from "@/store";
import { TAppContextType } from "@/types";
import { appendFormData } from "@/utils/appendFormData";
import { showToast } from "@/utils/showToast";
import { validationSchema } from "@/validation";
import { validationSchemaOrg } from "@/validation/organization";

const orgFormSchema = validationSchema
  .pick(["address", "email", "phone", "status"])
  .concat(validationSchemaOrg.pick(["name"]));

export const UpdateOrganisation = () => {
  const { setLoading } = useOutletContext<TAppContextType>();
  const navigate = useNavigate();
  const [updateOrganization] = useUpdateOrganizationMutation();
  const organizationDetail = useSelector(
    (state: RootState) => state.organizations?.selectedOrganization,
  );

  const { data: organization, isLoading } = useViewOrganizationByIdQuery(
    organizationDetail?.id,
  );

  useEffect(() => {
    if (!isLoading && organization) {
      setLoading(false);
    }
  }, [isLoading, organization]);

  const orgFormInitialValue = {
    name: organization?.name || "",
    address: organization?.address || "",
    email: organization?.email || "",
    phone: organization?.phone || "",
    logo: null,
    status: organization?.status || "",
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setValues,
  } = useFormik({
    initialValues: orgFormInitialValue,
    validationSchema: orgFormSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: typeof orgFormInitialValue) => {
      await handleUpdate(values);
    },
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (organization) {
      setValues({
        ...organization,
        logo: null,
      });
      setImageUrl(organization.logo);
    }
  }, [organization]);

  const handleUpdate = async (values: typeof orgFormInitialValue) => {
    setLoading(true);
    try {
      const formData = new FormData();
      appendFormData(formData, {
        name: values.name,
        address: values.address,
        email: values.email,
        phone: values.phone,
        status: Number(values.status),
        logo: values.logo,
      });
      formData.append("_method", "PUT");
      const response = await updateOrganization({
        id: organizationDetail?.id,
        updatedData: formData,
      });

      if (response.data) {
        showToast({
          type: "success",
          message: "Organization Updated Successfully.",
        });
      }
      if (response?.error && "data" in response.error && response.error.data) {
        const errorData = response.error.data as { message: string };
        showToast({ type: "error", message: `${errorData.message}` });
      }
    } catch (error) {
      showToast({
        type: "error",
        message: "Something went wrong ! please try again",
      });
    } finally {
      navigate("/dashboard");
      setLoading(false);
    }
  };

  const handleLogoDrop = (file: File | null) => {
    setFieldValue("logo", file);
  };

  const handlePhoneInput = (value: string, data: CountryData | {}) => {
    if ("dialCode" in data) {
      const countryCode = data.dialCode;
      const phoneWithoutCountryCode = value.slice(data.dialCode.length);
      setFieldValue("phone", "+" + countryCode + "-" + phoneWithoutCountryCode);
    }
  };

  return (
    <>
      <div className="flex items-center pb-2 border-b mb-5">
        <Header
          title={organization?.name}
          description="Update your organisation details here."
        />
        <div className="flex gap-2 ml-auto">
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
            type="submit"
            onClick={() => handleSubmit()}
          />
        </div>
      </div>

      <form className="space-y-6 px-5">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4 border-b items-center">
          <PrimaryLabel labelText=" Logo" id="logo" className="sm:col-span-3" />
          <div className="sm:col-span-7 flex gap-5 items-center">
            <div className="flex flex-col gap-1 w-2/3">
              <div className="relative">
                <UploadImage
                  accept={{
                    "image/jpeg": [],
                    "image/png": [],
                  }}
                  maxSize={1024 * 1024}
                  onDrop={handleLogoDrop}
                  file={values.logo}
                  imageUrl={imageUrl}
                  previewDivClassname="border-gray-400"
                />
                {errors.logo && touched.logo && (
                  <p className="text-red-500 text-[12px]">{errors.logo}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4 border-b items-center">
          <PrimaryLabel labelText="Name" id="name" className="sm:col-span-3" />
          <div className="sm:col-span-7">
            <PrimaryInput
              id="name"
              name="name"
              placeholder="Name"
              type="text"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={errors.name}
              touched={touched.name}
              className="bg-white"
            />
            {errors.name && touched.name && (
              <div className="text-red-500 text-[12px]">{errors.name}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4 border-b items-center">
          <PrimaryLabel
            labelText="Address"
            id="address"
            className="sm:col-span-3"
          />
          <div className="sm:col-span-7">
            <PrimaryTextArea
              id="address"
              name="address"
              placeholder="Address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.address}
              touched={touched.address}
              className="bg-white"
            />
            {errors.address && touched.address && (
              <div className="text-red-500 text-[12px]">{errors.address}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4 border-b items-center">
          <PrimaryLabel
            labelText="Email"
            id="email"
            className="sm:col-span-3"
          />
          <div className="sm:col-span-7">
            <PrimaryInput
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              className="bg-white"
            />
            {errors.email && touched.email && (
              <div className="text-red-500 text-[12px]">{errors.email}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-4 border-b items-center">
          <PrimaryLabel
            labelText="Phone"
            id="phone"
            className="sm:col-span-3"
          />
          <div className="sm:col-span-7">
            <PhoneInput
              inputProps={{
                name: "phone",
              }}
              country="np"
              onlyCountries={["np", "nl"]}
              placeholder="Phone"
              value={values.phone}
              onChange={(value, data) => handlePhoneInput(value, data)}
              onBlur={handleBlur}
              inputStyle={{
                width: "100%",
                height: "40px",
                border:
                  errors.phone && touched.phone
                    ? "1px solid #f87171"
                    : "1px solid #4d4d4d",
                borderRadius: "4px",
                boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                paddingTop: "0.25rem",
                paddingBottom: "0.25rem",
                paddingRight: "29px",
              }}
              buttonStyle={{
                border:
                  errors.phone && touched.phone
                    ? "1px solid #f87171"
                    : "1px solid #4d4d4d",
              }}
              dropdownStyle={{
                width: "170px",
                height: "70px",
                overflowY: "hidden",
              }}
              countryCodeEditable={false}
            />
            {errors.phone && touched.phone && (
              <div className="text-red-500 text-[12px]">{errors.phone}</div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 pb-5 items-center">
          <PrimaryLabel
            labelText="Status"
            id="status"
            className="sm:col-span-3"
          />
          <div className="sm:col-span-7">
            <PrimarySelect
              id="status"
              options={statusOptions}
              value={String(values.status)}
              onChange={(value) => setFieldValue("status", value)}
              error={errors.status}
              touched={touched.status}
              placeholder="Select Status"
              className="bg-white"
            />
            {errors.status && touched.status && (
              <div className="text-red-500 text-[12px]">{errors.status}</div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
