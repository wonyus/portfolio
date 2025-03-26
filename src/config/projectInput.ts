import { InputListProps } from "./interface";

export const projectInputLists: InputListProps[] = [
  {
    label: "Project Name",
    type: "text",
    name: "name",
    placeholder: "Enter project name",
    required: true,
  },
  {
    label: "Description",
    type: "text",
    name: "description",
    placeholder: "Enter project description",
    required: true,
  },
  {
    label: "Github URL",
    type: "text",
    name: "githubUrl",
    placeholder: "Enter project github url",
    required: true,
  },
  {
    label: "Live URL",
    type: "text",
    name: "liveUrl",
    placeholder: "Enter project live url",
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
  {
    label: "Image",
    type: "file",
    name: "image",
    accept: "image/*",
    placeholder: "Enter project image",
    required: true,
  },
];
