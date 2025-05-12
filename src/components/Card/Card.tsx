import Image from "next/image";
import LinkIcon from "../SVGs/LinkIcon";
import GithubIcon from "../SVGs/GithubIcon";
import Link from "next/link";
import { CardSkeleton } from "./CardSkeleton";

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

    return (
        <div className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full">
            <Link
                href={`/${sourceCodeLink ? "projects" : "blogs"}/${id}`}
                className="bg-tertiary p-0 rounded-2xl sm:w-[360px] w-full"
            >
                <div className="relative w-full h-[230px]">
                    {image.length !== 0 && (
                        <Image
                            src={image}
                            alt={title}
                            width={200}
                            height={200}
                            sizes="xl"
                            loading="lazy"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    )}
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
