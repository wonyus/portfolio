import { InputListProps } from "./interface";

export const projectInputLists: InputListProps[] = [
    {
        label: "Project Name",
        type: "text",
        name: "title",
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
        name: "source_code_link",
        placeholder: "Enter project github url",
        required: true,
    },
    {
        label: "Live URL",
        type: "text",
        name: "live_demo_link",
        placeholder: "Enter project live url",
        required: false,
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
        label: "Categories",
        type: "text",
        name: "categories",
        placeholder: "Enter categories separated by commas (e.g. react,typescript,nextjs)",
        required: true,
        pattern: "^[A-Za-z0-9]+(,[A-Za-z0-9]+)*$",
    },
    {
        label: "Image",
        type: "file",
        name: "image",
        accept: "image/*",
        placeholder: "Enter project image",
        required: false,
    },
];
