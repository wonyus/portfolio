import AtIcon from "@/components/SVGs/AtIcon";
import GithubIcon from "@/components/SVGs/GithubIcon";
import LinkedInIcon from "@/components/SVGs/LinkedInIcon";

export interface IconLink {
    href: string;
    icon: React.ReactNode;
    alt: string;
}

export const iconLinks: IconLink[] = [
    {
        href: "mailto:imronyusoh@outlook.com",
        icon: <AtIcon className="hover:fill-purple-500/70" />,
        alt: "Email",
    },
    {
        href: "https://github.com/wonyus",
        icon: <GithubIcon className="hover:fill-purple-500" />,
        alt: "Github",
    },
    {
        href: "https://www.linkedin.com/in/imronyusoh",
        icon: <LinkedInIcon className="hover:text-purple-400" />,
        alt: "LinkedIn",
    },
];
