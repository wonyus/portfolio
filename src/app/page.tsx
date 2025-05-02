import Link from "next/link";
import { CarreerPath, carreerPath } from "./constant/CareerPath";
import { iconLinks } from "./constant/IconLink";
import GitHubCalendar from "react-github-calendar";

export default function Home() {
  const MapCareerPath = ({ career, index }: { career: CarreerPath; index: number }) => {
    return (
      <div className="bg-tertiary p-5 rounded-2xl w-full" key={index}>
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
    <div className="relative overflow-hidden ">
      <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-white/90">
          <section>IMRON YUSOH</section>
          <div className="flex gap-4 items-center sm:items-start">
            {iconLinks.map(({ href, icon }) => (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-2xl">
                {icon}
              </a>
            ))}
          </div>{" "}
          <div>
            <h1>Career Path</h1>
            {carreerPath.map((career, index) => MapCareerPath({ career, index }))}
          </div>
          <div>
            <p>Stack</p>
          </div>
          <div className="container">
            <p>Github Contribution</p>
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                <Link className="text-blue-500 underline row-start-2 pt-4" href="https://github.com/wonyus" target="_blank" rel="noopener noreferrer">
                  GithubLink
                </Link>
              </div>
              <div className="w-full flex justify-center">
                <GitHubCalendar username="wonyus" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
