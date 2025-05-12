import { FC } from "react";
import { IconSvgProps } from "./types";

export const LocationIcon: FC<IconSvgProps> = ({
    className = "octicon octicon-mark-github",
    width,
    height,
    size = 24,
    ...props
}) => {
    return (
        <svg
            height={size || height}
            width={size || width}
            className={className}
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
        </svg>
    );
};

export default LocationIcon;
