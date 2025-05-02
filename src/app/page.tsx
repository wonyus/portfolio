import Image from "next/image";
import { CarreerPath, carreerPath } from "./constant/CareerPath";
import { iconLinks } from "./constant/IconLink";
import { Stack, stacks } from "./constant/Stack";

export default function Home() {
    const MapCareerPath = ({ carreerPath }: { carreerPath: CarreerPath[] }) => {
        const careerCard = (career: CarreerPath, index: number) => {
            return (
                <div className="bg-tertiary p-3 rounded-2xl w-full" key={index}>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-1 flex-col">
                            <h3 className="font-bold">{career.organization}</h3>
                            <p className="text-sm">{career.date}</p>
                        </div>
                        <p className="text-sm">{career.location}</p>
                    </div>
                    <h3 className="font-bold">{career.title}</h3>
                    <p className="text-sm">{career.description}</p>
                </div>
            );
        };

        return (
            <div>
                <h1 className="font-bold">Career Path</h1>
                <div className="flex flex-col">
                    {carreerPath.map((career, index) => careerCard(career, index))}
                </div>
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
            <div>
                <h1 className="font-bold">Stack</h1>
                <div className="flex flex-wrap gap-4">{stacks.map((stack, index) => stackCard(stack, index))}</div>
            </div>
        );
    };

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <section>IMRON YUSOH</section>
                <div className="flex gap-4 items-center sm:items-start">
                    {iconLinks.map(({ href, icon }) => (
                        <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-2xl">
                            {icon}
                        </a>
                    ))}
                </div>{" "}
                {MapCareerPath({ carreerPath: carreerPath })}
                {MapStack({ stacks: stacks })}
            </main>
        </div>
    );
}
