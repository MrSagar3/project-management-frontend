import { LucideIcon } from "lucide-react";
import React from "react";
import { ReactNode } from "react";

import { ButtonProps } from "@/components/ui/button";
export type TInputProps = {
  id: string;
  name: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password" | "date";
  placeholder?: string;
  className?: string;
  error?: string | null;
  touched?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  showPassword?: boolean;
};
export type TPrimaryButtonProps = ButtonProps & {
  children?: string | React.ReactNode;
};

export type TPrimaryTextareaProps = {
  id: string;
  name: string;
  placeholder: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
  touched?: boolean;
  value: string;
  error?: string | null;
};

type TUploadImageProps = {
  accept: { [key: string]: string[] };
  maxSize: number;
  onDrop: (file: File | null) => void;
  className?: string;
  file?: File | null;
  previewDivClassname?: string;
  imageUrl?: string | null;
};

export type TPreviewImage = {
  className?: string;
  file?: File | null;
  previewDivClassname?: string;
  imageUrl?: string | null;
};

// Header types
type THeaderProps = {
  title?: string;
  description: string;
};

export type SelectOption = {
  value: string;
  label: string | React.ReactNode;
  icon?: React.ReactNode;
};

export type SelectComponentProps = {
  id: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  touched?: boolean;
  icon?: React.ReactNode;
  selectValue?: string;
};

export type TPrimaryLabelProps = {
  id: string;
  className?: string;
  labelText: string;
};

export type TFormHeadingProps = {
  headingText: string;
  className?: string;
};
export type TPrimaryDialogProps = {
  trigger?: ReactNode;
  content?: ReactNode;
  contentClassName?: string;
  header?: string;
  description?: string;
  setIsDialogOpen?: (isOpen: boolean) => void;
  isDialogOpen?: boolean;
  setOpen?: (isOpen: boolean) => void;
  hasMinWidth?: string;
  hasMaxWidth?: string;
  className?: string;
};

type TProjectButtonProps = {
  onClick: () => void;
  path: string;
  color: string;
  label: string;
  activePath: string;
};
type TSidebarButtonProps = {
  onClick: () => void;
  path: string;
  icon: LucideIcon;
  label: string;
  activePath: string;
};

export type TLoadingMessageProps = {
  message: string;
};

export type DatePickerProps = {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  dateFormat?: string;
  error?: boolean;
  touched?: boolean;
  label: string;
  className?: string;
};

export type ColorPickerProps = {
  color: string;
  onChange: (color: string) => void;
};

export type TAppContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TaskFormProps = {
  id?: number;
  status: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
