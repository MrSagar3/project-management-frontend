export const appendFormData = (
  formData: FormData,
  data: Record<string, any>,
): FormData => {
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  return formData;
};
