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

    return (
        <div className="bg-tertiary p-2 rounded-2xl w-full">
            <Link
                href={`/${sourceCodeLink ? "projects" : "blogs"}/${id}`}
                className="bg-tertiary p-0 rounded-2xl sm:w-[280px] flex flex-col"
            >
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
                    {sourceCodeLink || liveDemoLink ? (
                        <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
                            {sourceCodeLink && (
                                <div
                                    onClick={() => window.open(sourceCodeLink, "_blank")}
                                    className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                                >
                                    <GithubIcon />
                                </div>
                            )}
                            {liveDemoLink && (
                                <div
                                    onClick={() => window.open(liveDemoLink, "_blank")}
                                    className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ml-2"
                                >
                                    <LinkIcon className="text-purple-400" />
                                </div>
                            )}
                        </div>
                    ) : null}
                </div>
                <div className="mt-3">
                    <h3 className="text-white font-bold text-[18px]" about={title}>
                        {title.length < 56 ? title : `${title.slice(0, 57)}...`}
                    </h3>
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
