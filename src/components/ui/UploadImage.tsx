import { useDropzone } from "react-dropzone";

import { PreviewImage } from "./PreviewImage";

import { TUploadImageProps } from "@/types/components";

export const UploadImage = ({
  accept,
  maxSize,
  onDrop,
  className,
  file,
  imageUrl,
  previewDivClassname,
}: TUploadImageProps) => {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
    useDropzone({
      accept,
      maxSize,
      onDrop: (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
          onDrop(acceptedFiles[0]);
        } else {
          onDrop(null);
        }
      },
    });

  return (
    <div className="flex items-center gap-5">
      <div {...getRootProps()} className="cursor-pointer">
        <input {...getInputProps()} hidden />
        <PreviewImage
          file={file}
          imageUrl={imageUrl}
          previewDivClassname={previewDivClassname}
        />
      </div>

      <div className="flex flex-col">
        <div>
          <p className="font-semibold">Organisation logo</p>
          <p className="text-sm text-gray-600">JPG, PNG, or JPEG, max 1MB</p>
        </div>

        <div {...getRootProps()} className="mt-2 cursor-pointer">
          <p
            className={`bg-secondary-gray text-white px-[15px] py-[5px] rounded-[4px] font-[500px] w-fit text-[14px] ${className} `}>
            Upload
          </p>
        </div>

        {acceptedFiles.length > 0 && (
          <ul className="text-sm text-gray-700 mt-1 w-[250px] break-words">
            {acceptedFiles.map((file) => (
              <li key={file.name}>{file.name}</li>
            ))}
          </ul>
        )}

        {fileRejections.length > 0 && (
          <div className="text-red-500 text-xs mt-1">
            {fileRejections.map(({ file }) => (
              <div key={file.name}>
                <p>{file.name}:</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
