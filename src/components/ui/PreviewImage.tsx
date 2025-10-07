import { useState, useEffect } from "react";

import { TPreviewImage } from "@/types/components";

export const PreviewImage = ({
  file,
  className,
  previewDivClassname,
  imageUrl,
}: TPreviewImage) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview(imageUrl as string);
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [file, imageUrl]);

  return (
    <div
      className={`h-[120px] w-[130px] bg-gray-50 border border-gray-200 border-dashed rounded-lg overflow-hidden ${previewDivClassname} hover:cursor-pointer`}>
      {preview ? (
        <img
          src={preview}
          alt="logo"
          className={`h-full w-full ${className}`}
        />
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <p>Preview</p>
        </div>
      )}
    </div>
  );
};
