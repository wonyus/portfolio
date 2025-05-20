import Image from "next/image";
import Link from "next/link";
import { CarreerPath, carreerPath } from "./constant/CareerPath";
import { iotStacks, Stack, stacks } from "./constant/Stack";
import { iconLinks } from "./constant/IconLink";
import GitHubCalendar from "react-github-calendar";
import GithubIcon from "@/components/SVGs/GithubIcon";
import { findBlog, findProject } from "./action";
import BlogSection from "@/components/Sections/BlogSection";
import ProjectSection from "@/components/Sections/ProjectSection";

/**
 * Renders the personal portfolio homepage, displaying the user's name, social links, career path, technology stack, and GitHub contribution calendar.
 *
 * The page is structured with distinct sections for career history, technology stack, and GitHub activity, using imported data and components for dynamic rendering.
 */
export default function Home() {
    const MapCareerPath = ({ carreerPath }: { carreerPath: CarreerPath[] }) => {
        const careerCard = (career: CarreerPath, index: number) => {
            return (
                <div className="bg-tertiary p-2 px-0 rounded-2xl w-full text-gray-100/90" key={index}>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1 flex-col">
                            <h3 className="font-bold text-lg">{career.organization}</h3>
                            <p className="text-md">{career.date}</p>
                        </div>
                        <p className="text-md">{career.location}</p>
                    </div>
                    <h3 className="font-bold text-lg">{career.title}</h3>
                    <p className="text-md w-full whitespace-pre-line">{career.description}</p>
                </div>
            );
        };

        return (
            <div className="font-sans">
                <h1 className="font-bold text-xl tracking-wide">Career Path</h1>
                <div className="flex flex-col">{carreerPath.map((career, index) => careerCard(career, index))}</div>
            </div>
        );
    };

    const MapStack = ({ stacks }: { stacks: Stack[] }) => {
        const stackCard = (s: Stack, i: number) => {
            return (
                <div
                    className="p-5 rounded-2xl w-[230px] h-[250px] transition ease-in-out duration-400 hover:scale-110"
                    key={i}
                >
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
            <div className="">
                <h1 className="font-bold">Stack</h1>
                <div className="flex flex-wrap gap-4 justify-center w-full">
                    {stacks.map((stack, index) => stackCard(stack, index))}
                </div>
            </div>
        );
    };

    const MapIotStack = ({ stacks }: { stacks: Stack[] }) => {
        const stackCard = (s: Stack, i: number) => {
            return (
                <div
                    className="bg-tertiary p-5 rounded-2xl w-[230px] h-[250px] transition ease-in-out duration-400 hover:scale-110"
                    key={i}
                >
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
            <div className="">
                <h1 className="font-bold">Iot Stack</h1>
                <div className="flex flex-wrap gap-4 justify-center w-full">
                    {stacks.map((stack, index) => stackCard(stack, index))}
                </div>
            </div>
        );
    };

    const GitContribution = () => {
        return (
            <div className="">
                <div className="flex flex-wrap gap-2 justify-center py-10">
                    <h1 className="font-bold">Github Contribution</h1>
                    <Link
                        className="text-blue-500"
                        href="https://github.com/wonyus"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
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
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl transition delay-50 duration-150 ease-out hover:-translate-all hover:scale-120"
                        >
                            {icon}
                        </a>
                    ))}
                </div>
            </div>
        );
    };

    const blogSample = async () => {
        const { data: blogs } = await findBlog();
        return <div className="flex flex-col items-center justify-center h-screen font-mono">{BlogSection(blogs)}</div>;
    };

    const projectSample = async () => {
        const { data: projects } = await findProject();
        return (
            <div className="flex flex-col items-center justify-center h-screen font-mono">
                {ProjectSection(projects)}
            </div>
        );
    };

    return (
        <div className="overflow-hidden w-full font-[family-name:var(--font-geist-sans)]">
            <div className="flex flex-col gap-10 row-start-2 text-white/90 px-4 py-2.5 mb-3 w-full">
                <div className="h-auto my-[2%]">
                    {MapIcons()}
                    {MapCareerPath({ carreerPath: carreerPath })}
                </div>
                {MapStack({ stacks: stacks })}
                {GitContribution()}
                {projectSample()}
                {MapIotStack({ stacks: iotStacks })}
                {blogSample()}
            </div>
        </div>
    );
}
