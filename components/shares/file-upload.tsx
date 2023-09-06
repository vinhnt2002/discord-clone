"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  endpoint: "serverImage" | "serverMessage";
  value: string;
  onChange: (url?: string) => void;
}
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

export const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  value,
  onChange,
}) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image src={value} alt="upload" fill className="rounded-full" />

        <button
          onClick={() => onChange("")}
          type="button"
          className="bg-rose-500 rounded-full p-1 text-white absolute top-0 right-0 shadow-sm"
        >
          <X className="h-4 w-4"/>
        </button>
      </div>
    );
  }

  

  return (
    <UploadDropzone
    endpoint={endpoint}
    onClientUploadComplete={(res) => {
      onChange(res?.[0].url);
    }}
    onUploadError={(error: Error) => {
      console.log(error);
    }}
  />
  );
};
