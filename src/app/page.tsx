import Image from "next/image";
import Link from "next/link";
import { CarreerPath, carreerPath } from "./constant/CareerPath";
import { Stack, stacks } from "./constant/Stack";
import { iconLinks } from "./constant/IconLink";
import GitHubCalendar from "react-github-calendar";
import { IconButton } from "@radix-ui/themes";
import GithubIcon from "@/components/SVGs/GithubIcon";

export default function Home() {
  const MapCareerPath = ({ carreerPath }: { carreerPath: CarreerPath[] }) => {
    const careerCard = (career: CarreerPath, index: number) => {
      return (
        <div className="bg-tertiary p-3 px-0 rounded-2xl w-full" key={index}>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 flex-col">
              <h3 className="font-bold">{career.organization}</h3>
              <p className="text-sm">{career.date}</p>
            </div>
            <p className="text-sm">{career.location}</p>
          </div>
          <h3 className="font-bold">{career.title}</h3>
          <p className="text-sm w-full">{career.description}</p>
        </div>
      );
    };

    return (
      <div className="container">
        <h1 className="font-bold">Career Path</h1>
        <div className="flex flex-col">{carreerPath.map((career, index) => careerCard(career, index))}</div>
      </div>
    );
  };

  const MapStack = ({ stacks }: { stacks: Stack[] }) => {
    const stackCard = (s: Stack, i: number) => {
      return (
        <div className="bg-tertiary p-5 rounded-2xl w-[230px] h-[250px]" key={i}>
          <div className="flex-row gap-2 items-center text-center" key={i}>
            <div className="flex flex-row gap-1 justify-center items-center pb-1">
              <Image src={s.icon} alt={s.name} width={40} height={40} />
              <h3 className="font-bold">{s.name}</h3>
            </div>
            <p className="text-sm">{s.description}</p>
          </div>
        </div>
      );
    };

    return (
      <div className="container">
        <h1 className="font-bold">Stack</h1>
        <div className="flex flex-wrap gap-4 justify-center">{stacks.map((stack, index) => stackCard(stack, index))}</div>
      </div>
    );
  };

  const GitContribution = () => {
    return (
      <div className="container">
        <div className="flex flex-wrap gap-2">
          <h1 className="font-bold">Github Contribution</h1>
          <Link className="text-blue-500" href="https://github.com/wonyus" target="_blank" rel="noopener noreferrer">
            <GithubIcon />
          </Link>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full flex justify-center">
            <GitHubCalendar username="wonyus" />
          </div>
        </div>
      </div>
    );
  };

  const MapIcons = () => {
    return (
      <div className="pb-4">
        <div className="flex gap-4 items-center sm:items-start">
          {iconLinks.map(({ href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-2xl">
              {icon}
            </a>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="overflow-hidden w-full font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col gap-10 row-start-2 text-white/90 px-4 py-2.5">
        {MapIcons()}
        {MapCareerPath({ carreerPath: carreerPath })}
        {MapStack({ stacks: stacks })}
        {GitContribution()}
      </div>
    </div>
  );
}
