import Image from "next/image";
import LinkIcon from "../SVGs/LinkIcon";
import GithubIcon from "../SVGs/GithubIcon";
import Link from "next/link";
import { CardSkeleton } from "./CardSkeleton";
import { blogImageUrl, projectImageUrl } from "@/config/images";

export interface CardProps {
    id: string;
    title: string;
    description: string;
    tags: string[];
    image: string;
    sourceCodeLink?: string;
    liveDemoLink?: string;
    link?: string;
    category: string;
    isLoading?: boolean;
}

export const Card = ({ id, title, description, tags, image, sourceCodeLink, liveDemoLink, isLoading }: CardProps) => {
    if (isLoading) {
        return <CardSkeleton />;
    }
    const img = image.length === 0 ? (sourceCodeLink ? projectImageUrl : blogImageUrl) : image;

    const iconBtn =
        sourceCodeLink || liveDemoLink ? (
            <div className="absolute flex justify-end m-2 card-img_hover h-10">
                {sourceCodeLink && (
                    <div className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer z-10">
                        <GithubIcon
                            className="hover:fill-purple-500/40"
                            onClick={() => window.open(sourceCodeLink, "_blank")}
                        />
                    </div>
                )}
                {liveDemoLink && (
                    <div
                        onClick={() => window.open(liveDemoLink, "_blank")}
                        className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ml-2"
                    >
                        <LinkIcon className="text-purple-400 hover:fill-purple-500/40" />
                    </div>
                )}
            </div>
        ) : null;

    return (
        <div className="bg-tertiary p-2 rounded-2xl max-w-[300px] relative">
            {iconBtn}
            <Link href={`/${sourceCodeLink ? "projects" : "blogs"}/${id}`}>
                <div className="bg-tertiary p-0 rounded-2xl sm:w-[280px] flex flex-col">
                    <div className="w-full">
                        <Image
                            src={img}
                            alt={title}
                            width={1536}
                            height={1024}
                            sizes="lg"
                            loading="lazy"
                            className="w-full object-cover rounded-2xl justify-around content-around"
                        />
                    </div>
                    <div className="mt-3">
                        <h3 className="text-white font-bold text-[18px]" about={title}>
                            {title.length < 56 ? title : `${title.slice(0, 57)}...`}
                        </h3>
                        <p className="mt-2 text-primary text-[14px]">{description}</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 w-full">
                    {tags.map((tag, index) => (
                        <p key={`tag-${tag}-${index}`} className={`text-[14px] text-violet-600`}>
                            #{tag}
                        </p>
                    ))}
                </div>
            </Link>
        </div>
    );
};
