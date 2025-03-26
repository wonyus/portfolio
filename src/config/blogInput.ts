import { InputListProps } from "./interface";

export const blogInputList: InputListProps[] = [
  {
    label: "Title",
    type: "text",
    name: "title",
    placeholder: "Enter blog title",
    required: true,
  },
  {
    label: "Image",
    type: "file",
    name: "image",
    accept: "image/*",
    placeholder: "Enter blog image",
    required: true,
  },
  {
    label: "Content",
    type: "textarea",
    name: "content",
    placeholder: "Enter blog content",
    required: true,
  },
  {
    label: "Tags",
    type: "text",
    name: "tags",
    placeholder: "Enter tags separated by commas (e.g. react,typescript,nextjs)",
    required: true,
    pattern: "^[A-Za-z0-9]+(,[A-Za-z0-9]+)*$",
  },
];
