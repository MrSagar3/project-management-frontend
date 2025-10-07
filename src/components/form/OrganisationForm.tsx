import { useFormik } from "formik";
import PhoneInput, { CountryData } from "react-phone-input-2";
import { useOutletContext, useNavigate } from "react-router-dom";

import "react-phone-input-2/lib/style.css";

import { Heading } from "./Heading";

import {
  PrimaryButton,
  PrimaryInput,
  PrimaryTextArea,
  UploadImage,
  PrimarySelect,
  PrimaryLabel,
} from "@/components";
import { statusOptions } from "@/components/form/SelectStatusOption";
import { useStoreOrganizationMutation } from "@/services/endpoints/organizationEndpoints";
import { FormProps, TAppContextType } from "@/types/components";
import { appendFormData } from "@/utils/appendFormData";
import { showToast } from "@/utils/showToast";
import { validationSchema } from "@/validation";
import { validationSchemaOrg } from "@/validation/organization";

const orgFormSchema = validationSchema
  .pick(["address", "email", "phone", "logo", "status"])
  .concat(validationSchemaOrg.pick(["name"]));

export const OrganisationForm = ({ setOpen }: FormProps) => {
  const navigate = useNavigate();
  const { setLoading } = useOutletContext<TAppContextType>();
  const [storeOrganization] = useStoreOrganizationMutation();

  const orgFormInitialValue = {
    name: "",
    address: "",
    email: "",
    phone: "",
    logo: null,
    status: "1",
  };

  const handleAddOrganisation = async (
    values: typeof orgFormInitialValue,
    resetForm: () => void,
  ) => {
    setLoading(true);
    try {
      const formData = new FormData();
      appendFormData(formData, {
        name: values.name,
        address: values.address,
        email: values.email,
        phone: values.phone,
        status: parseInt(values.status, 10),
        logo: values.logo,
      });

      const response = await storeOrganization(formData);
      if (response.data) {
        showToast({
          type: "success",
          message: "Organisation created successfully.",
        });
        resetForm();
        setOpen(false);
        navigate("/dashboard");
      }

      if (response?.error && "data" in response.error && response.error.data) {
        const errorData = response.error.data as { message: string };
        showToast({ type: "error", message: `${errorData.message}` });
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
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: orgFormInitialValue,
    validationSchema: orgFormSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values: typeof orgFormInitialValue) => {
      await handleAddOrganisation(values, resetForm);
    },
  });

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
      <div className="flex items-center justify-center  relative">
        <div className=" bg-white rounded-lg w-full">
          <Heading headingText="Add an organisation" />
          <form onSubmit={handleSubmit} className="flex flex-col gap-[21px]">
            <div className="flex flex-col gap-[5px]">
              <PrimaryLabel id="name" labelText="Organisation Name" />
              <PrimaryInput
                id="name"
                name="name"
                placeholder="Name "
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={errors.name}
                touched={touched.name}
              />
              {errors.name && touched.name && (
                <p className="text-red-500 text-[12px]">{errors.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-[5px]">
              <PrimaryLabel id="address" labelText="Organisation Address" />
              <PrimaryTextArea
                id="address"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.address}
                error={errors.address}
                touched={touched.address}
              />
              {errors.address && touched.address && (
                <p className="text-red-500 text-[12px]">{errors.address}</p>
              )}
            </div>
            <div className="flex flex-col gap-[5px]">
              <PrimaryLabel id="email" labelText="Organisation Email" />
              <PrimaryInput
                id="email"
                name="email"
                placeholder="Email "
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email}
                touched={touched.email}
              />
              {errors.email && touched.email && (
                <p className="text-red-500 text-[12px]">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col gap-[5px]">
              <PrimaryLabel id="select" labelText="Organisation Status" />
              <PrimarySelect
                id="select"
                options={statusOptions}
                value={values.status}
                onChange={(value) => setFieldValue("status", value)}
                placeholder="Select one"
                error={errors.status}
                touched={touched.status}
              />
              {touched.status && errors.status && (
                <div className="text-red-500 text-[12px]">{errors.status}</div>
              )}
            </div>
            <div className="flex flex-col gap-[5px]">
              <PrimaryLabel id="phone" labelText="Organisation Phone" />
              <PhoneInput
                inputProps={{
                  name: "phone",
                }}
                country="np"
                placeholder="Phone"
                onlyCountries={["np", "nl"]}
                value={values.phone}
                onChange={(value, data) => {
                  handlePhoneInput(value, data);
                }}
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
                  borderRadius: "0px",
                  overflowY: "hidden",
                }}
                countryCodeEditable={false}
              />
              {errors.phone && touched.phone && (
                <p className="text-red-500 text-[12px]">{errors.phone}</p>
              )}
            </div>
            <div>
              <div className="relative">
                <UploadImage
                  accept={{
                    "image/jpeg": [],
                    "image/png": [],
                  }}
                  maxSize={1024 * 1024}
                  onDrop={handleLogoDrop}
                  file={values.logo}
                />
                {errors.logo && touched.logo && (
                  <p className="text-red-500 text-[12px]">{errors.logo}</p>
                )}
              </div>
            </div>
            <PrimaryButton
              children="Add"
              className="bg-secondary-gray"
              type="submit"
            />
          </form>
        </div>
      </div>
    </>
  );
};
