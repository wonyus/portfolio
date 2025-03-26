import Image from "next/image";
import LinkIcon from "../SVGs/LinkIcon";
import GithubIcon from "../SVGs/GithubIcon";
import Link from "next/link";

export interface CardProps {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image: string;
  source_code_link?: string;
  live_demo_link?: string;
  link?: string;
  category: string;
}

export const Card = ({ id, name, description, tags, image, source_code_link, live_demo_link }: CardProps) => {
  return (
    <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full">
      <div className="relative w-full h-[230px]">
        <Image src={image} alt={name} width={200} height={200} sizes="xl" loading="lazy" className="w-full h-full object-cover rounded-2xl" />
        {source_code_link || live_demo_link ? (
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            {source_code_link && (
              <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
              >
                <GithubIcon />
              </div>
            )}
            {live_demo_link && (
              <div
                onClick={() => window.open(live_demo_link, "_blank")}
                className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ml-2"
              >
                <LinkIcon className="text-purple-400" />
              </div>
            )}
          </div>
        ) : null}
      </div>

      <Link href={`/${source_code_link ? "projects" : "blogs"}/${id}`} className="bg-tertiary p-0 rounded-2xl sm:w-[360px] w-full">
        <div className="mt-3">
          <h3 className="text-white font-bold text-[18px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">{description}</p>
        </div>
      </Link>

      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <p key={`tag-${tag}-${index}`} className={`text-[14px] text-violet-600`}>
            #{tag}
          </p>
        ))}
      </div>
    </div>
  );
};
