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
    icon: <AtIcon />,
    alt: "Email",
  },
  {
    href: "https://github.com/wonyus",
    icon: <GithubIcon />,
    alt: "Github",
  },
  {
    href: "https://www.linkedin.com/in/imronyusoh",
    icon: <LinkedInIcon />,
    alt: "LinkedIn",
  },
];
